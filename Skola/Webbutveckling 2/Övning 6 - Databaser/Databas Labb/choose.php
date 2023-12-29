<!-- choose.php -->
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>Välj</title>
</head>

<body>
    <style>
        table,
        tr {
            border: 1px solid black;
        }
        
        th,
        td {
            margin: 0px;
            border: 0px;
            padding: 4px;
            text-align: center;
        }
        
        tr:nth-child(even) {
            background: #CCC;
        }
        
        tr:nth-child(odd) {
            background: #EEE;
        }
        
        #wrapper {
            width: 500px;
            margin: 0 auto;
            padding: 30px;
            background-color: #aaaaaa;
            border: 5px solid #666666;
            border-radius: 15px;
        }
    </style>
    <div id="wrapper">
        <?php   // SIDA --> https://teinf1313-139747.phpmyadmin.mysql.binero.se/index.php?db=139747-teinf1313&table=pdodemotable&token=303a87279378cd1a8d2254d882d13e85
include('testa.php');
include('dbconnection.php');
if (isset($_POST['new_age']) && isset($_POST['check_list']) && !empty($_POST['check_list'])) {
    $ny_age = test_input($_POST['new_age']);
    if ($ny_age != 0) {
        $ny  = $_POST['check_list'];
        $sth = $dbconn->prepare("UPDATE pdodemotable SET age = :alder WHERE id = :ny");
        $sth->bindParam(':alder', $ny_age, PDO::PARAM_INT);
        $sth->bindParam(':ny', $ny[0], PDO::PARAM_INT);
        $sth->execute();
        print ("Ny ålder = " . $ny_age) . "<br><br>";
    }
}
?>
            <form method="post" action="<?php
echo htmlspecialchars($_SERVER[" PHP_SELF "]);
?>">
                Förnamn:
                <br>
                <input type="text" name="firstname" size=40 maxlength=40>
                <br>
                <br> Efternamn:
                <br>
                <input type="text" name="lastname" size=40 maxlength=40>
                <br>
                <br>
                <button type="submit">Sök!</button>
            </form>
            <br>
            <br>
            <?php
//foreach ($_POST as $key=>$value){print($key.'='.$value.'<br />');}
//print_r($_POST['check_list']);
if (isset($_POST['firstname']) && !empty($_POST['firstname']) && isset($_POST['lastname']) && !empty($_POST['lastname'])) {
    $firstname = test_input($_POST['firstname']);
    $lastname  = test_input($_POST['lastname']);
    $sth       = $dbconn->prepare("SELECT id, firstname, lastname, age FROM pdodemotable WHERE firstname = :fornamn AND lastname = :efternamn");
    $sth->bindParam(':fornamn', $firstname, PDO::PARAM_STR, 12);
    $sth->bindParam(':efternamn', $lastname, PDO::PARAM_STR, 12);
} else if (isset($_POST['firstname']) && !empty($_POST['firstname'])) {
    $firstname = test_input($_POST['firstname']);
    $sth       = $dbconn->prepare("SELECT id, firstname, lastname, age FROM pdodemotable WHERE firstname = :fornamn");
    $sth->bindParam(':fornamn', $firstname, PDO::PARAM_STR, 12);
} else if (isset($_POST['lastname']) && !empty($_POST['lastname'])) {
    $lastname = test_input($_POST['lastname']);
    $sth      = $dbconn->prepare("SELECT id, firstname, lastname, age FROM pdodemotable WHERE lastname = :efternamn");
    $sth->bindParam(':efternamn', $lastname, PDO::PARAM_STR, 12);
} else {
    print("Välj något!");
}
if (isset($sth)) {
    try {
        $sth->execute();
        $result = $sth->fetchAll();
        $antal = count($result);
        $ant   = count($result[0]) / 2;
        print("<form method='post' action='" . htmlspecialchars($_SERVER["PHP_SELF"]) . "'>");
        print "<table><caption>Databasen svarar!</caption>";
        print("<tr><th>Index</th><th>Förnamn</th><th>Efternamn</th><th>Ålder</th><th>Välj</th></tr>");
        for ($i = 0; $i < $antal; $i++) {
            print("<tr>");
            for ($j = 0; $j < $ant; $j++) {
                print("<td>" . $result[$i][$j] . "</td>");
            }
            print("<td><input type='radio' name='check_list[]' value=" . $result[$i][0] . "></td>");
            print("</tr>");
        }
        print("</table><br>");
        print("Ny ålder: <input type='text' name='new_age' size=10 maxlength=10> ");
        print(" <button type='submit'>Ändra!</button>");
    }
    catch (PDOException $e) {
        //echo 'Connection failed: '.$e->getMessage()."<br />";
        //echo 'Could not connect to database.<br />');
    }
    $dbconn = null;
}
?>
    </div>
</body>

</html>