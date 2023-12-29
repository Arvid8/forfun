<!-- insertpost.php -->
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>Namnlöst dokument</title>
</head>

<body>
    <?php
$message = null;
if (isset($_POST['firstname']) && isset($_POST['lastname']) && 
  !empty($_POST['firstname']) && !empty($_POST['lastname'])) {
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $age = isset($_POST['age']) ? $_POST['age'] : 0;
    
    include ('dbconnection.php');
    try {    
        # prepare
        $sql = "INSERT INTO pdodemotable (firstname, lastname, age, reg_date) 
          VALUES (?, ?, ?, now())";
        $stmt = $dbconn->prepare($sql);
        # the data we want to insert
        $data = array($firstname, $lastname, $age);
        # execute width array-parameter
        $stmt->execute($data);
            
        echo "New record created successfully";
    }
    catch(PDOException $e)
        {
        echo $sql . "<br>" . $e->getMessage();
    }
    
    $dbconn = null;
} else {
    $message .= "<br />Du måste fylla i förnamn och efternamn!<br /><br />";
}
echo $message;
?>
        <form method="post" action="">
            <table>
                <tr>
                    <td>Förnamn*:</td>
                    <td>
                        <input type="text" name="firstname" size=40 maxlength=100>
                    </td>
                </tr>
                <tr>
                    <td>Efternamn*:</td>
                    <td>
                        <input type="text" name="lastname" size=40 maxlength=100>
                    </td>
                </tr>
                <tr>
                    <td>Ålder:</td>
                    <td>
                        <input type="text" name="age" size=20 maxlength=20>
                    </td>
                </tr>
                <tr>
                    <td>* = obligatoriskt</td>
                    <td>
                        <button type="submit">Lägg till</button>
                    </td>
                </tr>
            </table>
        </form>
</body>

</html>