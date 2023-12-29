<?php
	global $numOfLines;
	$dbname = 'comp';
	$dbuser = 'foo';
	$dbpass = 'epoch123';
	$dbhost = '95.80.53.158:3306';
	$tableNames = array();

	$conn = mysql_connect($dbhost, $dbuser, $dbpass) or die("Unable to Connect to '$dbhost'");
	mysql_select_db($dbname) or die("Could not open the db '$dbname'");
	
	$week = idate('W');
	$dag = idate('w');
	if($dag == 1 || $dag == 2){
    	if($week != 1){
        	$week--;
    	} else{
    	    $week = 52;
		}
	}
	$weekExists = checkTable("v$week");
	
	if(!checkTable("pDesc")){
		$sql = "CREATE TABLE pDesc (
		players TEXT NOT NULL,
		class TEXT NOT NULL,
		role TEXT NOT NULL
		)";
    	mysql_query($sql) or die("Could not create table 'pDesc'");
	}
	//Create new table.
	
	function checkTable($tableName){
		global $conn;
		
		$sql = "SHOW TABLES LIKE '$tableName'";
		$result = mysql_query($sql);
		if (mysql_num_rows($result) > 0){
			return true;
		}
		return false;
	}
	
	function checkName($name){
		global $conn;
		
		$sql = "SELECT * FROM pDesc WHERE players LIKE '$name'";
		$result = mysql_query($sql);
        
        if (mysql_num_rows($result) != FALSE) {
            return true;
        }
        return false;
	}
	
	function checkRole($role){
		global $conn;
		
		$sql = "SELECT * FROM pDesc WHERE role LIKE '$role'";
		$result = mysql_query($sql);
        
        if (mysql_num_rows($result) != FALSE) {
            return true;
        }
        return false;
	}
	
	function updateRole($role, $namn){
		global $conn;
		
		$sql = "UPDATE pDesc SET role='$role' WHERE players='$namn'";
		$result = mysql_query($sql) or die("Could not update role '$role'");
	}
	
	function insertMySql($name, $class){
	    global $conn;
		
		$sql = "INSERT INTO pDesc (players, class, role) VALUES ('$name', '$class', '')";

		if (mysql_query($sql, $conn) == TRUE) {
    		echo "New record created successfully";
		} else {
    		echo "Error: " . $sql . "<br>" . $conn->error;
		}
	}
	
	function getClass($name){
	    global $conn;
		
	    $sql = "SELECT class FROM pDesc WHERE players LIKE '$name'";
        $result = mysql_query($sql);
        $row = mysql_fetch_array($result);
        
        return $row['class'];
	}
	
	function printLines($string){
        global $numOfLines;
        for($i = 0; $i < $numOfLines; $i++){
            echo $string;
        }
    }
    
	function printSaved($newRows, $theRole){
    	global $numOfLines, $week, $tableNames, $idArr;
    	for($r = 0; $r < $newRows; $r++){
			echo "<tr class='".strtolower($theRole)."'>";
	    	for($i = 1; $i < $numOfLines+1; $i++){
	        	$sql = "SELECT name FROM v$week WHERE boss$i=1";
	        	$result = mysql_query($sql);
	        	while(($row = mysql_fetch_array($result)) !== false){
	        		$sql = "SELECT role FROM pDesc WHERE players LIKE '".$row[0]."'";
	    			$nextResult = mysql_query($sql);
		       		$role = mysql_fetch_array($nextResult);
		       		if($role[0] == $theRole && !in_array($row[0], $tableNames[$i-1])){
		       			$existsFit = $row[0];
		       			$tableNames[$i-1] = array_merge($tableNames[$i-1], array($existsFit));
	        			break;
		       		}
	        	}
	        	if($existsFit !== null){
	        		$key = array_search($existsFit, $idArr) + 1;
	        		echo "<td class='none compTd ".getwowClass($existsFit)."' id='B".$idArr[$key]."'>$existsFit</td>";
	        		$existsFit = null;
	        	}else{
	        		echo "<td class='none compTd'></td>";
	        	}
	    	}
	    	echo "</tr>\n";
			
		}
    }
    
    function getMaxRows(){
    	global $conn, $numOfLines, $week;
    	$rowsArray = array(0, 0, 0, 0);
    	for($i = 1; $i < $numOfLines+1; $i++){
    		$tC = 0; $hC = 0; $mC = 0; $rC = 0;
	        $sql = "SELECT name FROM v$week WHERE boss$i=1";
	        $result = mysql_query($sql);
	        $totalRows = mysql_num_rows($result);
	        
    		while(($row = mysql_fetch_array($result)) !== false){
	    		$sql = "SELECT role FROM pDesc WHERE players LIKE '".$row[0]."'";
	    		$nextResult = mysql_query($sql);
		       	$role = mysql_fetch_array($nextResult);
		       	
	    	    if($role[0] == 'Tanks'){
	        		$tC++;
		       	}elseif($role[0] == 'Healers'){
			       	$hC++;
	    	 	}elseif($role[0] == 'Melee'){
    	   			$mC++;
	    	   	}elseif($role[0] == 'Ranged'){
		   			$rC++;
	    	   	}
			}
			if($tC > $rowsArray[0]){
				$rowsArray[0] = $tC;
			}
			if($hC > $rowsArray[1]){
				$rowsArray[1] = $hC;
			}
			if($mC > $rowsArray[2]){
				$rowsArray[2] = $mC;
			}
			if($rC > $rowsArray[3]){
				$rowsArray[3] = $rC;
			}
	   	}
		return $rowsArray;
    }
	
	function getwowClass($charName){
		if(checkName($charName)){
		    return getClass($charName);
		}
        $url = 'https://www.wowprogress.com/character/eu/ragnaros/' . $charName;
       	$classes = ['warrior', 'paladin', 'warlock', 'shaman', 'rogue', 'priest', 'monk', 'mage', 'hunter', 'druid', 'demon_hunter', 'deathknight'];
       	
       	$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$data = curl_exec($ch);
		curl_close($ch);
       	
        for ($i = 0; $i < count($classes); $i++) {
       		preg_match('/<span class="' . $classes[$i] . '">/', $data, $nameMatch);
       		if($nameMatch[0] !== null){
       		    insertMySql($charName, $classes[$i]);
				return $classes[$i];
       		}
       	}
    }
?>