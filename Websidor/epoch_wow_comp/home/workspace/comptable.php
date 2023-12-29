<?php
    global $week, $weekExists, $tableNames;
    
    echo "\n<table id='compTable'>\n";
    $f = fopen("https://docs.google.com/spreadsheets/d/e/2PACX-1vQb24xhDWVgO9NBeLz5FEsczhkn02EbzJe6aMc4jCX0-Cpf3IISyOYj5hayV22v9ZsJwY2ucw60Xc1J/pub?output=csv", "r");
    
    $line = fgetcsv($f);
    fclose($f);
    echo "<tr>";
	$numOfLines = count($line)-1;
	for($i = 0; $i < $numOfLines; $i++){
		$tableNames = array_merge($tableNames, array(array('Hello')));
	}
    foreach ($line as $cell) {
    	if($cell == ''){continue;}
    	echo "<td id='firstRow' class='spacer compTd'>" . htmlspecialchars($cell) . "</td>";
    }
	echo "</tr>\n";
	
	if($weekExists){
		$extraRows = getMaxRows();
		$allRoles = array('Tanks', 'Healers', 'Melee', 'Ranged');
		for($i = 0; $i < count($allRoles); $i++){
			echo "<tr class='roleDesc'>";
			printLines("<td class='spacer compTd'>".$allRoles[$i]."</td>");
			echo "</tr>\n";
			printSaved($extraRows[$i], $allRoles[$i]);
			echo "<tr class='".strtolower($allRoles[$i])."'>";
			printLines("<td class='none compTd'></td>");
	    	echo "</tr>\n";
		}
	    
	    echo "<tr class='roleDesc'>";
	    printLines("<td class='spacer total'>0</td>");
	    echo "</tr>\n";
	} else {
	    for($y = 0; $y < 9; $y++){
    	    if($y == 1){
	    	    echo "<tr class='tanks'>";
    		}elseif($y == 3) {
	    		echo "<tr class='healers'>";
	        }elseif ($y == 5) {
    		    echo "<tr class='melee'>";
    		}elseif ($y == 7) {
    			echo "<tr class='ranged'>";
    		}else{
    			echo "<tr class='roleDesc'>";
    		}
    		
    		if($y == 0){
    			printLines("<td class='spacer compTd'>Tanks</td>");
    		}elseif($y == 2) {
    			printLines("<td class='spacer compTd'>Healers</td>");
	    	}elseif ($y == 4) {
	    		printLines("<td class='spacer compTd'>Melee</td>");
	   		}elseif ($y == 6) {
	   			printLines("<td class='spacer compTd'>Ranged</td>");
	   		}elseif ($y == 8) {
	   			printLines("<td class='spacer total'>0</td>");
    		}else{
	    		printLines("<td class='none compTd'></td>");
	    	}
		    echo "</tr>\n";
	    }
	}
	
    echo "</table>\n";
    
?>