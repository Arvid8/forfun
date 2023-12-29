module.exports = function (client, Discord) {
    client.on('message', function (msg) {
        if (msg.channel.id == '734842887786987582' &&
            (msg.member.user.id == '742387021787693096' || // coin
                msg.member.user.id == '733285649930780684' || // bj
                msg.member.user.id == '742387092222509076' || // dice
                msg.member.user.id == '748497179408334963' || // slots
                msg.member.user.id == '742386652718039170')) { // roulette

            let input = msg.toString().toLowerCase().split(' ');
            let userID = input[0];
            let roleID = input[1];

            const embeded = makeUpgradeMessage(userID, roleID);
            msg.channel.send(embeded);

            msg.delete();
        }
    });

    this.makeUpgradeMessage = function (userID, roleID) {
        const green = '#10E04B';
        const embeded = new Discord.MessageEmbed()
            .setColor(green)
            .setTitle('Rank upgrade!')
            .setDescription('<@!' + userID + '> just upgraded to rank <@&' + roleID + '>!');
        /*.addFields({
    name: '**Player**',
    value: '<@!' + userID + '>',
    inline: true
}, {
    name: '**New rank**',
    value: '<@&' + role.id + '>',
    inline: true
})*/
        return embeded;
    }
}