module.exports = function () {
    var async = require('async');

    this.parseGame = function (msg) {
        var input = msg.toString().toLowerCase().split(' ');
        var command = input[0];
        var args = input.length;
        var senderID = msg.member.user.id;

        if ((command == '!roll' || command == '!dice') && args == 2) {
            var patt = /^\d+$/;
            if (!patt.test(input[1])) return isError(msg);
            queueRoll(msg, senderID, input[1]);
        } else {
            isError(msg);
        }
    }


    this.queueRoll = function (msg, userID, bet) {
        checkBet(msg, userID, bet, false, false, function (result) {
            if (!result.canPlay) return;

            var rolls = {
                players: [userID],
                bet: bet,
                text: '',
                msg: '',
                results: [],
                resultText: '',
                playersText: '',
                won: 0,
                time: Date.now(),
                status: 'start'
            };
            const embeded = makeRollMessage(rolls);

            /*msg.channel.send(new Discord.MessageEmbed()
                .setThumbnail('https://i.imgur.com/D4j2E0g.gif')).then(async function (imageMessage) {
                    imageMessage.delete({
                        timeout: 15 * 1000
                    });

                }).catch(e => {
                    console.log(e);
                });*/

            msg.channel.send(embeded).then(async function (message) {
                message.react('💰');
                rolls.msg = message;

                var counter = 3 * 1000;
                var myFunction = function () {
                    let sec = 15 - Math.floor((Date.now() - rolls.time) / 1000);
                    if (sec <= 3) {
                        counter = 1 * 1000;
                    }
                    const embeded = makeRollMessage(rolls);
                    message.edit(embeded);

                    if (rolls.status == 'start') setTimeout(myFunction, counter);
                }
                setTimeout(myFunction, counter);

                const filter = (reaction, user) => {
                    return '💰'.includes(reaction.emoji.name) && user.id != message.author.id && user.id != userID && !rolls.players.includes(user.id);
                };

                const collector = message.createReactionCollector(filter, {
                    maxUsers: 4,
                    time: 15 * 1000,
                    dispose: true
                });

                collector.on('collect', (reaction, user) => {
                    if (reaction.emoji.name === '💰') {
                        checkBet(msg, user.id, rolls.bet, false, false, function (result) {
                            if (!result.canPlay) {
                                reaction.users.remove(user.id);
                            } else {
                                rolls.players.push(user.id);
                                const embeded = makeRollMessage(rolls);
                                message.edit(embeded);
                                if (rolls.players.length == 4) collector.stop();
                            }
                        });
                    }
                });

                collector.on('remove', (reaction, user) => {
                    if (reaction.emoji.name === '💰') {
                        removeElement(rolls.players, user.id);
                        addBalance(user.id, rolls.bet, x => {});

                        console.log(rolls.players);
                        const embeded = makeRollMessage(rolls);
                        message.edit(embeded);
                    }
                });

                collector.on('end', (reaction, user) => {
                    if (rolls.players.length == 1) {
                        rolls.status = 'timeout';
                        const embeded = makeRollMessage(rolls);
                        message.edit(embeded);
                        win(rolls.players[0], rolls.bet, 1, false, x => {});

                    } else {
                        rolls.status = 'end';
                        roll(rolls);
                    }
                });
            }).catch(e => {
                console.log(e);
            });
        });
    }

    this.roll = function (rolls) {
        async.forEachOf(rolls.players, (e, i, callback) => {
            checkRankUpgrade(e, rolls.bet, true, () => {
                tryForJackpot(e, rolls.bet); // Jackpot chance

                addWager(e, -rolls.bet, x => {
                    callback();
                });
            });
        });

        rolls.players.forEach(() => {
            rolls.results.push(getRandomInt(100));
        });

        let biggest = Math.max.apply(null, rolls.results),
            biggestGuy = [],
            smallest = Math.min.apply(null, rolls.results),
            smallestGuy = [],
            resultText = '';

        rolls.results.forEach((roll, i) => {
            resultText += roll + "\n";
            if (roll == biggest) {
                biggestGuy.push(rolls.players[i]);
            }
            if (roll == smallest) {
                smallestGuy.push(rolls.players[i]);
            }
        });

        let text = '',
            fee = 0.92,
            draw = false;

        if ((biggestGuy.length == 1) && (smallestGuy.length == 1)) {
            text += '<@!' + biggestGuy[0] + '>';
            rolls.won = rolls.bet;

        } else if ((biggestGuy.length == 1) && (smallestGuy.length != 1)) {
            rolls.won = rolls.bet * smallestGuy.length;
            text += '<@!' + biggestGuy[0] + '>';

        } else if ((biggestGuy.length != 1) && (smallestGuy.length == 1)) {
            for (var i = 0; i < biggestGuy.length - 2; i++) {
                text += '<@!' + biggestGuy[i] + '>, ';
            }
            text += '<@!' + biggestGuy[biggestGuy.length - 2] + "> & <@!" + biggestGuy[biggestGuy.length - 1] + '>';
            rolls.won = rolls.bet * rolls.players.length / biggestGuy.length;

        } else {
            text += "It's a draw!";
            biggestGuy = rolls.players;
            draw = true;
        }

        text += (draw) ? '' : " won " + Math.floor(rolls.won * fee) + "k!";
        rolls.playersText = text;
        rolls.resultText = resultText;

        const embeded = makeRollMessage(rolls);
        rolls.msg.edit(embeded);

        async.forEachOf(biggestGuy, (e, i, callback) => {
            addBalance(biggestGuy[i], rolls.bet, x => {
                win(biggestGuy[i], rolls.won, fee, false, x => {
                    updateSheet('roll', 'win', rolls.won, x => {
                        callback();
                    });
                });
            });
        });
    }
}