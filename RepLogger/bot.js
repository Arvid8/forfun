const Discord = require('discord.js');
const client = new Discord.Client();
var mysql = require('mysql');
require('./functions.js')();

var con;

client.on('ready', function () {
    console.log(`Logged in as ${client.user.tag}!`);

    con = mysql.createConnection({
        host: 'localhost',
        user: 'frac',
        password: '',
        database: 'RepLogger'
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected to mySQL database!");
    });

    // Set timer to mover channels at wednesdays at 09:00 UTC.
    // var intervalMoveFeatured = setInterval(function () {
    //     var date = new Date();
    //     //console.log(date.getUTCHours() + " " + date.getUTCMinutes() + " " + date.getUTCDay());
    //     if (date.getUTCHours() === 9 && date.getUTCMinutes() === 0 && date.getUTCDay() === 3) {
    //         moveFirstChannel();
    //     }
    // }, 60 * 1000); // 1 min

    // Set timer to reduce queued rep
    var intervalReduceQued = setInterval(function () {
        reduceQueue(con);
    }, 60 * 60 * 1000); // 1 hour
});


client.on('message', function (msg) {
    if (msg.content.startsWith('+rep')) {
        let input = parseCommand(msg, client);
        if (input) {
            var sender = input[0],
                senderID = input[1],
                receiver = input[2],
                feedback = input[3];

            if (receiver == senderID) {
                msg.reply("you can't give rep to yourself!");
            } else {
                // Give the actual rep
                queueRep(con, 1, sender, senderID, receiver, feedback, msg);
            }
        }
    } else if (msg.content.startsWith('+negrep')) {
        let input = parseCommand(msg, client);
        if (input) {
            var sender = input[0],
                senderID = input[1],
                receiver = input[2],
                feedback = input[3];

            if (receiver == senderID) {
                msg.reply("you can't give negative rep to yourself!");
            } else if (feedback == "") {
                msg.reply("when giving negative rep you need to provide feedback!");
            } else {
                // Give the actual negative rep
                queueRep(con, -1, sender, senderID, receiver, feedback, msg);
            }
        }
    } else if (msg.content.startsWith('+checkrep')) {
        let input = parseCommand(msg, client);
        if (input) {
            var checkuser = input[2],
                page = input[3];

            if (page == "" || isNaN(page)) {
                page = 1;
            }

            checkBeforeCheck(con, 0, checkuser, page, function (totrep, posrep, negrep, feedback, err) {
                if (err) {
                    var text = 'Please enter a page number between 1 and ' + totrep + "!";
                } else {
                    var text = checkuser + ' has **' + (posrep + negrep) + '** rep (**' + posrep + '** positive, **' + negrep + '** negative) ';
                    text += feedback;
                }

                msg.channel.send(text);
            });

        }
    } else if (msg.content.startsWith('+checknegrep')) {
        let input = parseCommand(msg, client);
        if (input) {
            var checkuser = input[2],
                page = input[3];

            if (page == "" || isNaN(page)) {
                page = 1;
            }

            checkBeforeCheck(con, -1, checkuser, page, function (totrep, posrep, negrep, feedback, err) {
                if (err) {
                    var text = 'Please enter a page number between 1 and ' + totrep + "!";
                } else {
                    var text = checkuser + ' has **' + negrep + '** negative reps ';
                    text += feedback;
                }

                msg.channel.send(text);
            });
        }
    } else if (msg.content.startsWith('+checkposrep')) {
        let input = parseCommand(msg, client);
        if (input) {
            var checkuser = input[2],
                page = input[3];

            if (page == "" || isNaN(page)) {
                page = 1;
            }

            checkBeforeCheck(con, 1, checkuser, page, function (totrep, posrep, negrep, feedback, err) {
                if (err) {
                    var text = 'Please enter a page number between 1 and ' + totrep + "!";
                } else {
                    var text = checkuser + ' has **' + posrep + '** positive reps ';
                    text += feedback;
                }

                msg.channel.send(text);
            });
        }
    } else if (msg.content.startsWith('+help')) {
        var text = '**RepLogger has the following commands:**\n\n'
        text += '**+rep @player feedback** \nGives a player 1 positive rep with optional feedback. Both parties must give rep to each other within 24 hours or no one will receive any rep.\n\n';
        text += '**+negrep @player feedback** \nGives a player 1 negative rep with **mandatory** feedback.\n\n';
        text += "**+checkrep @player page_number** \nLists the player's reputaion. If page_number is not specified then the first page is shown.\n\n";
        text += "**+checkposrep @player page_number** \nLists the player's positive reputaion. If page_number is not specified then the first page is shown.\n\n";
        text += "**+checknegrep @player page_number** \nLists the player's negative reputaion. If page_number is not specified then the first page is shown.";

        msg.channel.send(text);
    } else if (msg.content.startsWith('+giverep') && msg.member.permissions.has('ADMINISTRATOR') && msg.member.user.id == '226809491570556929') {
        let input = parseCommand(msg, client);
        if (input) {
            var sender = input[0],
                senderID = input[1],
                receiver = input[2],
                rep = parseInt(input[3]);

            if (isNaN(rep)) {
                var text = 'You need to specify number of reps to give!'
                msg.channel.send(text);
            } else {
                checkBeforeUpdate(con, rep, senderID, receiver, "");

                var text = rep + ' rep given to ' + receiver;
                msg.channel.send(text);
            }
        }
    }
    //console.log(msg.member.user.id);
});



client.login("Njk4MjQ5NDU2Mjg5NTc5MDcw.XpDLxg.NThFbmt0_xqUDRkrcxW95PRoyKU");
