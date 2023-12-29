<?php
    include('functions.php');

    $tableData = $_POST;
    /* INSERT SERVERS IN DB
    $sql = "INSERT INTO servlink (serv, url, lastup) VALUES";
    
    foreach($tableData as $data){
        $sql .= '("' . $data[0] . '", "' . $data[1] . '", ' . $data[2] . '), ';

    }
    $sql = substr($sql, 0, -2);
    $sql .= ";";
    mysql_query($sql, $conn) or die("Could not write");*/
    
    foreach($tableData as $data){
        $server = $data[0];
        $url = $data[1];
        $lastUp = $data[2];
        
        if(checkUpdate($server, $lastUp)){
            $sql = "UPDATE servlink SET lastup='$lastUp' WHERE serv LIKE '$server'";
            mysql_query($sql, $conn) or die(mysql_error());
        }

    }
    
	
    
?>