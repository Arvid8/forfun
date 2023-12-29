<!DOCTYPE HTML>
<html>
    <head></head>
    <body>
<?php
    $tableNames = array();
    for($i = 0; $i < 3; $i++){
        $tableNames = array_merge($tableNames, array(array('Hello')));
	}
	include('test.php');
?>
    </body>
</html>