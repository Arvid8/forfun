module.exports = function () {
    this.parseCommand = function (msg, client) {
        let message = msg.toString();
        let receiver = message.match(/rep (\<\@\d+\>).*?$/);
        let feedback = message.match(/rep \<\@\d+\> (.*?)$/);
        let sender = msg.member.user.tag;
        let senderID = '<@' + msg.member.user.id + '>';

        // Check for bad format
        if (receiver === null) {
            msg.reply("you're using bad format! Type +help for all the commands.");
            return false;
        }

        // Format is ok, get receiver
        receiver = receiver[1].toString(); //.substr(2).slice(0, -1);

        // Check for feedback
        if (feedback === null) {
            feedback = "";
        } else {
            feedback = feedback[1].toString();
        }

        return [sender, senderID, receiver, feedback];
    }

    this.reduceQueue = function (con) {
        // Check if queue exists, otherwise create
        checkQueueTable(con, function (result) {
            var sql = 'SELECT * FROM queue;';
            con.query(sql, function (err, result) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    var time = result[i]['time'];
                    var giverID = result[i]['giverID'];
                    var receiver = result[i]['receiver'];

                    if (time == 1) {
                        // Delete row
                        var sql = "DELETE FROM queue WHERE giverID='" + giverID + "' AND receiver='" + receiver + "';";
                        con.query(sql, function (err, result) {
                            if (err) throw err;
                            console.log(result.length);
                        });
                    } else {
                        // Reduce time by 1 hour
                        var sql = "UPDATE queue SET time=" + (time - 1) + " WHERE giverID='" + giverID + "' AND receiver='" + receiver + "';";
                        con.query(sql, function (err, result) {
                            if (err) throw err;
                        });
                    }
                }
            });
        });
    }

    this.moveFirstChannel = function () {
        let catID = '698178568903196682';
        let category = client.channels.cache.find(u => u.id === catID);
        let maxChan = category.children.size;
        let chanFirst = category.children.find(u => u.position === 0);
        chanFirst.setPosition(maxChan - 2);
        console.log('First channel set to last!');
    }

    this.checkTableExists = function (con, table, callback) {
        var sql = "SELECT * FROM `" + table + "`;";
        con.query(sql, function (err) {
            if (err) return callback(false);
            return callback(true);
        });
    }

    this.createTable = function (con, receiver, callback) {
        var sql = "CREATE TABLE `" + receiver + "` (id INT AUTO_INCREMENT PRIMARY KEY, rep INT NOT NULL, giver TEXT NOT NULL, feedback TEXT NOT NULL);";
        con.query(sql, function (err, result) {
            if (err) throw err;

            var sql = "INSERT INTO `" + receiver + "` (rep, giver, feedback) VALUES(0, '0', '0');";
            con.query(sql, function (err, result) {
                if (err) throw err;
                return callback(result);
            });
        });
    }

    this.getFirst = function (con, receiver, column, callback) {
        var sql = "SELECT " + column + " FROM `" + receiver + "` WHERE id=1;";
        con.query(sql, function (err, result) {
            if (err) throw err;
            //console.log(result[0][column]);
            return callback(result[0][column]);
        });
    }

    this.checkQueueTable = function (con, callback) {
        checkTableExists(con, 'queue', function (result) {
            if (!result) {
                // Create a table and go on
                console.log('creating a queue table');
                var sql = 'CREATE TABLE queue (id INT AUTO_INCREMENT PRIMARY KEY, time INT NOT NULL, giver TEXT NOT NULL, giverID TEXT NOT NULL, receiver TEXT NOT NULL, feedback TEXT);';
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    return callback(result);
                });
            }
            return callback(result);
        });
    }

    this.queueRep = function (con, rep, giver, giverID, receiver, feedback, msg) {
        checkQueueTable(con, function (result) {
            if (0 > rep) {
                // Send text
                let text = giverID + ' gave negative rep and feedback to ' + receiver;
                msg.channel.send(text);

                // Update table
                checkBeforeUpdate(con, rep, giver, receiver, feedback);

            } else {
                // Check if other guy have given rep already
                var sql = "SELECT * FROM queue WHERE giverID='" + receiver + "' AND receiver='" + giverID + "';";
                con.query(sql, function (err, result) {
                    if (result[0] == null) {
                        // Other has not given rep
                        // Check if we have a waiting queue
                        var sql = "SELECT * FROM queue WHERE giver='" + giver + "' AND receiver='" + receiver + "';";
                        con.query(sql, function (err, result) {
                            if (result[0] != null) {
                                let text = "We're still waiting for " + receiver + " to give rep back. Neither of you will recieve any rep if " + receiver + " does not give you rep within **" + result[0]['time'] + "** hours.";
                                msg.channel.send(text);
                            } else {
                                // Not in queue, store and wait for other to give
                                var sql = "INSERT INTO queue (time, giver, giverID, receiver, feedback) VALUES (24, '" + giver + "', '" + giverID + "', '" + receiver + "', '" + feedback + "');";
                                con.query(sql, function (err, result) {
                                    if (err) throw err;
                                    let text = 'Waiting for ' + receiver + ' to give rep back to ' + giverID + '.';
                                    msg.channel.send(text);
                                });
                            }
                        });
                    } else {
                        // Both have given rep now
                        // Send text
                        let text = giverID + ' and ' + receiver + ' have given rep to each other!';
                        msg.channel.send(text);

                        // Update table for last to type
                        checkBeforeUpdate(con, rep, giver, receiver, feedback);

                        // Update table for first to type
                        var sql = "SELECT * FROM queue WHERE giverID='" + receiver + "' AND receiver='" + giverID + "';";

                        con.query(sql, function (err, result) {
                            if (err) throw err;

                            var giverOld = result[0]['giver'];
                            var receiverOld = result[0]['receiver'];
                            var feedbackOld = result[0]['feedback'];

                            checkBeforeUpdate(con, rep, giverOld, receiverOld, feedbackOld);

                            var sql = "DELETE FROM queue WHERE giverID='" + receiver + "' AND receiver='" + giverID + "';";
                            con.query(sql, function (err, result) {
                                if (err) throw err;
                            });
                        });
                    }
                });
            }
        });
    }

    this.checkBeforeUpdate = function (con, rep, giver, receiver, feedback) {
        checkTableExists(con, receiver, function (result) {
            if (result) {
                updateRep(con, rep, giver, receiver, feedback);
            } else {
                console.log('creating table for ' + receiver);
                createTable(con, receiver, function (result) {
                    updateRep(con, rep, giver, receiver, feedback);
                });
            }
        });
    }

    this.updateRep = function (con, rep, giver, receiver, feedback) {
        // Get total rep in first row
        getFirst(con, receiver, "rep", function (result) {
            var totRep = parseInt(result);

            //Update total rep
            var sql = "UPDATE `" + receiver + "` SET rep = " + (totRep + rep) + " WHERE id=1;";
            con.query(sql);
        });

        if (rep > 0) {
            // Get positive rep in first row
            getFirst(con, receiver, "giver", function (result) {
                var posRep = parseInt(result);

                //Update positive rep
                var sql = "UPDATE `" + receiver + "` SET giver = " + (posRep + rep) + " WHERE id=1;";
                con.query(sql);
            });
        } else {
            // Get negative rep in first row
            getFirst(con, receiver, "feedback", function (result) {
                var negRep = parseInt(result);

                //Update negative rep
                var sql = "UPDATE `" + receiver + "` SET feedback = " + (negRep + rep) + " WHERE id=1;";
                con.query(sql);
            });
        }

        if (feedback != "") {
            var sql = "INSERT INTO `" + receiver + "`(rep, giver, feedback) VALUES(" + rep + ", '" + giver + "', '" + feedback + "');";
            con.query(sql);
        }
    }

    this.checkBeforeCheck = function (con, typeofRep, checkuser, page, callback) {
        checkTableExists(con, checkuser, function (result) {
            if (result) {
                checkRep(con, typeofRep, checkuser, page, callback);
            } else {
                console.log('creating table for ' + checkuser);
                createTable(con, checkuser, function (result) {
                    checkRep(con, typeofRep, checkuser, page, callback);
                });
            }
        });
    }

    this.checkRep = function (con, typeofRep, checkuser, page, callback) {
        var sql = "SELECT * FROM `" + checkuser + "`;";
        con.query(sql, function (err, result) {
            if (err) throw err;

            // Get first row
            var totRep = result[0]['rep'];
            var posRep = parseInt(result[0]['giver']);
            var negRep = parseInt(result[0]['feedback']);

            if (result.length == 1) {
                var text = 'and no feedback.';
                return callback(totRep, posRep, negRep, text, false);
            } else {
                var text = 'and the following ';
                if (typeofRep == 1) {
                    text += 'positive ';
                } else if (typeofRep == -1) {
                    text += 'negative ';
                }
                text += 'feedback:\n\n';
            }

            var textStorage = [];
            // Go through all feedback and add relevant info to output
            for (var i = 1; i < result.length; i++) {
                var giver = result[i]['giver'];
                var feedback = result[i]['feedback'];

                if (typeofRep == 0) {
                    text += giver + ' - ' + feedback + '\n';
                    /*
                    if (result[i]['rep'] > 0) {
                        text += '+1 - ' + giver + ' - ' + feedback + '\n';
                    } else {
                        text += '-1 - ' + giver + ' - ' + feedback + '\n';
                    }
                    */
                } else if (typeofRep == result[i]['rep']) {
                    text += giver + ' - ' + feedback + '\n';
                    /*
                        Exact same as above
                    */
                }
                // If the rows are >10 then we split into other page
                var nrRows = text.split(/\r\n|\r|\n/).length - 1;
                if (nrRows >= 10) {
                    textStorage.push(text);
                    text = '';
                }
            }
            // Push the leftover to another page
            textStorage.push(text);

            // Bad index
            if (1 > page || page > textStorage.length) {
                return callback(textStorage.length, posRep, negRep, text, true);
            }

            // Good index
            var text = textStorage[page - 1];
            text += '\nDisplaying page ' + page + ' out of ' + textStorage.length;

            return callback(totRep, posRep, negRep, text, false);
        });
    }
};
