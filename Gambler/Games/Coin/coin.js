module.exports = function () {
    const maxbet = 250;

    this.parseGame = function (msg) {
        let input = msg.toString().toLowerCase().split(' ');
        let command = input[0];
        let bet = input[1];
        let args = input.length;
        let senderID = msg.member.user.id;
        if (bet > maxbet) {
            sendMaxBet(msg, senderID, maxbet);
            return;
        }

        if ((command == '!coin') && args == 2) {
            let patt = /^\d+$/;
            if (!patt.test(bet)) return isError(msg);
            coin(msg, senderID, bet);
        } else {
            isError(msg);
        }
    }

    this.coin = function (msg, userID, bet) {
        checkBet(msg, userID, bet, true, true, function (result) {
            if (!result.canPlay) return;
            tryForJackpot(userID, bet); // Jackpot chance

            let gamble = getRandomInt(1000),
                fee = 0.92;
            if (gamble <= 460) {
                addBalance(userID, bet, x => {
                    win(userID, bet, fee, false, newbal => {
                        var text = "You won " + Math.floor(fee * bet) + "k! Your new balance is " + newbal + "k.";
                        const embeded = makeCoinMessage('win', msg, bet, text);
                        sendMessage(msg, embeded);
                        updateSheet('coin', 'win', bet, x => {});
                    });
                });
            } else {
                var text = "You lost. Your new balance is " + result.bal + "k.";
                const embeded = makeCoinMessage('loss', msg, bet, text);
                sendMessage(msg, embeded);
                updateSheet('coin', 'loss', bet, x => {});
            }
        });
    }
}