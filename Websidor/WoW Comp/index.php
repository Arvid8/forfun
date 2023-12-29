<!DOCTYPE HTML>
<html>

<head>
    <meta charset="utf-8">
    <title>Epoch Raid Comp</title>
    <!-- FAVICON -->
    <link rel="icon" type="image/x-icon" href="bilder/favicon.ico" />

    <!-- CSS -->
    <!-- LINK TO USER CREATED STYLES -->
    <link rel="stylesheet" href="styles/style.css">
    <!-- CSS -->

    <!-- SCRIPTS -->
    <!-- LINK TO JQUERY -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <!-- LINK TO JQUERY UI-->
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
    <!-- LINK TO FONTAWESOME -->
    <script defer src="https://use.fontawesome.com/releases/v5.0.9/js/all.js" integrity="sha384-8iPTk2s/jMVj81dnzb/iFR2sdA7u06vHJyyLlAd4snFpCl/SnyUjRrbdJsw1pGIl" crossorigin="anonymous"></script>
    <!-- LINK TO USER CREATED SCRIPTS -->
    <script type="text/javascript" src="script/script.js"></script>
    <!-- SCRIPTS -->

</head>

<body>
	<?php
	include('functions.php');
	?>
	
    <div id="lootreminder">

    <?php
    
    echo "\n<table id='lootTable'>\n";
    $f = fopen("https://docs.google.com/spreadsheets/d/e/2PACX-1vQb24xhDWVgO9NBeLz5FEsczhkn02EbzJe6aMc4jCX0-Cpf3IISyOYj5hayV22v9ZsJwY2ucw60Xc1J/pub?output=csv", "r");
    
    global $idArr;
    $numOfChars = 0;
    $idArr = array();
    while (($line = fgetcsv($f)) !== false) {
    	if($line[0] == "Tanks" || $line[0] == "Healers" || $line[0] == "Melee" || $line[0] == "Ranged"){continue;}
        	
        if($line[0] == "" || $line[0] == "Totalt"){
        	echo "<tr>";
        } else{
        	echo "<tr class='" . getwowClass($line[0]) . "'>";
        	$numOfChars++;
        	$idArr = array_merge($idArr, array($line[0], $numOfChars));
        }
        
        foreach ($line as $cell) {
        	//$char = str_replace([' ', 'mount', 'coin', '+'], ['','','',''], strtolower(htmlspecialchars($cell)));
        	$char = str_ireplace(['mount'], [''], htmlspecialchars($cell));
        	echo "<td>" . $char . "</td>";
        }
        echo "</tr>\n";
    }
    fclose($f);
        
    echo "</table>\n";
        
    ?>
    	<div id="backspace">
    		<div class="pil pilNer"></div>
    	</div>
	</div>
    
   <?php
   include('comptable.php');

    echo "\n<table id='leftTable'>\n";
    $f = fopen("https://docs.google.com/spreadsheets/d/e/2PACX-1vQb24xhDWVgO9NBeLz5FEsczhkn02EbzJe6aMc4jCX0-Cpf3IISyOYj5hayV22v9ZsJwY2ucw60Xc1J/pub?output=csv", "r");
    $idCount = 1;
    $roll;
    echo "<tr class='spacer'><td>Bänken</td></tr>\n";
    while (($line = fgetcsv($f)) !== false) {
    	if($line[0] == "Tanks" || $line[0] == "Healers" || $line[0] == "Melee" || $line[0] == "Ranged" || $line[0] == "" || $line[0] == "Totalt"){
    		if($line[0] !== "" || $line[0] !== "Totalt"){
    			$roll = $line[0];
    		}
    		continue;
    	}
    	if(!checkRole($line[0])){
    		updateRole($roll, $line[0]);
    	}
    	$charName = htmlspecialchars($line[0]);
    	
        echo "<tr>";
        $key = array_search($charName, $idArr) + 1;
    	echo "<td id='B".$idArr[$key]."' class='".getwowClass($line[0])."'>$charName</td>";
        echo "</tr>\n";
    }
    fclose($f);
    echo "</table>\n";
    
    echo "<div id='numChars' style='display: none;'>$numOfChars</div>\n";
    echo "<div id='numLines' style='display: none;'>$numOfLines</div>\n";
    ?>
    
    <div class="button" id="save" style="left: calc(7.5% + 2px);">
    	<span>Spara</span>
    	<span style="content: url(../bilder/save.png);"></span>
    </div>
    <div class="button" id="clear" style="left: calc(17.5% + 2px);">
    	<span>Rensa</span>
    	<span style="content: url(../bilder/cross.png);"></span>
    </div>
    <div id="vDisplay"><?php echo 'Vecka '.$week;?></div>
    
    <div id="loadingBox">
    	<div id="loadingText">Sparar</div>
    	<i id="checkFA" class="fas fa-check"></i>
    	<div class="spinner">
  			<div class="rect1"></div>
 	 		<div class="rect2"></div>
  			<div class="rect3"></div>
  			<div class="rect4"></div>
  			<div class="rect5"></div>
		</div>
	</div>
</body>
</html>
