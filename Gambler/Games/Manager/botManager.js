const Discord = require('discord.js');
const client = new Discord.Client();
const mysql = require('mysql');
const Spreadsheet = require('../../googleSpreadsheet/spreadsheet.js');

require('../../frontEnd.js')(Discord, client);
require('./balance.js')(client, Spreadsheet);
require('./jackpot.js')(client, Discord);
require('./lottery.js')(client, Discord);
require('./rankUpgrade.js')(client, Discord);


client.on('ready', function () {
    console.log(`Logged in as ${client.user.tag}!`);

    Spreadsheet.setup();

    const con = mysql.createConnection({
        host: '80.209.224.162',
        user: 'frac',
        password: 'Password123#@!',
        database: 'Gambler'
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected to mySQL database!");

        require('../../functions.js')(con, client);
        require('./ssQueue.js')(con, Spreadsheet);
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
    if (command[0] == '!') {
        if (msg.channel.name === 'balance' ||
            msg.channel.parentID == '752101811816628296' || // Cashier requests
            msg.channel.parentID == '752110478775549992') { // Support tickets
            listenForMessages(msg);
        }
    }
});

client.on("guildMemberAdd", member => {
    Spreadsheet.increaseMember();
    sendWelcomeMessage(member.user);
});

client.on("guildMemberRemove", member => {
    Spreadsheet.decreaseMember();
});

client.login("NzQ0NTk1OTAyMzYyMTU3MDU2.Xzlg-Q.tDsx9KJ8Opi4TNeuGK9N-R5E6GA");