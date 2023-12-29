<!-- dbconnection.php -->
<?php
$dbname1 = '139747-teinf1313';
$hostname1 = 'teinf1313-139747.mysql.binero.se';
$username1 = '139747_ot12051';
$password1 = 'frabr5dR';

$dbname2 = '139747-bibliotek';
$hostname2 = 'bibliotek-139747.mysql.binero.se';
$username2 = '139747_od80843';
$password2 = 'Ek6zw5f3sW';

$options  = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'UTF8'");

$dbconn1 = new PDO("mysql:host=$hostname1;dbname=$dbname1;", $username1, 
$password1, $options);
$dbconn1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$dbconn2 = new PDO("mysql:host=$hostname2;dbname=$dbname2;", $username2, 
$password2, $options);
$dbconn2->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); ?>