<?php
    include('functions.php');

    global $week, $weekExists;
    $tableData = $_POST;
    $numOfLines = count($tableData);
    $firstWeek = false;
    if(!checkTable("v".($week-1))){$firstWeek = true;}

	if(!$weekExists){
		$sql = "CREATE TABLE v$week (name TEXT NOT NULL, ";
		for($i = 1; $i < $numOfLines+1; $i++){
			$sql .= "boss$i TINYINT NOT NULL, ben$i TINYINT NOT NULL, ";
		}
		$sql = substr($sql, 0, -2);
		$sql .= ")";
		mysql_query($sql) or die("Could not create table 'vs$week'");
	}
	mysql_query("TRUNCATE v$week");

	$result = mysql_query("SELECT players FROM pDesc");
    while(($row = mysql_fetch_array($result)) !== false){
        $sql = '';
        $line = $row[0];
        $sql .= "INSERT INTO v$week (name, ";
        for($i = 1; $i < $numOfLines+1; $i++){
			$sql .= "boss$i, ben$i, ";
		}
		$sql = substr($sql, 0, -2);
		$sql .= ") VALUES ('$line', ";
		for($i = 1; $i < $numOfLines+1; $i++){
		    $gotEm = false;
		    foreach($tableData["boss$i"] as $tableDataName){
		        if($tableDataName == $line){
			        $sql .= "'1', ";
			        $gotEm = true;
			    }
		    }
		    if(!$gotEm){$sql .= "'0', ";}
		    
		    if($firstWeek && !$gotEm){
		        $sql .= "'1', ";
		    } elseif(($firstWeek && $gotEm)){
		        $sql .= "'0', ";
		    }elseif(!$firstWeek && !$gotEm){
		        $numSitt = mysql_fetch_array(mysql_query("SELECT ben$i FROM v".($week-1)." WHERE name LIKE '$tableDataName'"));
		        $sql .= "'".($numSitt+1)."', ";
		    }elseif(!$firstWeek && $gotEm){
		        $numSitt = mysql_fetch_array(mysql_query("SELECT ben$i FROM v".($week-1)." WHERE name LIKE '$tableDataName'"));
		        $sql .= "'$numSitt', ";
		    }
		}
		$sql = substr($sql, 0, -2);
		$sql .= ")";
		
		mysql_query($sql, $conn) or die("Could not write");
    }
    
    
	
    
?>