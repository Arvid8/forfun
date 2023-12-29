module.exports = function (con, client) {
    const ranks = require("./Games/Manager/ranks");

    // ------------------------- SQL Management -------------------------

    this.checkForRow = function (userID, callback) {
        var sql = "SELECT * FROM main WHERE user = '" + userID + "';";
        con.query(sql, function (err, result) {
            if (result.length == 0) {
                var sql = "INSERT INTO main(user, balance, time, wager, totBet) VALUES('" + userID + "', 0, 0, 0, 0);";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    setTimer(userID);
                    return callback(result);
                });
            } else {
                return callback(result);
            }
        });
    }

    // ------------------------- Spreadsheet -------------------------

    this.updateSheet = function (game, result, bet, callback) {
        checkSheet(game, result, function (sheetValue) {
            var newbal = Math.floor(parseInt(sheetValue) + parseInt(bet));
            newbal = (newbal > 0) ? newbal : 0;
            var sql = "UPDATE ssQueue SET bal = " + newbal + " WHERE game = '" + game + "' AND result = '" + result + "';";
            con.query(sql, err => {
                if (err) throw err;
                return callback(newbal);
            });
        });
    }

    this.checkSheet = function (game, result, callback) {
        var sql = "SELECT bal FROM ssQueue WHERE game = '" + game + "' AND result = '" + result + "';";
        con.query(sql, function (err, result) {
            if (err) throw err;
            return callback(result[0]['bal']);
        });
    }

    // ------------------------- Balanace -------------------------

    this.addBalance = function (userID, baltoadd, callback) {
        checkBalance(userID, function (result) {
            var newbal = Math.floor(parseInt(result) + parseInt(baltoadd));
            newbal = (newbal > 0) ? newbal : 0;
            var sql = "UPDATE main SET balance = " + newbal + " WHERE user='" + userID + "';";
            con.query(sql, err => {
                if (err) throw err;
                return callback(newbal);
            });
        });
    }

    this.checkBalance = function (userID, callback) {
        checkForRow(userID, function (temp) {
            var sql = "SELECT balance FROM main WHERE user = '" + userID + "';";
            con.query(sql, function (err, result) {
                if (err) throw err;
                return callback(result[0]['balance']);
            });
        });
    }

    // ------------------------- Withdrawal Timer -------------------------

    this.setTimer = function (userID) {
        var atm = Date.now();
        var sql = "UPDATE main SET time = " + atm + " WHERE user='" + userID + "';";
        con.query(sql);
    }

    this.checkTime = function (userID, callback) {
        checkForRow(userID, x => {
            var sql = "SELECT time FROM main WHERE user = '" + userID + "';";
            con.query(sql, function (err, result) {
                if (err) throw err;

                var timeAdded = result[0]['time'];
                return callback(msToTime(Date.now() - timeAdded));
            });
        });
    }

    this.msToTime = function (duration) {
        var seconds = Math.floor(60 - (duration / 1000) % 60),
            minutes = Math.floor(60 - (duration / (1000 * 60)) % 60),
            hours = Math.floor(48 - (duration / (1000 * 60 * 60)) % 24);

        if (duration >= 48 * 60 * 60 * 1000) return '0';

        var text = '';
        text += (hours == 0) ? '' : '**' + hours + '** hrs ';
        text += (minutes == 0) ? '' : '**' + minutes + '** min ';
        text += '**' + seconds + '** sec';

        return text;
    }

    // ------------------------- Wager -------------------------

    this.addWager = function (userID, baltoadd, callback) {
        checkWager(userID, function (result) {
            var newbal = Math.floor(parseInt(result) + parseInt(baltoadd));
            newbal = (newbal > 0) ? newbal : 0;
            var sql = "UPDATE main SET wager = " + newbal + " WHERE user='" + userID + "';";
            con.query(sql, err => {
                if (err) throw err;
                return callback(newbal);
            });
        });
    }

    this.checkWager = function (userID, callback) {
        checkForRow(userID, function (temp) {
            var sql = "SELECT wager FROM main WHERE user = '" + userID + "';";
            con.query(sql, function (err, result) {
                if (err) throw err;
                return callback(result[0]['wager']);
            });
        });
    }

    // ------------------------- Game things -------------------------

    this.checkBet = function (msg, userID, bet, isWager, addToTotal, callback) {
        checkBalance(userID, function (result) {
            if (result >= bet && bet >= 10) {
                checkRankUpgrade(userID, bet, addToTotal, () => { // Rank upgrade
                    loss(userID, bet, isWager, newbal => {
                        return callback({
                            canPlay: true,
                            bal: newbal
                        });
                    });
                });
            } else if (bet < 10) {
                sendMessage(msg, '<@!' + userID + ">, the minumum bet is 10k.");
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

    this.win = function (userID, money, cut, isWager, callback) {
        addBalance(userID, Math.floor(cut * money), function (output) {
            if (isWager) {
                addWager(userID, -money, function (temp) {
                    return callback(output);
                });
            } else {
                return callback(output);
            }
        });
    }

    this.loss = function (userID, money, isWager, callback) {
        addBalance(userID, -money, function (newbal) {
            if (isWager) {
                addWager(userID, -money, function (temp) {
                    return callback(newbal);
                });
            } else {
                return callback(newbal);
            }
        });
    };

    // ------------------------- Jackpot -------------------------

    this.tryForJackpot = function (player, bet) {
        getGamblingRole(player, topRole => {
            const chanceToWin = topRole.jackpot / 100; //In percent
            //const chanceToWin = 50 / 100; //In percent
            const maxRolls = 1 / chanceToWin;
            const winner = getRandomInt(maxRolls);

            if (winner === 1) {
                console.log('MaxRolls: ' + maxRolls + ', chanceToWin: ' + chanceToWin + ' & winner: ' + winner);
                console.log(winner);
                const channel = client.channels.cache.get('734004487382892554');
                channel.send(player + ' ' + bet); // Send player for manager to post
            }
        });
    }

    // ------------------------- Rank Upgrade -------------------------

    this.checkRankUpgrade = function (userID, bet, addToTotal, callback) {
        if (addToTotal) {
            addTotBet(userID, bet, totBet => {
                let n = 1;
                totBet /= 1000;

                if (totBet >= 1000) {
                    n = 6;
                } else if (totBet >= 700) {
                    n = 5;
                } else if (totBet >= 400) {
                    n = 4;
                } else if (totBet >= 200) {
                    n = 3;
                } else if (totBet >= 50) {
                    n = 2;
                }
                getGamblingRole(userID, topRole => {
                    if (n > topRole.rank) upradeRank(userID, n);
                    callback();
                });
            });
        } else {
            callback();
        }
    }

    this.upradeRank = function (userID, n) {
        const user = client.users.cache.get(userID);
        const guild = client.guilds.cache.get('732675304228651109');
        const member = guild.member(user);

        member.roles.cache.forEach((e, i) => {
            ranks.forEach((e2, i2) => {
                if (e2.rank > 1 && e.id == e2.id) {
                    member.roles.remove(e);
                }
            });
        });
        const role = ranks.find(item => item.rank == n);
        const roleToAdd = guild.roles.cache.find(item => item.id == role.id);
        member.roles.add(roleToAdd);

        const channel = client.channels.cache.get('734842887786987582');
        channel.send(userID + ' ' + role.id); // Send information to manager to post
    }

    this.getGamblingRole = function (playerID, callback) {
        const user = client.users.cache.get(playerID),
            guild = client.guilds.cache.get('732675304228651109'),
            member = guild.member(user);

        let topRank = 0,
            topRole = 0;
        member.roles.cache.forEach((e, i) => {
            ranks.forEach((e2, i2) => {
                if (e.id == e2.id && e2.rank > topRank) {
                    topRank = e2.rank;
                    topRole = e2;
                }
            });
        });
        if (topRole == 0) {
            topRole = ranks[Object.keys(ranks)[0]];
            member.roles.add(topRole.id);
        }
        return callback(topRole);
    }

    // ------------------------- Total bet -------------------------

    this.checkTotBet = function (userID, callback) {
        checkForRow(userID, function (temp) {
            var sql = "SELECT totBet FROM main WHERE user = '" + userID + "';";
            con.query(sql, function (err, result) {
                if (err) throw err;
                return callback(result[0]['totBet']);
            });
        });
    }

    this.addTotBet = function (userID, baltoadd, callback) {
        checkTotBet(userID, function (result) {
            var newbal = Math.floor(parseInt(result) + parseInt(baltoadd));
            newbal = (newbal > 0) ? newbal : 0;
            var sql = "UPDATE main SET totBet = " + newbal + " WHERE user='" + userID + "';";
            con.query(sql);

            return callback(newbal);
        });
    }

    // ------------------------- Misc -------------------------

    this.removeElement = function (array, elem) {
        var index = array.indexOf(elem);
        if (index > -1) {
            array.splice(index, 1);
        }
    }

    this.getUserFromMention = function (mention) {
        // The id is the first and only match found by the RegEx.
        const matches = mention.match(/^<@!?(\d+)>$/);

        // If supplied variable was not a mention, matches will be null instead of an array.
        if (!matches) return false;

        // However the first element in the matches array will be the entire mention, not just the ID,
        // so use index 1.
        const id = matches[1];

        return id;
    }

    this.getRandomInt = function (max) {
        return Math.floor(Math.random() * Math.ceil(max) + 1);
    }

    this.isError = function (msg) {
        msg.reply("you're using bad format! You can read more about the commands in <#734356153848561694> and <#735899501918814258>.");
        return false;
    }

    this.sendMessage = function (msg, text) {
        msg.channel.send(text).catch(e => {
            console.log(e);
        });
    }

    this.sendMaxBet = function (msg, userID, maxbet) {
        sendMessage(msg, '<@!' + userID + ">, the maximum bet for this game is " + maxbet + 'k.');
    }

    this.sendWelcomeMessage = function (user) {
        let text = '';

        text += '**Welcome to my Casino!**\n'
        text += '\n';
        text += '**To get started read these 5 simple steps:**\n';
        text += ':white_small_square: Head to <#732691647527256104> and accept the ToS.\n'
        text += ':white_small_square: Read through <#734356153848561694>, <#734848035389046804> or <#734848070373736468>.\n'
        text += ':white_small_square: Head to <#732683982906458312> to make your first deposit.\n'
        text += ':white_small_square: Trade the Trusted Collector to get your balance.\n'
        text += ':white_small_square: Start playing!\n'
        text += '\n';
        text += 'For further questions head over to <#732684056457773116>.\n';
        text += '\n';
        text += '**Happy Gamble!**';
        user.send(text);
    }
}