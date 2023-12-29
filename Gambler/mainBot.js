module.exports = function (channelName, loginToken, gamePath) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    const mysql = require('mysql');

    require('./frontEnd.js')(Discord, client);
    require(gamePath)(client, Discord);
    if (gamePath == './Games/Slot/slot.js') require('./Games/Slot/freespins.js')(client);

    client.on('ready', function () {
        console.log(`Logged in as ${client.user.tag}!`);

        const con = mysql.createConnection({
            host: '80.209.224.162',
            user: 'frac',
            password: 'Password123#@!',
            database: 'Gambler'
        });

        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected to mySQL database!");

            require('./functions.js')(con, client);
        });

        con.on('error', function (err) {
            console.log('db error', err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                handleDisconnect();
            } else {
                throw err;
            }
        });

        setInterval(function () {
            con.query('SELECT 1');
        }, Math.floor((10 + Math.random() * 50) * 1000));
    });


    client.on('message', function (msg) {
        let command = msg.toString().toLowerCase().split(' ')[0];
        if (msg.channel.name === channelName && command[0] == '!') {
            parseGame(msg);
        }
    });

    client.on('error', function (e) {
        console.log('Error ' + e);
    });

    client.on('debug', function (e) {
        //console.log('Debug ' + e);
    });

    client.login(loginToken);
};