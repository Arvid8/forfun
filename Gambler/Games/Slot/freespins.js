module.exports = function (client) {
    this.startFreespin = function (slotGame) {
        // Create a new game object
        let freeSpins = {
            msg: '',
            user: slotGame.user,
            bet: parseInt(slotGame.bet),
            status: 'start',
            counter: 10,
            win: 0,
            text: '',
            doCount: false
        };

        freeSpins = makeFreeSpinMessage(freeSpins);

        // Send a freespin message
        const channel = client.channels.cache.get('734857571554558102');
        channel.send(freeSpins.text).then(async function (message) {
            freeSpins.msg = message;
            freeSpins.status = 'ready';

            const filter = msg => {
                return (msg.author.id != message.author.id) &&
                    (msg.author.id == freeSpins.user) &&
                    (freeSpins.status == 'ready') &&
                    (msg.content.toString().toLowerCase() == 'roll');
            };

            const collector = message.channel.createMessageCollector(filter, {
                time: 24 * 60 * 60 * 1000
            });

            collector.on('collect', msg => {
                freeSpins.counter--;
                freeSpins.status = 'rolling';
                if (freeSpins.counter <= 0) freeSpins.status = 'end';
                sendfreeSpins(freeSpins, newSpins => {
                    freeSpins = newSpins;
                    if (freeSpins.status == 'end') collector.stop();

                    freeSpins.status = 'ready';
                    freeSpins.doCount = false;
                });
                try {
                    msg.delete();
                } catch {
                    console.log('Double freespin!');
                }
            });

            collector.on('end', () => {
                addBalance(freeSpins.user, freeSpins.win, x => {
                    updateSheet('slot', 'win', (freeSpins.win - freeSpins.bet), x => {});
                });
                const user = client.users.cache.get(freeSpins.user);
                const guild = client.guilds.cache.get('732675304228651109');
                const member = guild.member(user);

                setTimeout(() => {
                    // Freespins
                    member.roles.remove('749950986411573279');
                    // Verified
                    member.roles.add('732691492598054993');
                }, 10 * 1000);
            });
        });
    }

    this.sendfreeSpins = async function (freeSpins, callback) {
        let counter = 0;
        let interval = function () {
            counter++;
            if (counter == 1 || counter == 2) {
                freeSpins = makeFreeSpinMessage(freeSpins);
                freeSpins.msg.edit(freeSpins.text);
                setTimeout(interval, 1000);
            } else if (counter == 3) {
                freeSpins.doCount = true;
                freeSpins = makeFreeSpinMessage(freeSpins);
                freeSpins.msg.edit(freeSpins.text);
                return callback(freeSpins);
            }
        }
        setTimeout(interval, 1000);
    }
}