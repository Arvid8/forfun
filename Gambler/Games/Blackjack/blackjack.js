module.exports = function () {
    var players = [];
    const maxbet = 250;
    const fee = 0.95;
    this.parseGame = function (msg) {
        let input = msg.toString().toLowerCase().split(' ');
        let command = input[0];
        let bet = input[1];
        let args = input.length;
        let senderID = msg.member.user.id;

        for (var i = 0; i < players.length; i++) {
            if (players[i] == senderID) return;
        }

        if (bet > maxbet) {
            sendMaxBet(msg, senderID, maxbet);
            return;
        }

        if ((command == '!bj') && args == 2) {
            var patt = /^\d+$/;
            if (!patt.test(bet)) return isError(msg);
            blackjack(msg, senderID, bet);
        } else {
            isError(msg);
        }
    }

    this.blackjack = function (msg, userID, bet) {
        checkBet(msg, userID, bet, true, true, function (result) {
            if (!result.canPlay) return;

            let tempDeck = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'h10', 'hKnight', 'hQueen', 'hKing', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'dKnight', 'dQueen', 'dKing', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'cKnight', 'cQueen', 'cKing', 's1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 'sKnight', 'sQueen', 'sKing'];
            //var tempDeck = ['h1', 'h1', 'h1', 'h1', 'h1', 'h1', 'h1', 'h1', 'h1', 'h1', 'h1', 'h1', 'h1', 'h1', 'h1', 'h1', 'h1', 'h1', 'h1', 'h1', 'h1', 'h1', 'd6', 'd7', 'd8', 'd9', 'd10', 'dKnight', 'dQueen', 'dKing', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'];
            //var tempDeck = ['h1', 'h3', 'h4', 'h8', 'h10', 'hKnight', 'hQueen', 'hKing', 'hKnight', 'hQueen', 'hKing', 'h1', 'h3', 'h4', 'h8', 'h10', 'hKnight', 'hQueen', 'hKing', 'hKnight', 'hQueen', 'hKing', 'h1', 'h3', 'h4', 'h8', 'h10', 'hKnight', 'hQueen', 'hKing', 'hKnight', 'hQueen', 'hKing', 'h1', 'h3', 'h4', 'h8', 'h10', 'hKnight', 'hQueen', 'hKing', 'hKnight', 'hQueen', 'hKing'];

            const deck = tempDeck.concat(tempDeck).concat(tempDeck).concat(tempDeck);

            var bjPl = {
                user: userID,
                userObject: msg.member.user,
                deck: deck,
                msg: msg,
                bet: [parseInt(bet)],
                orgBet: parseInt(bet),
                myBal: [0],
                dealBal: 0,
                myCards: [
                    []
                ],
                dealCards: [],
                myAce: [0],
                dealAce: 0,
                text: '',
                status: 'start',
                won: [0],
                command: '',
                sInd: 0,
                isSplit: false,
                timeout: false,
                moves: {
                    double: true,
                    split: false
                }
            };
            players.push(bjPl.user);

            bjPl = newCard(bjPl, true); //my card
            bjPl = newCard(bjPl, true); //my card
            bjPl = newCard(bjPl, false); //dealer card
            bjPl = checkSplitDouble(bjPl);

            if (bjPl.myBal[bjPl.sInd] >= 21) {
                bjPl.status = 'end';
                bjPl = newCard(bjPl, false); //dealer card
                bjPl = doWinLosses(bjPl);
            }
            const embeded = makeBjMessage(bjPl);

            msg.channel.send(embeded).then(async function (message) {
                bjPl.msg = message;

                const filter = (user) => {
                    return (user.author.id != message.author.id && user.author.id == bjPl.user && ['hit', 'stand', 'double', 'split'].includes(user.content.toString().toLowerCase()));
                };

                const collector = message.channel.createMessageCollector(filter, {
                    time: 5 * 60 * 1000
                });

                collector.on('collect', (user) => {
                    bjPl.command = user.content.toString().toLowerCase();

                    if (bjPl.command === 'stand') {
                        bjPl = nextHand(bjPl);

                        if (bjPl.status == 'end') collector.stop();
                        updatePost(bjPl);

                    } else if (bjPl.command === 'hit') {
                        bjPl = newCard(bjPl, true); //my card
                        if (bjPl.myBal[bjPl.sInd] >= 21) bjPl = nextHand(bjPl);

                        if (bjPl.status == 'end') collector.stop();
                        updatePost(bjPl);

                    } else if (bjPl.command === 'double' && bjPl.moves.double) {
                        checkBet(bjPl.msg, bjPl.user, bjPl.orgBet, true, true, function (result) {
                            if (!result.canPlay) return;
                            bjPl.bet[bjPl.sInd] += bjPl.orgBet;
                            bjPl = newCard(bjPl, true); //my card
                            bjPl = nextHand(bjPl);

                            if (bjPl.status == 'end') collector.stop();
                            updatePost(bjPl);
                        });

                    } else if (bjPl.command === 'split' && bjPl.moves.split) {
                        checkBet(bjPl.msg, bjPl.user, bjPl.orgBet, true, true, function (result) {
                            if (!result.canPlay) return;
                            bjPl.isSplit = true;
                            // Split up the hands
                            bjPl.myCards.splice(bjPl.sInd + 1, 0, [bjPl.myCards[bjPl.sInd][1]]);
                            bjPl.myCards[bjPl.sInd].splice(1, 1);
                            bjPl.myBal.splice(bjPl.sInd + 1, 0, 0);
                            bjPl.won.splice(bjPl.sInd + 1, 0, 0);
                            bjPl.bet.splice(bjPl.sInd + 1, 0, bjPl.orgBet);

                            bjPl = newCard(bjPl, true); //my card
                            bjPl.sInd += 1;
                            bjPl = newCard(bjPl, true); //my card
                            bjPl.sInd -= 1;

                            if (bjPl.myBal[bjPl.sInd] >= 21) bjPl = nextHand(bjPl);

                            if (bjPl.status == 'end') collector.stop();
                            updatePost(bjPl);
                        });
                    }
                    user.delete();
                });

                collector.on('end', (user) => {
                    if (bjPl.status != 'end') {
                        bjPl = doStand(bjPl);
                        bjPl.timeout = true;
                    }
                    bjPl = doWinLosses(bjPl);
                    updatePost(bjPl);

                    let spliceSize = players.length - 1;
                    for (let i = spliceSize; i >= 0; i--) {
                        if (players[i] == bjPl.user) players.splice(i, 1);
                    }
                    //console.log(players);
                });
                if (bjPl.status == 'end') collector.stop();
            });
        });
    }

    this.doStand = function (bjPl) {
        bjPl.command = 'stand';
        while (bjPl.status != 'end') {
            bjPl = newCard(bjPl, false); //dealer card
            if (bjPl.dealBal > 16) bjPl.status = 'end';
        }
        return bjPl;
    }

    this.nextHand = function (bjPl) {
        if (bjPl.sInd == bjPl.myCards.length - 1) {
            if (bjPl.myBal[bjPl.sInd] > 21 && !bjPl.isSplit) {
                bjPl.status = 'end';
                return bjPl;
            }
            bjPl = doStand(bjPl);
        } else {
            bjPl.sInd += 1;
            if (bjPl.myBal[bjPl.sInd] == 21) bjPl = nextHand(bjPl);
        }
        return bjPl;
    }

    this.doWinLosses = function (bjPl) {
        bjPl.myBal.forEach((my, i) => {
            if (my == bjPl.dealBal) {
                if (my > 21) {
                    bjPl = bjLoss(bjPl, i);
                } else {
                    if (my == 21) {
                        if (bjPl.myCards[i].length == 2 && bjPl.dealCards.length != 2) {
                            bjPl = bjWin(bjPl, i, 1.5 * bjPl.bet[i]);
                        } else if (bjPl.myCards[i].length != 2 && bjPl.dealCards.length == 2) {
                            bjPl = bjLoss(bjPl, i);
                        } else {
                            bjPl = bjPush(bjPl, i);
                        }
                    } else {
                        bjPl = bjPush(bjPl, i);
                    }
                }
            } else if (bjPl.dealBal > my) {
                if (bjPl.dealBal > 21 && my <= 21) {
                    if (my == 21 && bjPl.myCards[i].length == 2) {
                        bjPl = bjWin(bjPl, i, 1.5 * bjPl.bet[i]);
                    } else {
                        bjPl = bjWin(bjPl, i, bjPl.bet[i]);
                    }
                } else {
                    bjPl = bjLoss(bjPl, i);
                }
            } else if (my > bjPl.dealBal) {
                if (my > 21) {
                    bjPl = bjLoss(bjPl, i);
                } else {
                    if (my == 21 && bjPl.myCards[i].length == 2) {
                        bjPl = bjWin(bjPl, i, 1.5 * bjPl.bet[i]);
                    } else {
                        bjPl = bjWin(bjPl, i, bjPl.bet[i]);
                    }
                }
            } else {
                console.log('error');
            }
        });

        //console.log(bjPl);
        giveBalance(bjPl);

        return bjPl;
    }

    this.giveBalance = async function (bjPl) {
        //console.log(bjPl);
        let orgBets = 0,
            tempWon = 0,
            tempLoss = 0;
        bjPl.won.forEach((e, i) => {
            tryForJackpot(bjPl.user, bjPl.bet[i]); // Jackpot chance

            if (bjPl.won[i] >= 0) { // win or push
                orgBets += parseInt(bjPl.bet[i]);
                tempWon += parseInt(bjPl.won[i]);

            } else { // loss
                tempLoss += parseInt(bjPl.bet[i]);
            }
        });
        addBalance(bjPl.user, orgBets, x => {
            win(bjPl.user, tempWon, fee, false, x => {
                updateSheet('blackjack', 'win', tempWon, x => {
                    updateSheet('blackjack', 'loss', tempLoss, x => {});
                });
            });
        });
    }

    this.bjPush = function (bjPl, i) {
        bjPl.won[i] = 0;
        bjPl.text = 'Push, no one wins anything!';
        return bjPl;
    }
    this.bjLoss = function (bjPl, i) {
        bjPl.won[i] = -1;
        bjPl.text = 'Dealer won. You lost ' + bjPl.bet[i] + 'k.';
        return bjPl;
    }
    this.bjWin = function (bjPl, i, win) {
        bjPl.won[i] = win;
        bjPl.text = 'Win! You won ' + Math.floor(bjPl.won[i] * fee) + 'k!';
        return bjPl;
    }

    this.newCard = function (bjPl, isMyCard) {
        var newCardIndex = Math.floor(Math.random() * bjPl.deck.length);
        var card = bjPl.deck[newCardIndex];
        bjPl.deck.splice(newCardIndex, 1);

        if (isMyCard) {
            bjPl.myCards[bjPl.sInd].push(card);
        } else {
            bjPl.dealCards.push(card);
        }
        bjPl = updateDecks(bjPl);

        return bjPl;
    }

    this.updateDecks = function (bjPl) {
        bjPl.myCards.forEach((d, i) => {
            bjPl.myBal[i] = 0;
            bjPl.myAce[i] = 0;
            d.forEach(e => {
                bjPl.myBal[i] += getPoints(e);
                if (e.substr(1) == '1') {
                    bjPl.myAce[i] += 1;
                }
            });
            while (bjPl.myBal[i] > 21 && bjPl.myAce[i] > 0) {
                bjPl.myBal[i] -= 10;
                bjPl.myAce[i] -= 1;
            }
        });
        bjPl.dealBal = 0;
        bjPl.dealAce = 0;
        bjPl.dealCards.forEach(e => {
            bjPl.dealBal += getPoints(e);
            if (e.substr(1) == '1') {
                bjPl.dealAce += 1;
            }
        });
        while (bjPl.dealBal > 21 && bjPl.dealAce > 0) {
            bjPl.dealBal -= 10;
            bjPl.dealAce -= 1;
        }

        return bjPl;
    }

    this.getPoints = function (card) {
        let points = 0,
            text = card.substr(1);
        if (text == "Knight" || text == "Queen" || text == "King") {
            points += 10;
        } else if (text == "1") {
            points += 11;
        } else {
            points += parseInt(text);
        }

        return points;
    }

    this.checkSplitDouble = function (bjPl) {
        if (bjPl.myCards[bjPl.sInd].length == 2 && getPoints(bjPl.myCards[bjPl.sInd][0]) == getPoints(bjPl.myCards[bjPl.sInd][1]) && bjPl.myBal.length < 10) {
            bjPl.moves.split = true;
        } else {
            bjPl.moves.split = false;
        }

        if (bjPl.myCards[bjPl.sInd].length == 2) {
            bjPl.moves.double = true;
        } else {
            bjPl.moves.double = false;
        }
        return bjPl;
    }

    this.updatePost = function (bjPl) {
        bjPl = checkSplitDouble(bjPl);

        const embeded = makeBjMessage(bjPl);
        bjPl.msg.edit(embeded);
    }
}