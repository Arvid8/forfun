module.exports = function (client, Discord) {
    client.on('message', function (msg) {
        let input = msg.toString().toLowerCase().split(' ');
        let command = input[0];
        let bet = input[1];
        let time = input[2];

        if (msg.channel.id == '734004549605392445' && command == '!lottery') {
            var patt = /^\d+$/;
            if (!patt.test(bet) && !patt.test(time)) return isError(msg);

            let lottery = {
                msg: msg,
                bet: parseInt(bet),
                totTime: time,
                players: [],
                status: 'start',
                time: Date.now(),
                totBet: 0,
                winner: '-'
            };

            let userID = msg.member.user.id;
            if (!isAdminRank(userID)) {
                lackPrivileges(msg, userID, '!lottery');
                return;
            }

            const embeded = makeLotteryMessage(lottery);
            msg.channel.send(embeded).then(async function (message) {
                lottery.msg = message;
                startLottery(lottery);
            });
            msg.delete();
        }
    });

    this.startLottery = function (lottery) {
        lottery.msg.react('💰');

        var counter = 5 * 60 * 1000;
        var myFunction = function () {
            let duration = Date.now() - lottery.time,
                hoursLeft = lottery.totTime - 1 - Math.floor(duration / (1000 * 60 * 60)),
                minutesLeft = 60 * lottery.totTime - 1 - Math.floor(duration / (1000 * 60));
            if (hoursLeft <= 0) {
                counter = 60 * 1000;
            } else if (minutesLeft <= 0) {
                counter = 5 * 1000;
            }
            callLotteryMessage(lottery);

            if (lottery.status != 'end') setTimeout(myFunction, counter);
        }
        setTimeout(myFunction, counter);

        // Start collector

        const filter = (reaction, user) => {
            return '💰'.includes(reaction.emoji.name) && user.id != lottery.msg.author.id && !lottery.players.includes(user.id);
        };

        const collector = lottery.msg.createReactionCollector(filter, {
            time: lottery.totTime * 60 * 60 * 1000,
            dispose: true
        });

        //let playerRemove = true;

        collector.on('collect', (reaction, user) => {
            if (reaction.emoji.name === '💰') {
                checkLotteryBet(user.id, lottery.bet, true, function (result) {
                    if (!result.canPlay) {
                        //playerRemove = false;
                        reaction.users.remove(user.id);
                    } else {
                        lottery.players.push(user.id);
                        lottery.totBet += parseInt(lottery.bet);
                    }
                    callLotteryMessage(lottery);
                });
            }
        });
        /*
                collector.on('remove', (reaction, user) => {
                    if (reaction.emoji.name === '💰' && playerRemove) {
                        removeElement(lottery.players, user.id);
                        addBalance(user.id, lottery.bet, x => {
                            addWager(user.id, lottery.bet, x => {});
                        });
                        lottery.totBet -= parseInt(lottery.bet);
                        callLotteryMessage(lottery);
                    }
                    playerRemove = true;
                });
        */
        collector.on('end', (reaction, user) => {
            lottery.status = 'end';
            if (lottery.players.length > 0) lottery = drawLotteryWinner(lottery);

            callLotteryMessage(lottery);
        });
    }

    this.drawLotteryWinner = function (lottery) {
        let winnerID = lottery.players[getRandomInt(lottery.players.length) - 1];
        let won = lottery.totBet;
        addBalance(winnerID, lottery.bet, x => {
            win(winnerID, won, 0.85, false, x => {
                updateSheet('lottery', 'win', won, x => {});
            });
        });

        lottery.winner = '<@!' + winnerID + '>';

        let text = '';
        lottery.players.forEach(e => {
            text += '<@!' + e + '> ';
        });
        lottery.msg.channel.send(text).then(message => {
            setTimeout(() => {
                message.delete();
            }, 1000);
        });

        return lottery;
    }

    this.makeLotteryMessage = function (lottery) {
        const green = '#10E04B',
            red = '#E01110';
        let timeText = (lottery.status == 'start') ? timeToText(Date.now() - lottery.time, lottery) : '-';

        var color = '';
        color += (lottery.status == 'start') ? green : '';
        color += (lottery.status == 'end') ? red : '';

        var desc = '';
        desc += (lottery.status == 'start') ? 'Lottery has started! React to this post to join.' : '';
        desc += (lottery.status == 'end') ? 'Lottery has ended!' : '';

        const embeded = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle('Lottery: ' + lottery.bet + 'k to join!')
            .setDescription(desc)
            .addFields({
                name: '**Players**',
                value: lottery.players.length,
                inline: true
            }, {
                name: '**Winner**',
                value: lottery.winner,
                inline: true
            }, {
                name: '**Total pot**',
                value: lottery.totBet + 'k',
                inline: true
            }).addFields({
                name: '**Time left**',
                value: timeText,
                inline: true
            });
        return embeded;
    }

    this.timeToText = function (duration, lottery) {
        var seconds = 60 - Math.floor((duration / 1000) % 60),
            minutes = 60 - Math.floor((duration / (1000 * 60)) % 60),
            hours = lottery.totTime - 1 - Math.floor(duration / (1000 * 60 * 60));

        var text = '';
        text += (hours > 0) ? '**' + hours + '** hrs ' : '';
        text += (minutes > 0 && hours <= 0) ? '**' + minutes + '** min ' : '';
        text += (seconds > 0 && minutes <= 0 && hours <= 0) ? '**' + seconds + '** sec ' : '';

        return text;
    }

    this.checkLotteryBet = function (userID, bet, isWager, callback) {
        checkBalance(userID, function (result) {
            const guild = client.guilds.cache.get('732675304228651109');;
            const member = guild.member(userID);

            if (result >= bet && bet >= 10) {
                checkRankUpgrade(userID, bet, true, () => { // Rank upgrade
                    loss(userID, bet, isWager, newbal => {
                        return callback({
                            canPlay: true,
                            bal: newbal
                        });
                    });
                });
            } else {
                member.send('You dont have enough gold to join the lottery, check your balance in <#735179810846015549> with the command !bal.');
                return callback({
                    canPlay: false,
                    bal: 0
                });
            }
        });
    }

    this.callLotteryMessage = function (lottery) {
        const embeded = makeLotteryMessage(lottery);
        lottery.msg.edit(embeded);
    }
}