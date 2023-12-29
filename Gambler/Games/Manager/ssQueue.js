module.exports = function (con, Spreadsheet) {

    // Win is player win and NOT casino win.
    let timeCheck = 1 * 60 * 1000;
    setInterval(() => {
        var sql = 'SELECT * FROM ssQueue';
        con.query(sql, (err, result) => {
            if (err) throw err;

            var sql = 'UPDATE ssQueue SET bal = 0';
            con.query(sql, err => {
                if (err) throw err;
            });

            let data = [],
                totCalendar = 0;

            result.forEach(e => {
                data.push(e.bal);
                if (e.result == 'win') {
                    totCalendar -= e.bal;
                } else {
                    totCalendar += e.bal;
                }
            });

            try {
                Spreadsheet.updateAllStats(data, totCalendar);
            } catch (e) {
                //Error, insert the old values again.
                var sql = "INSERT INTO ssQueue (id, game, result, bal) VALUES ";
                result.forEach(e => {
                    sql += "(" + e.id + ", '" + e.game + "', '" + e.result + "', " + e.bal + "),"
                });
                sql = sql.slice(0, -1);
                sql += "ON DUPLICATE KEY UPDATE id=VALUES(id), game=VALUES(game), result=VALUES(result), bal=VALUES(bal);";

                con.query(sql, err => {
                    if (err) throw err;
                    console.log('Values re-written in ssQueue!');
                });

                console.log(e);
            }
        });
    }, timeCheck);
}