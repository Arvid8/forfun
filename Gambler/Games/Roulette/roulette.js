module.exports = function () {
    var async = require('async');
    var rouletteDone = {
        '732690070468952144': true, // Orgrimmar
        '734003239258947605': true, // Kalimdor
        '734003792483188777': true // Northrend
    };
    var numbers = ['g0', 'r1', 'b2', 'r3', 'b4', 'r5', 'b6', 'r7', 'b8', 'r9', 'b10', 'b11', 'r12', 'b13', 'r14', 'b15', 'r16', 'b17', 'r18', 'r19', 'b20', 'r21', 'b22', 'r23', 'b24', 'r25', 'b26', 'r27', 'b28', 'b29', 'r30', 'b31', 'r32', 'b33', 'r34', 'b35', 'r36'];
    const maxbet = 250;

    this.parseGame = function (msg) {
        let userID = msg.member.user.id;
        let newBets = validBet(msg);

        if (newBets.isValid) {
            if (rouletteDone[msg.channel.id]) {
                roulette(msg, userID, newBets);
            }
        } else if (!newBets.otherError) {
            isError(msg)
        }
    }

    this.roulette = function (msg, userID, newBets) {
        let players = [];
        let NP = checkIfCanAddPlayers(msg, newBets, players);
        newBets = NP[0];
        players = NP[1];
        if (NP[2]) return;

        checkBet(msg, userID, newBets.totBet, true, true, function (result) {
            if (!result.canPlay) return;

            let winOptions = fillOpions();

            players = addPlayers(userID, newBets, players);

            const embeded = makeRouletteMessage('start', players, '');
            msg.channel.send(embeded).then(async function (message) {
                rouletteDone[msg.channel.id] = false;

                const filter = (msg) => {
                    let newBets = validBet(msg);

                    return msg.author.id != message.author.id && newBets.isValid;
                };

                const collector = message.channel.createMessageCollector(filter, {
                    time: 40 * 1000
                    //errors: ['time']
                });

                collector.on('collect', msg => {
                    let userID = msg.author.id;
                    let newBets = validBet(msg);

                    let NP = checkIfCanAddPlayers(msg, newBets, players);
                    newBets = NP[0];
                    players = NP[1];
                    if (NP[2]) return;

                    checkBet(msg, userID, newBets.totBet, true, true, function (result) {
                        if (!result.canPlay) return;

                        players = addPlayers(userID, newBets, players);

                        const embeded = makeRouletteMessage('start', players, '');
                        message.edit(embeded);

                        if (players.length >= 30) collector.stop();
                    });
                    msg.delete();
                });

                collector.on('end', msg => {
                    var winner = numbers[Math.floor(Math.random() * numbers.length)];
                    //console.log(winner);
                    var winningNumber = parseInt(winner.substr(1));
                    var winningColor = '';
                    winningColor += (winner[0] == 'b') ? 'Black' : '';
                    winningColor += (winner[0] == 'r') ? 'Red' : '';
                    winningColor += (winner[0] == 'g') ? 'Green' : '';

                    var winningtext = "Winning number is " + winningColor + " " + winningNumber + "!";

                    players.forEach(e => {
                        tryForJackpot(e.id, e.bet); // Jackpot chance
                        var odds;

                        if ((winOptions.blackWin.includes(winningNumber) && e.at == 'black') ||
                            (winOptions.redWin.includes(winningNumber) && e.at == 'red') ||
                            (winOptions.oddWin.includes(winningNumber) && e.at == 'odd') ||
                            (winOptions.evenWin.includes(winningNumber) && e.at == 'even') ||
                            (winOptions.lowerWin.includes(winningNumber) && e.at == 'lower') ||
                            (winOptions.upperWin.includes(winningNumber) && e.at == 'upper')) {
                            odds = 1;
                            e.didWin = true;
                        } else if (e.at == winningNumber) {
                            odds = 30;
                            e.didWin = true;
                        }
                        if (e.didWin) {
                            e.win = e.bet * odds;
                        }
                    });
                    const embeded = makeRouletteMessage('end', players, winningtext);
                    message.edit(embeded);

                    winRoulette(players, message);
                });
                if (players.length >= 30) collector.stop();
            }).catch(e => {
                console.log(e);
            });
        });
    }

    this.checkIfCanAddPlayers = function (msg, newBets, players) {
        // Check if the same user already has made the bet
        let toSplice = [],
            isError = false,
            tryingToBetOverMax = false;
        players.forEach(e => {
            newBets.betAt.forEach((e2, i2) => {
                if (e.id == newBets.user && e.at == e2) {
                    if (e.bet + newBets.bet > maxbet) {
                        tryingToBetOverMax = true;
                        isError = true;
                        return;
                    } else {
                        e.bet += newBets.bet;
                        toSplice.push(i2);
                    }
                }
            });
        });

        let spliceSize = toSplice.length - 1;
        for (let i3 = spliceSize; i3 >= 0; i3--) {
            newBets.betAt.splice(toSplice[i3], 1);
        }

        let totBets = newBets.betAt.length + players.length;

        if (totBets > 30) {
            sendMessage(msg, "There can only be a maximum of 30 bets. You're trying to make " + totBets);
            isError = true;
        } else if (tryingToBetOverMax) {
            sendMessage(msg, "The maximum bet is " + maxbet + "k.");
            isError = true;
        }

        return [newBets, players, isError];
    }

    this.addPlayers = function (userID, newBets, players) {
        newBets.betAt.forEach(e => {
            let rPl = {
                id: userID,
                bet: parseInt(newBets.bet),
                at: e,
                win: 0,
                didWin: false
            };
            players.push(rPl);

            if (players.length >= 30) {
                return players;
            }
        });
        return players;
    }

    this.validBet = function (msg) {
        // Parse message
        let input = msg.content.toString().toLowerCase().split(/ |\,/);
        for (let i = input.length; i > 0; i--) {
            if (input[i] === "") input.splice(i, 1);
        }

        const userID = msg.member.user.id,
            command = input[0],
            thisBet = parseInt(input[1]);
        input.splice(0, 2);

        // Create valid bets
        let bets = ['red', 'black', 'green', 'even', 'odd', 'lower', 'upper'];
        for (let i = 0; i < 37; i++) {
            bets.push(i.toString());
        }

        let newBets = {
            user: userID,
            betAt: [],
            bet: thisBet,
            isValid: true,
            totBet: 0,
            otherError: false
        };
        // Test parsed against valid bets
        input.forEach((e, i) => {
            if (bets.includes(e) && !newBets.betAt.includes(e)) {
                if (e == 'green') {
                    newBets.betAt.push('0');
                } else {
                    newBets.betAt.push(e);
                }
            } else {
                newBets.isValid = false;
            }
        });

        if (input.length == 0) newBets.isValid = false;

        let patt = /^\d+$/;
        if ((command != '!roulette' && command != '!r') || !patt.test(thisBet)) newBets.isValid = false;

        newBets.totBet = thisBet * newBets.betAt.length;

        if (thisBet < 10) {
            sendMessage(msg, '<@!' + userID + ">, the minumum bet is 10k.");
            newBets.isValid = false;
            newBets.otherError = true;
        } else if (thisBet > maxbet) {
            sendMaxBet(msg, userID, maxbet);
            newBets.isValid = false;
            newBets.otherError = true;
        }

        return newBets;
    }

    this.winRoulette = function (players, msg) {
        let fee = 0.92;
        // Merge all rows from the same user
        players.forEach((e, i) => {
            let toSplice = [];
            players.forEach((e2, i2) => {
                if (i != i2 && e.id == e2.id && e.didWin == e2.didWin) {
                    toSplice.push(i2);
                }
            });

            let spliceSize = toSplice.length - 1;
            for (let i3 = spliceSize; i3 >= 0; i3--) {
                players[i].win += players[toSplice[i3]].win;
                players[i].bet += players[toSplice[i3]].bet;
                players.splice(toSplice[i3], 1);
            }
        });

        console.log(players);

        let tempWin = 0,
            tempLoss = 0;

        async.forEachOf(players, (e, i, callback) => {
            if (e.didWin) {
                addBalance(e.id, e.bet, x => {
                    win(e.id, e.win, fee, false, x => {
                        tempWin += e.win;
                        callback();
                    });
                });
            } else {
                tempLoss += e.bet;
                callback();
            }
        }, function (err) {
            if (err) console.log(err);

            rouletteDone[msg.channel.id] = true;
            updateSheet('roulette', 'win', tempWin, x => {
                updateSheet('roulette', 'loss', tempLoss, x => {});
            });
        });
    }

    this.fillOpions = function () {
        var winOptions = {
            blackWin: [],
            redWin: [],
            oddWin: [],
            evenWin: [],
            lowerWin: [],
            upperWin: []
        };

        for (var i = 0; i < numbers.length; i++) {
            var theInt = parseInt(numbers[i].substr(1));
            if (numbers[i][0] == 'b') { // black
                winOptions.blackWin.push(theInt);
            }
            if (numbers[i][0] == 'r') { // red
                winOptions.redWin.push(theInt);
            }
            if (theInt % 2 == 1) { // odd
                winOptions.oddWin.push(theInt);
            }
            if (theInt % 2 == 0) { // even
                winOptions.evenWin.push(theInt);
            }
            if (theInt < 19) { // lower
                winOptions.lowerWin.push(theInt);
            }
            if (theInt >= 19) { // upper
                winOptions.upperWin.push(theInt);
            }
        }
        return winOptions;
    }
}