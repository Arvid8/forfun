<!DOCTYPE HTML>
<html>

<head>
    <meta charset="utf-8">
    <title>Quiz form</title>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>

    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js"></script>
</head>

<body>
    <?php
$i = 0; //index,hur många frågor
$r = 0; //resultat, hur många rätt
if (isset($_POST["i"])) {
    $i = $_POST["i"] + 1;
}
if (isset($_POST["r"])) {
    $r = $_POST["r"];
}
if ($i != 6) {
    echo "<p>Du är på fråga " . ($i + 1) . "/6.</p>";
}
echo '<form method="post" id="stuff" action="' . $_SERVER["PHP_SELF"] . '">';
switch ($i) {
    case 0:
        echo '<h1>Fråga 1</h1>';
        echo '<input type="radio" name="f1" value="A" class="box">Svar A';
        echo '<br><input type="radio" name="f1" value="B" class="box">Svar B';
        echo '<br><input type="radio" name="f1" value="C" class="box">Svar C';
        echo '<br><input type="radio" name="f1" value="D" class="box">Svar D';
        break;
    case 1:
        if ($_POST["f1"] == "A") {
            $r++;
            echo '<p>Rätt svar! Du har ' . $r . ' rätt hittils!<p>';
        } else {
            echo '<p>Fel svar! Du har ' . $r . ' rätt hittils!<p>';
        }
        echo '<h1>Fråga 2</h1>';
        echo '<input type="radio" name="f2" value="A" class="box">Svar A';
        echo '<br><input type="radio" name="f2" value="B" class="box">Svar B';
        echo '<br><input type="radio" name="f2" value="C" class="box">Svar C';
        echo '<br><input type="radio" name="f2" value="D" class="box">Svar D';
        break;
    case 2:
        if ($_POST["f2"] == "A") {
            $r++;
            echo '<p>Rätt svar! Du har ' . $r . ' rätt hittils!<p>';
        } else {
            echo '<p>Fel svar! Du har ' . $r . ' rätt hittils!<p>';
        }
        echo '<h1>Fråga 3</h1>';
        echo '<input type="radio" name="f3" value="A" class="box">Svar A';
        echo '<br><input type="radio" name="f3" value="B" class="box">Svar B';
        echo '<br><input type="radio" name="f3" value="C" class="box">Svar C';
        echo '<br><input type="radio" name="f3" value="D" class="box">Svar D';
        break;
    case 3:
        if ($_POST["f3"] == "A") {
            $r++;
            echo '<p>Rätt svar! Du har ' . $r . ' rätt hittils!<p>';
        } else {
            echo '<p>Fel svar! Du har ' . $r . ' rätt hittils!<p>';
        }
        echo '<h1>Fråga 4</h1>';
        echo '<input type="radio" name="f4" value="A" class="box">Svar A';
        echo '<br><input type="radio" name="f4" value="B" class="box">Svar B';
        echo '<br><input type="radio" name="f4" value="C" class="box">Svar C';
        echo '<br><input type="radio" name="f4" value="D" class="box">Svar D';
        break;
    case 4:
        if ($_POST["f4"] == "A") {
            $r++;
            echo '<p>Rätt svar! Du har ' . $r . ' rätt hittils!<p>';
        } else {
            echo '<p>Fel svar! Du har ' . $r . ' rätt hittils!<p>';
        }
        echo '<h1>Fråga 5</h1>';
        echo '<input type="radio" name="f5" value="A" class="box">Svar A';
        echo '<br><input type="radio" name="f5" value="B" class="box">Svar B';
        echo '<br><input type="radio" name="f5" value="C" class="box">Svar C';
        echo '<br><input type="radio" name="f5" value="D" class="box">Svar D';
        break;
    case 5:
        if ($_POST["f5"] == "A") {
            $r++;
            echo '<p>Rätt svar! Du har ' . $r . ' rätt hittils!<p>';
        } else {
            echo '<p>Fel svar! Du har ' . $r . ' rätt hittils!<p>';
        }
        echo '<h1>Fråga 6</h1>';
        echo '<input type="radio" name="f6" value="A" class="box">Svar A';
        echo '<br><input type="radio" name="f6" value="B" class="box">Svar B';
        echo '<br><input type="radio" name="f6" value="C" class="box">Svar C';
        echo '<br><input type="radio" name="f6" value="D" class="box">Svar D';
        break;
    case 6:
        if ($_POST["f6"] == "A") {
            $r++;
            echo '<p>Rätt svar! Du fick ' . $r . ' rätt totalt!<p>';
        } else {
            echo '<p>Fel svar! Du fick ' . $r . ' rätt totalt!<p>';
        }
        echo '<h3>SLUT!</h3>';
        break;
}

echo '<input type="hidden" name="i" value="' . $i . '">';
echo '<input type="hidden" name="r" value="' . $r . '">';
if (!isset($_POST["f6"])) {
    echo '<br><br><input type="submit" id="lastbutton" name="submit" value="Submit"></form>';
}
echo '<br><p id="learn2click"></p>';
?>
        <script>
            jQuery(function ($) {
                $('#stuff').submit(function (e) {
                    if (!$('.box').is(':checked')) {
                        e.preventDefault();
                        $("#learn2click").html('<span style="color: red;">Du måste välja ett av alternativen!</span>');
                        $("#lastbutton").effect("shake", {
                            times: 4
                        }, 500);
                    } else {
                        $("#learn2click").html('');
                    }
                })
            })
        </script>
</body>

</html>