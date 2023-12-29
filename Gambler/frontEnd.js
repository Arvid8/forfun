module.exports = function (Discord, client) {
    const emojis = require("./Games/Blackjack/emoji");

    const green = '#10E04B',
        yellow = '#F7C305',
        red = '#E01110';

    const yellowLine = '<:yellowTop:749924907843846224>',
        redLine = '<:redTop:749924907537793148>',
        greenLine = '<:greenTop:749922978799681536>',
        redCross = '<:redCross:749975667256459347>',
        goldCoin = '<:goldCoin:749975678941659136>';

    this.makeBjMessage = function (bjPl) {
        var myCardsText = '',
            nameHand = '';

        if (bjPl.isSplit) {
            nameHand += 'Hand 1: ' + bjPl.bet[0] + 'k';
            bjPl.text = '';
            bjPl.myCards.forEach((d, i) => {
                myCardsText += (i != 0) ? '**Hand ' + (i + 1) + ': ' + bjPl.bet[i] + 'k**\n' : '';
                if (i == bjPl.sInd) myCardsText += '->';

                myCardsText += getEndScore(bjPl, i);

                myCardsText += '\n';

                if (i != bjPl.myCards.length - 1) myCardsText += '\n';

                if (bjPl.status == 'end') {
                    bjPl.text += '**Hand ' + (i + 1) + '**: You ';
                    if (bjPl.won[i] > 0) {
                        bjPl.text += 'won ' + bjPl.won[i] + 'k!';
                    } else if (bjPl.won[i] == 0) {
                        bjPl.text += 'pushed! No one wins anything.';
                    } else {
                        bjPl.text += 'lost ' + bjPl.bet[i] + 'k.';
                    }
                    bjPl.text += '\n';
                }
            });
        } else {
            nameHand += '**Your hand**';
            myCardsText += getEndScore(bjPl, 0);
        }

        if (bjPl.timeout) {
            bjPl.text = '**Auto stand because time ran out!**\n' + bjPl.text;
        }

        if (bjPl.status != 'end') {
            bjPl.text = 'Blackjack game started, possible commands are: **hit**, **stand**';
            bjPl.text += (bjPl.moves.double) ? ', **double**' : '';
            bjPl.text += (bjPl.moves.split) ? ', **split**' : '';
            bjPl.text += '!';
        }

        var dealCardsText = '';
        bjPl.dealCards.forEach(e => {
            emojis.forEach(p => {
                if (p.name == e) dealCardsText += p.id;
            });
        });

        dealCardsText += '\n\n Score: **' + bjPl.dealBal + '**';

        let color;
        if (bjPl.status == 'start' || bjPl.won[bjPl.sInd] == 0 || bjPl.isSplit) {
            color = yellow
        } else if (bjPl.won[bjPl.sInd] > 0) {
            color = green;
        } else if (bjPl.won[bjPl.sInd] < 0) {
            color = red;
        }

        const embeded = new Discord.MessageEmbed()
            .setColor(color)
            .setAuthor(bjPl.userObject.tag, bjPl.userObject.avatarURL())
            .setTitle('Blackjack: ' + arrSum(bjPl.bet) + 'k')
            .setDescription(bjPl.text)
            .addFields({
                name: nameHand,
                value: myCardsText,
                inline: true
            }, {
                name: 'Dealers hand',
                value: dealCardsText,
                inline: true
            });

        return embeded;
    }

    this.arrSum = function (arr) {
        return arr.reduce(function (a, b) {
            return a + b
        }, 0);
    }

    this.getEndScore = function (bjPl, i) {
        var tempCardsText = '';
        bjPl.myCards[i].forEach(e => {
            emojis.forEach(p => {
                if (p.name == e) tempCardsText += p.id;
            });
        });

        tempCardsText += '\n';

        if (bjPl.myAce[i] > 0 && i == bjPl.sInd) {
            tempCardsText += '\n Score: **Soft ' + (bjPl.myBal[i] - 10 * bjPl.myAce[i]) + '/' + bjPl.myBal[i] + '**';
        } else {
            tempCardsText += '\n Score: **' + bjPl.myBal[i] + '**';
        }

        return tempCardsText;
    }

    this.makeRouletteMessage = function (command, players, winningtext) {
        var ids = '',
            bets = '',
            result = '';
        players.forEach(e => {
            ids += '<@!' + e.id + '>\n';
            bets += e.bet + 'k at ' + e.at + '\n';
            result += (e.win == 0) ? '-\n' : Math.floor(e.win * 0.92) + 'k\n';
        });
        var desc = '';
        desc += (command == 'start') ? 'Roulette game has started.' : '';
        desc += (command == 'end') ? winningtext : '';

        var color = '';
        color += (command == 'start') ? green : '';
        color += (command == 'end') ? red : '';

        const embeded = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle('Roulette game')
            .setDescription(desc)
            .addFields({
                name: '**Players**',
                value: ids,
                inline: true
            }, {
                name: '**Bet**',
                value: bets,
                inline: true
            }, {
                name: '**Win**',
                value: result,
                inline: true
            });

        return embeded;
    }

    this.makeCoinMessage = function (command, msg, bet, desc) {
        var color = '';
        color += (command == 'win') ? green : '';
        color += (command == 'loss') ? red : '';

        const embeded = new Discord.MessageEmbed()
            .setColor(color)
            .setAuthor(msg.member.user.tag, msg.member.user.avatarURL())
            .setTitle('Coin: ' + bet + 'k')
            .setDescription(desc);

        return embeded;
    }

    this.makeRollMessage = function (rolls) {
        var text = '';
        rolls.players.forEach(e => {
            text += '<@!' + e + '>\n';
        });
        var desc = '';
        desc += (rolls.status == 'start') ? 'Dice game has started, react to this post.' : '';
        desc += (rolls.status == 'timeout') ? 'No one wanted to play, game timed out after 15 seconds.' : '';
        desc += (rolls.status == 'end') ? rolls.playersText : '';

        let timeText = (rolls.status == 'start') ? 15 - Math.floor((Date.now() - rolls.time) / 1000) : '0';

        var result = '';
        if (rolls.status == 'end') {
            result += rolls.resultText;
        } else {
            rolls.players.forEach(e => {
                result += '-\n';
            });
        };

        var color = '';
        color += (rolls.status == 'start') ? yellow : '';
        color += (rolls.status == 'end' || rolls.status == 'timeout') ? red : '';

        const embeded = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle(rolls.bet + 'k dice roll in ' + timeText + ' sec')
            .setDescription(desc)
            .addFields({
                name: '**Players in the game**',
                value: text,
                inline: true
            }, {
                name: '**Rolls**',
                value: result,
                inline: true
            });

        return embeded;
    }

    this.makeBalMessage = function (userID, desc, bal, wager, time) {
        const user = client.users.cache.get(userID);

        const embeded = new Discord.MessageEmbed()
            .setColor(green)
            .setAuthor(user.tag, user.avatarURL())
            .setDescription(desc)
            .addFields({
                name: '**Balance**',
                value: bal + 'k',
                inline: true
            }, {
                name: '**Wager**',
                value: wager + 'k',
                inline: true
            }, {
                name: '**Time**',
                value: time,
                inline: true
            });

        return embeded;
    }

    this.makeTotalMessage = function (userID, totbet) {
        const user = client.users.cache.get(userID);
        let desc = 'Your total amount betted is **' + totbet + '**k.';

        const embeded = new Discord.MessageEmbed()
            .setColor(green)
            .setAuthor(user.tag, user.avatarURL())
            .setDescription(desc);

        return embeded;
    }

    this.makeSlotsMessage = function (slotGame, command) {
        const user = client.users.cache.get(slotGame.user);
        let text = '',
            startSpace = '      ';

        text += addTopBars(command);
        text += '      **SLOTS**      ';
        text += addTopBars(command);
        text += '\n\n';

        for (let i = 0; i < 3; i++) {
            let tempEmojis = slotGame.emojis;
            text += (i == 1) ? '**\>**   ' : startSpace;
            for (let j = 0; j < 3; j++) {
                if (command == 'win' && i == 1) {
                    text += slotGame.winOdds.emoji;
                } else {
                    let randIndex = Math.floor(Math.random() * tempEmojis.length),
                        randomEmoji = tempEmojis[randIndex];
                    tempEmojis = tempEmojis.filter((e, i) => i !== randIndex);
                    text += randomEmoji;
                }
                text += (j != 2) ? ' - ' : '';
            }
            text += (i == 1) ? '   **<**' : '';
            text += '\n\n';
        }

        text += addBottomBars(command);
        text += '\n';

        text += '**' + user.username + '#' + user.discriminator + '** ';

        if (command == 'win') {
            if (slotGame.freespin) {
                text += 'just won 10 freespins!'
            } else {
                text += 'won ' + slotGame.win + 'k!';
            }
        } else if (command == 'rolling') {
            text += 'is rolling for ' + slotGame.bet + 'k...';
        } else if (command == 'loss') {
            text += 'lost ' + slotGame.bet + 'k.';
        }

        text += '\n';

        return text;
    }

    this.addTopBars = function (command) {
        let newText = '';
        newText += (command == 'rolling') ? yellowLine : '';
        newText += (command == 'win') ? greenLine : '';
        newText += (command == 'loss') ? redLine : '';
        return newText;
    }
    this.addBottomBars = function (command) {
        let newText = '';
        newText += (command == 'rolling') ? yellowLine + yellowLine + yellowLine + yellowLine + yellowLine + yellowLine : '';
        newText += (command == 'win') ? greenLine + greenLine + greenLine + greenLine + greenLine + greenLine : '';
        newText += (command == 'loss') ? redLine + redLine + redLine + redLine + redLine + redLine : '';
        return newText;
    }

    this.makeFreeSpinMessage = function (freeSpins) {
        const user = client.users.cache.get(freeSpins.user);
        let text = '',
            startSpace = '      ';

        text += (freeSpins.status != 'end') ? freeSpins.counter + ' games left, type **roll** to play.\n' : '';

        text += addFreespinTopBars(freeSpins);
        text += '   **BONUS**   ';
        text += addFreespinTopBars(freeSpins);
        text += '\n\n';

        for (let i = 0; i < 5; i++) {
            text += startSpace;
            for (let j = 0; j < 5; j++) {
                let chance = getRandomInt(100);
                if (chance <= 7 && freeSpins.status != 'start') {
                    text += goldCoin;
                    if (freeSpins.doCount) freeSpins.win += freeSpins.bet;
                } else {
                    text += redCross;
                }
                text += (j != 4) ? ' - ' : '';
            }
            text += '\n\n';
        }

        text += ' ' + addFreespinBottomBars(freeSpins);
        text += '\n';

        text += (freeSpins.status != 'start') ? '**' + user.username + '#' + user.discriminator + '** you have won ' + freeSpins.win + 'k in total.' : '**' + user.username + '#' + user.discriminator + '**';

        freeSpins.text = text;
        return freeSpins;
    }

    this.addFreespinTopBars = function (freeSpins) {
        if ((freeSpins.status == 'rolling' || freeSpins.status == 'end') && !freeSpins.doCount) {
            return yellowLine + yellowLine + yellowLine;
        } else if (freeSpins.status == 'end' && freeSpins.doCount) {
            return redLine + redLine + redLine;
        } else {
            return greenLine + greenLine + greenLine;
        }
    }

    this.addFreespinBottomBars = function (freeSpins) {
        if ((freeSpins.status == 'rolling' || freeSpins.status == 'end') && !freeSpins.doCount) {
            return yellowLine + yellowLine + yellowLine + yellowLine + yellowLine + yellowLine + yellowLine + yellowLine + yellowLine;
        } else if (freeSpins.status == 'end' && freeSpins.doCount) {
            return redLine + redLine + redLine + redLine + redLine + redLine + redLine + redLine + redLine;
        } else {
            return greenLine + greenLine + greenLine + greenLine + greenLine + greenLine + greenLine + greenLine + greenLine;
        }
    }
};