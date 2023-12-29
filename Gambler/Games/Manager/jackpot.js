module.exports = function (client, Discord) {
    client.on('message', function (msg) {
        if (msg.channel.id == '734004487382892554' &&
            (msg.member.user.id == '742387021787693096' || // coin
                msg.member.user.id == '733285649930780684' || // bj
                msg.member.user.id == '742387092222509076' || // dice
                msg.member.user.id == '748497179408334963' || // slots
                msg.member.user.id == '742386652718039170')) { // roulette

            let input = msg.toString().toLowerCase().split(' ');

            let jp = {
                msg: msg,
                user: input[0],
                bet: input[1],
                totTime: 5 * 60 * 1000,
                win: 0
            };

            let text = '<@!' + input[0] + '>';
            jp.msg.channel.send(text).then(message => {
                setTimeout(() => {
                    message.delete();
                }, 1000);
            });

            msg.delete();
            const embeded = makeJackpotMessage(jp);
            msg.channel.send(embeded).then(message => {
                jp.msg = message;
                startJackpot(jp);
            });
        }
    });

    this.startJackpot = function (jp) {
        let updateTime = 60 * 1000;
        let interval = setInterval(function () {
            jp.totTime -= updateTime;

            if (jp.totTime <= 0) {
                //jp.mult = getRandomInt(101) + 19;
                //jp.win = jp.mult * jp.bet;
                jp.win = getRandomInt(1901) + 99;

                win(jp.user, jp.win, 1, false, x => {
                    updateSheet('jackpot', 'loss', jp.win, x => {});
                });
                clearInterval(interval);
            }

            const embeded = makeJackpotMessage(jp);
            jp.msg.edit(embeded);
        }, updateTime);
    }

    this.makeJackpotMessage = function (jp) {
        const green = '#10E04B';
        let winning = (jp.win == 0) ? '-' : jp.win + 'k';

        const embeded = new Discord.MessageEmbed()
            .setColor(green)
            .setTitle('Jackpot!')
            .setDescription('<@!' + jp.user + '> just hit a jackpot!')
            .addFields({
                    name: '**Time Remaining**',
                    value: jp.totTime / 1000 / 60 + ' min',
                    inline: true
                }
                /*, {
                                name: '**Bet Size **',
                                value: jp.bet + 'k',
                                inline: true
                            }*/
                , {
                    name: '**Jackpot**',
                    value: winning,
                    inline: true
                });
        return embeded;
    }
}