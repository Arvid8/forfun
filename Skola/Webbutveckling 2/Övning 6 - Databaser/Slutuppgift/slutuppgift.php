<!--slutuppgift.php -->
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>Bibliotek</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js"></script>
</head>

<body>
    <style>
        * {
            outline: none;
        }

        body {
            background: #222a30;
            font-family: sans-serif;
        }

        #sok2 {
            margin-top: 120px;
            width: 100%;
        }

        #sok2>table {
            width: 100%;
        }

        h2 {
            color: #fff;
            line-height: 1px;
            text-align: center;
        }

        h3 {
            color: #fff;
            line-height: 1px;
            text-align: center;
        }

        input#reserv {
            position: fixed;
            top: 20px;
            right: 20px;
            display: block;
            color: #fff;
            background: #222a30;
            border: 2px solid #f04e23;
            border-radius: 20px;
            padding: 8px 20px;
            cursor: pointer;
            font-size: 1em;
            -webkit-transition: background 0.1s ease-in-out;
            -moz-transition: background 0.1s ease-in-out;
            -ms-transition: background 0.1s ease-in-out;
            -o-transition: background 0.1s ease-in-out;
            transition: background 0.1s ease-in-out;
        }

        input.submit {
            margin: auto;
            display: block;
            background: transparent;
            color: #fff;
            border: 2px solid #f04e23;
            border-radius: 20px;
            padding: 8px 20px;
            cursor: pointer;
            font-size: 1em;
            -webkit-transition: background 0.1s ease-in-out;
            -moz-transition: background 0.1s ease-in-out;
            -ms-transition: background 0.1s ease-in-out;
            -o-transition: background 0.1s ease-in-out;
            transition: background 0.1s ease-in-out;
        }

        input.submit:hover {
            background: #2b363d;
        }

        input.text {
            display: block;
            margin: 20px auto;
            border: 2px solid #f04e23;
            height: 30px;
            border-radius: 20px;
            text-indent: 15px;
            width: 245px;
            font-size: 20px;
        }

        table,
        tr {
            border: 2px solid #f04e23;
            border-collapse: collapse;
        }

        th,
        td {
            border: 2px solid #222a30;
            padding: 8px;
            text-align: center;
        }

        tr:nth-child(even) {
            background: #CCC;
        }

        tr:nth-child(odd) {
            background: #EEE;
        }

        #wrapper {
            position: relative;
            top: 100px;
            margin: 0 auto;
            width: 250px;
            height: auto;
        }

        input[type='checkbox'] {
            cursor: pointer;
            -webkit-appearance: none;
            width: 30px;
            height: 30px;
            background: white;
            border-radius: 5px;
            border: 2px solid #222a30;
            -webkit-transition: all 0.3s ease-in-out;
            -moz-transition: all 0.3s ease-in-out;
            -ms-transition: all 0.3s ease-in-out;
            -o-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;
        }

        input[type='checkbox']:checked {
            background: #09BD3B;
        }

        input[disabled='disabled'] {
            background: #C4090A;
        }

    </style>
    <script>
        $(document).ready(function() {
            $("#sok").submit(function(e) {
                if (($("#cs").length != 0) && ($('#text1').val() == '') && ($('#text2').val() == '')) {
                    e.preventDefault();
                    $("#cs").effect("shake", {
                        times: 3
                    }, 500);
                }
            });

            $('.check').click(function() {
                if ($(".check").is(':checked')) {
                    setTimeout(function() {
                        $('#reserv').fadeIn(1000);
                    }, 1000);
                } else {
                    setTimeout(function() {
                        $('#reserv').fadeOut(1000);
                    }, 1000);
                }
            });
        });

        function setCursor() {
            $('#text1').val($('#text1').val());
        };

    </script>
    <div id="wrapper">
        <?php // SIDA --> https://teinf1313-139747.phpmyadmin.mysql.binero.se/index.php?db=139747-teinf1313&table=pdodemotable&token=303a87279378cd1a8d2254d882d13e85
include('testa.php');
include('dbconnection.php');
?>
        <form id="sok" method="post" action="<?php
echo htmlspecialchars($_SERVER[" PHP_SELF "]);
?>">
            <h2>Titel</h2>
            <input class="text" id="text1" autofocus="autofocus" onfocus="setCursor()" type="text" name="titel" size=40 maxlength=40 value="<?= isset($_POST['titel']) ? $_POST['titel'] : '' ?>">
            <br>
            <h2>Författare</h2>
            <input class="text" id="text2" type="text" name="author" size=40 maxlength=40 value="<?= isset($_POST['author']) ? $_POST['author'] : '' ?>">
            <br>
            <input class="submit" name="sub" type="submit" value="Sök!">
            <?php
    $e = $_POST['check_list'];
if (!empty($e)) {
    $st = $dbconn1->prepare("INSERT INTO pdodemotable (reserv) VALUES (:index)");
    foreach($e as $check){
        $st->execute(array(
            'index' => $check
        )); 
    }
    print("<br><h3>Böcker lånade!</h3>");
}

if (isset($_POST['titel']) && !empty($_POST['titel']) && isset($_POST['author']) && !empty($_POST['author'])) {
    $titel  = "%" . test_input($_POST['titel']) . "%";
    $author = "%" . test_input($_POST['author']) . "%";
    $sth    = $dbconn2->prepare("SELECT * FROM min_lib WHERE titel LIKE :titell AND temp LIKE :authorr");
    $sth->bindParam(':titell', $titel, PDO::PARAM_STR, 20);
    $sth->bindParam(':authorr', $author, PDO::PARAM_STR, 20);
    
} else if (isset($_POST['titel']) && !empty($_POST['titel'])) {
    $titel = "%" . test_input($_POST['titel']) . "%";
    $sth   = $dbconn2->prepare("SELECT * FROM min_lib WHERE titel LIKE :titell");
    $sth->bindParam(':titell', $titel, PDO::PARAM_STR, 20);
    
} else if (isset($_POST['author']) && !empty($_POST['author'])) {
    $author = "%" . test_input($_POST['author']) . "%";
    $sth    = $dbconn2->prepare("SELECT * FROM min_lib WHERE temp LIKE :authorr"); //index, titel, beskrivning, temp, namn, genre, medie, antal, utl, isbn, timestamp
    $sth->bindParam(':authorr', $author, PDO::PARAM_STR, 20);
    
} else if (isset($_POST['sub'])) {
    echo "<br><h3 id='cs'>Du måste söka efter något!</h3>";
}
?>
        </form>
        <br>
        <br>
    </div>
    <?php
if (isset($sth)) {
    try {
        $sth->execute();
        $result = $sth->fetchAll();
        $antal  = count($result);
        $ant    = count($result[0]) / 2;
        print("<div id='form'><form id='sok2' method='post' action='" . htmlspecialchars($_SERVER["PHP_SELF"]) . "'>");
        if ($antal != 0) {
            print("<table><tr><th>ISBN</th><th>Titel</th><th>Beskrivning</th><th>Författare</th><th>Genre</th><th>Medie</th><th>Antal</th><th>UTL</th><th>Registreringsdatum</th><th>Låna</th></tr>");
        } else {
            echo "<h3>Din sökning fick ingen träff :(</h3>";
        }
        $stht = $dbconn1->prepare("SELECT DISTINCT reserv FROM pdodemotable");
        $stht->execute();
        $hTal = $stht->fetchAll();
        $an   = count($hTal);
        for ($i = 0; $i < $antal; $i++) {
            print("<tr>");
            for ($j = 0; $j < $ant; $j++) {
                print("<td>" . $result[$i][$j] . "</td>");
                if (($j == 2) || ($j == 9)) {
                    $j++;
                }
            }
            if ((isSame($hTal, $result[$i][10], $an)) || ($result[$i][7] == $result[$i][8])) {
                print("<td><input type='checkbox' class='check' name='check_list[]' value='" . $result[$i][10] . "' disabled='disabled'></td>");
            } else {
                print("<td><input type='checkbox' class='check' name='check_list[]' value='" . $result[$i][10] . "'></td>");
            }
            print("</tr>");
        }
        print("<input class='submit' id='reserv' style='display: none;' onmouseover='this.style.background=\"#2b363d\";' onmouseout='this.style.background=\"#222a30\";' type='submit' value='Låna Böcker'>");
        print("</table></form></div><br>");
    }
    catch (PDOException $e) {
        echo 'Connection failed: ' . $e->getMessage() . "<br />";
        echo 'Could not connect to database.<br />';
        $dbconn2 = null;
    }
}
    function isSame($a, $b, $c){
            for ($s = 0; $s < $c; $s++) {
                if ($a[$s][0] == $b) {
                    return true;
                }
            }
            return false;
        }
?>

</body>

</html>
