use Gambler;

#CREATE TABLE `main` (
#  `id` int NOT NULL AUTO_INCREMENT,
#  `user` text NOT NULL,
#  `balance` int NOT NULL,
#  `time` bigint NOT NULL,
#  `wager` int NOT NULL,
#  PRIMARY KEY (`id`)
#);

#delete from main where 1=1;

#INSERT INTO main(user, balance) VALUES('hej', 0);
#SELECT * FROM main WHERE user='<@226809491570556929>';

#insert into ssQueue (game, result, bal) values ('jackpot', 'loss', 0);
#UPDATE ssQueue SET bal = 0 WHERE game = 'roll' AND result = 'win';
select * from ssQueue;