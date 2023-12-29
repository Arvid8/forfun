<?php
	global $numOfLines;
	$dbname = 'ah';
	$dbuser = 'foo';
	$dbpass = 'epoch123';
	$dbhost = '95.80.53.158:3306';
	$tableNames = array();

	$conn = mysql_connect($dbhost, $dbuser, $dbpass) or die("Unable to Connect to '$dbhost'");
	mysql_select_db($dbname) or die("Could not open the db '$dbname'");
	
	function checkTable($tableName){
		global $conn;
		
		$sql = "SHOW TABLES LIKE '$tableName'";
		$result = mysql_query($sql);
		if (mysql_num_rows($result) > 0){
			return true;
		}
		return false;
	}
	
	function checkUpdate($server, $currUpdate){
		global $conn;
		
		$sql = "SELECT * FROM servlink WHERE serv LIKE '$server'";
		$result = mysql_query($sql);
		$row = mysql_fetch_assoc($result);
        
        if ($row['lastup'] != $currUpdate) {
            return true;
        }
        return false;
	}
?>