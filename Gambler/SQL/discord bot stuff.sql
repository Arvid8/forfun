use RepLogger;

#insert into test (rep, giver, feedback) values (2, 2, 2);
#SELECT rep FROM test ORDER BY rep ASC LIMIT 1; #First row of column rep
#select * from `<@446422533886050315>`;
#CREATE TABLE `<@446422533886050315>`(id INT AUTO_INCREMENT PRIMARY KEY, rep INT NOT NULL, giver TEXT NOT NULL, feedback TEXT NOT NULL);
#SELECT rep FROM `<@446422533886050315>` LIMIT 1;
#drop table  `<@698249456289579070>`;


CREATE TABLE queue (id INT AUTO_INCREMENT PRIMARY KEY, time INT NOT NULL, giver TEXT NOT NULL, receiver TEXT NOT NULL);
show tables;
select * from queue;
drop table queue;
SELECT * FROM queue WHERE giver='frac' AND receiver='dac';
delete from queue;