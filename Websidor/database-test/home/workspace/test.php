<?php
    global $tableNames;
    for($r = 1; $r < 3+1; $r++){
        if(!in_array('Hello', $tableNames[$r-1])){
            echo "It works!";
        } else {
            echo "R.I.P :(";
        }
    }
?>