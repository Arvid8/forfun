module.exports = function (client, Spreadsheet) {
    const ranks = require("./ranks");

    this.listenForMessages = function (msg) {
        var input = parseCommand(msg);
        if (input) {
            let senderID = input[0];
            let command = input[1];
            let userID = input[2];
            let baltoadd = input[3];

            let isCollector = isCollectorRank(senderID);
            let isAdmin = isAdminRank(senderID);

            if (command == '!bal' || command == '!balance') {
                let desc = 'Balance, wager & time until withdrawal.';
                printBal(msg, userID, desc);
                return;

            } else if (command == '!total') {
                checkTotBet(userID, totbet => {
                    const embeded = makeTotalMessage(userID, totbet);
                    sendMessage(msg, embeded);
                });
                return;
            }

            // Collector commands
            if (!(isCollector || isAdmin)) {
                lackPrivileges(msg, userID, command);
                return;
            }

            if ((command == '!addbal' || command == '!subbal')) {
                if (command == '!subbal') baltoadd = -baltoadd;
                addBalance(userID, baltoadd, x => {
                    addWager(userID, baltoadd, x => {
                        let desc = '';
                        desc += (command == '!addbal') ? baltoadd + 'k has been added to your balance.' : '';
                        desc += (command == '!subbal') ? (-baltoadd) + 'k has been removed from your balance.' : '';
                        printBal(msg, userID, desc);

                        if (command == '!addbal') setTimer(userID);

                        let senderTag = getSender(msg),
                            userTag = getUser(msg);

                        if (command == '!addbal') {
                            Spreadsheet.addToAddBalance(senderTag, userTag, input[3]);
                        } else {
                            Spreadsheet.addToRemoveBalance(senderTag, userTag, input[3]);
                        }
                    });
                });
                return;

            } else if (command == '!addwager') {
                addAndCheckParsingWager(msg, userID, baltoadd);
                return;

            } else if (command == '!subwager') {
                addWager(userID, -baltoadd, function (output) {
                    let desc = baltoadd + 'k has been removed from your wager.';
                    printBal(msg, userID, desc);
                });
                return;
            }

            // Admin commands
            if (!isAdmin) {
                lackPrivileges(msg, userID, command);
                return;
            }

            if (command == '!reset-ranks' && isAdmin) {
                const user = client.users.cache.get(userID),
                    guild = client.guilds.cache.get('732675304228651109'),
                    member = guild.member(user);

                ranks.forEach((e, i) => {
                    if (member.roles.cache.some(role => (role.id === e.id && e.id != '732691492598054993'))) {
                        member.roles.remove(e.id);
                    }
                });
                // Set total to 0
                checkTotBet(userID, totBet => {
                    addTotBet(userID, -totBet, x => {
                        let desc = 'All gambling roles has been reset!';
                        printBal(msg, userID, desc);
                    });
                });
                return;
            }
        }
    }

    this.parseCommand = function (msg) {
        var input = msg.toString().toLowerCase().split(' ');
        var command = input[0];
        var args = input.length;
        var senderID = msg.member.user.id;

        if ((command == '!bal' || command == '!balance' || command == '!total') && args == 1) {
            var userID = senderID;

        } else if ((command == '!bal' || command == '!balance' || command == '!total' || command == '!reset-ranks') && args == 2) {
            var userID = getUserFromMention(input[1]);

        } else if ((command == '!addbal' || command == '!subbal' || command == '!addwager' || command == '!subwager') && args == 3) {
            var userID = getUserFromMention(input[1]);
            var num = input[2];

            var patt = /^\d+$/;
            if (userID == false || !patt.test(num)) return isError(msg);

        } else {
            return isError(msg);
        }
        if (userID == false) return isError(msg);

        return [senderID, command, userID, num];
    }

    this.printBal = function (msg, userID, desc) {
        checkBalance(userID, function (newBal) {
            checkWager(userID, function (newWager) {
                checkTime(userID, function (newTime) {
                    const embeded = makeBalMessage(userID, desc, newBal, newWager, newTime);
                    sendMessage(msg, embeded);
                });
            });
        });
    }

    this.lackPrivileges = function (msg, userID, command) {
        msg.delete();
        const user = client.users.cache.get(userID);
        let text = 'You lack the ranks for the command "' + command + '".';
        user.send(text);
    }

    this.isCollectorRank = function (userID) {
        const user = client.users.cache.get(userID),
            guild = client.guilds.cache.get('732675304228651109'),
            member = guild.member(user);
        let isAdmin = false;

        member.roles.cache.forEach((e, i) => {
            if (e.id == '732676498863161386' || // Trusted Collector
                e.id == '751089245640458341') // Trial Collector 
                isAdmin = true;
        });
        return isAdmin;
    }

    this.isAdminRank = function (userID) {
        const user = client.users.cache.get(userID),
            guild = client.guilds.cache.get('732675304228651109'),
            member = guild.member(user);
        let isAdmin = false;

        member.roles.cache.forEach((e, i) => {
            if (e.id == '732676619415847052' || // Casino Staff
                e.id == '753545479064649780') // Developer
                isAdmin = true;
        });
        return isAdmin;
    }

    this.addAndCheckParsingWager = function (msg, userID, baltoadd) {
        if (baltoadd > 500) {
            sendMessage(msg, 'Maximum wager to add is 500k!');
            return;
        }

        const user = client.users.cache.get(userID),
            guild = client.guilds.cache.get('732675304228651109'),
            member = guild.member(user);

        if (member.roles.cache.some(role => role.id == '752097334086598667')) {
            sendMessage(msg, '<@!' + userID + '> has already claimed the welcome bonus!');
            return;
        } else {
            member.roles.add('752097334086598667');

            addBalance(userID, 3 * baltoadd, x => {
                let senderTag = getSender(msg),
                    userTag = getUser(msg);
                Spreadsheet.addToAddBalance(senderTag, userTag, 3 * baltoadd);

                addWager(userID, 40 * baltoadd, x => {
                    setTimer(userID);
                    let desc = (3 * baltoadd) + 'k has been added to your balance.\n';
                    desc += (40 * baltoadd) + 'k has been added to your wager.';
                    printBal(msg, userID, desc);
                });
            });
        }
    }

    this.getSender = function (msg) {
        let sender = msg.guild.member(msg.author),
            senderTag = sender.nickname;

        if (senderTag == null)
            senderTag = sender.user.username + '#' + sender.user.discriminator;

        return senderTag;
    }

    this.getUser = function (msg) {
        let user = msg.guild.member(msg.mentions.users.first()),
            userTag = user.nickname;

        if (userTag == null)
            userTag = user.user.username + '#' + user.user.discriminator;

        return userTag;
    }
}