module.exports = function (client, Discord) {
    const maxbet = 50;
    let players = [];

    this.parseGame = function (msg) {
        let input = msg.toString().toLowerCase().split(' ');
        let command = input[0];
        let args = input.length;
        let senderID = msg.member.user.id;
        let slotGame = {
            msg: msg,
            user: senderID,
            bet: parseInt(input[1]),
            win: 0,
            emojis: odds[3],
            winOdds: null,
            freespin: false
        };

        if (slotGame.bet > maxbet) {
            sendMaxBet(msg, senderID, maxbet);
            return;
        }

        for (let i = 0; i < players.length; i++) {
            if (players[i] == senderID) return;
        }

        if ((command == '!slot' || command == '!slots') && args == 2) {
            let patt = /^\d+$/;
            if (!patt.test(input[1])) return isError(msg);
            slots(slotGame);
        } else {
            isError(msg);
        }
    }

    this.slots = function (slotGame) {
        checkSlotBet(slotGame.msg, slotGame.user, slotGame.bet, true, true, function (result) {
            if (!result.canPlay) return;
            if (slotGame.bet >= 10) tryForJackpot(slotGame.user, slotGame.bet); // Jackpot chance

            let gameOdds = odds[0],
                base = odds[1],
                minWin = odds[2];

            players.push(slotGame.user);

            let winner = getRandomInt(base);

            if (winner <= minWin) {
                // win
                gameOdds.every((e, i) => {
                    // find what you won lmao
                    if (winner >= minWin - e.span) {
                        if (e.win == 0) slotGame.freespin = true;

                        slotGame.win = slotGame.bet * e.win;
                        slotGame.winOdds = e;
                        sendSlots(slotGame, newSlotGame => {
                            slotGame = newSlotGame;
                            addBalance(slotGame.user, slotGame.win, x => {
                                updateSheet('slot', 'win', (slotGame.win - slotGame.bet), x => {});
                                if (slotGame.freespin) freeSpinsTrigger(slotGame);
                            });
                        });
                        return false;
                    } else {
                        minWin -= e.span;
                        return true;
                    }
                });
            } else {
                // loss
                slotGame = sendSlots(slotGame, newSlotGame => {
                    slotGame = newSlotGame;
                    updateSheet('slot', 'loss', slotGame.bet, x => {});
                });
            }
        });
    }

    this.sendSlots = async function (slotGame, callback) {
        let counter = 0;
        let interval = function () {
            let embeded;
            if (++counter != 3) { // first two are just for show
                embeded = makeSlotsMessage(slotGame, 'rolling');
            } else if (slotGame.winOdds !== null) {
                //win
                embeded = makeSlotsMessage(slotGame, 'win');
            } else {
                //loss
                embeded = makeSlotsMessage(slotGame, 'loss');
            }
            if (counter == 1) {
                slotGame.msg.channel.send(embeded).then(async function (msg) {
                    slotGame.msg = msg;
                    setTimeout(interval, 1000);
                });
            } else if (counter == 2) {
                slotGame.msg.edit(embeded);
                setTimeout(interval, 1000);
            } else if (counter == 3) {
                slotGame.msg.edit(embeded);
                let spliceSize = players.length - 1;
                for (let i = spliceSize; i >= 0; i--) {
                    if (players[i] == slotGame.user) players.splice(i, 1);
                }
                return callback(slotGame);
            }
        }
        setTimeout(interval, 1000);
    }

    this.freeSpinsTrigger = function (slotGame) {
        const embeded = makeFreespinNotification(slotGame);
        slotGame.msg.channel.send(embeded);

        const user = client.users.cache.get(slotGame.user);
        const guild = client.guilds.cache.get('732675304228651109');
        const member = guild.member(user);

        // Freespins role
        member.roles.add('749950986411573279');
        // Remove verified
        member.roles.remove('732691492598054993');

        let text = 'Congratz on your freespin win! Head over to <#734857571554558102> to play :)\n';
        text += 'If you win big head to <#742000412818931773>, Best of Luck!';
        user.send(text);
        startFreespin(slotGame);
    }

    this.getOdds = function () {
        let gameOdds = [{
            odds: 13,
            win: 1,
            emoji: ':one:',
            span: 1
        }, {
            odds: 16,
            win: 2,
            emoji: ':two:',
            span: 1
        }, {
            odds: 22,
            win: 3,
            emoji: ':three:',
            span: 1
        }, {
            odds: 50,
            win: 5,
            emoji: ':five:',
            span: 1
        }, {
            odds: 70,
            win: 10,
            emoji: ':keycap_ten:',
            span: 1
        }, {
            odds: 280,
            win: 20,
            emoji: ':ring:',
            span: 1
        }, {
            odds: 375,
            win: 30,
            emoji: ':crown:',
            span: 1
        }, {
            odds: 125,
            win: 0,
            emoji: ':moneybag:',
            span: 1
        }];

        // Crate all the numerators and the common base of all the odds
        let arr = [1];
        gameOdds.forEach((e1, i1) => {
            arr[0] *= e1.odds; // the base
            gameOdds.forEach((e2, i2) => {
                if (i1 != i2) {
                    e1.span *= e2.odds;
                }
            });
            arr.push(e1.span);
        });

        // Reduce the numerators and the common base by findinding the gcd
        let gcd = gcdArr(arr);
        let base = arr[0] / gcd;
        let minWin = 1;
        let emojis = [];
        gameOdds.forEach((e, i) => {
            e.span = arr[i + 1] / gcd;
            minWin += e.span;
            emojis.push(e.emoji);
        });

        console.log('Minwin: ' + minWin + ' & Base: ' + base);

        return [gameOdds, base, minWin, emojis];
    }

    this.gcdArr = function (input) {
        var len, a, b;
        len = input.length;
        a = input[0];
        for (var i = 1; i < len; i++) {
            b = input[i];
            a = gcdTwo(a, b);
        }
        return a;
    }

    this.gcdTwo = function (x, y) {
        x = Math.abs(x);
        y = Math.abs(y);
        while (y) {
            var t = y;
            y = x % y;
            x = t;
        }
        return x;
    }

    this.makeFreespinNotification = function (slotGame) {
        const green = '#10E04B';
        const embeded = new Discord.MessageEmbed()
            .setColor(green)
            .setTitle('Freespins!')
            .setDescription('<@!' + slotGame.user + '>, you just won 10 free spins!');

        return embeded;
    }

    this.checkSlotBet = function (msg, userID, bet, isWager, addToTotal, callback) {
        checkBalance(userID, function (result) {
            if (result >= bet && bet >= 1) {
                checkRankUpgrade(userID, bet, addToTotal, () => { // Rank upgrade
                    loss(userID, bet, isWager, newbal => {
                        return callback({
                            canPlay: true,
                            bal: newbal
                        });
                    });
                });
            } else if (bet < 1) {
                sendMessage(msg, '<@!' + userID + ">, the minumum bet is 1k.");
                return callback({
                    canPlay: false,
                    bal: 0
                });
            } else {
                sendMessage(msg, '<@!' + userID + ">, you're trying to bet " + bet + "k with a balance of " + result + "k. Head over to <#732683982906458312> to re-fill your balance.");
                return callback({
                    canPlay: false,
                    bal: 0
                });
            }
        });
    }

    const odds = getOdds();
    console.log(odds);
}