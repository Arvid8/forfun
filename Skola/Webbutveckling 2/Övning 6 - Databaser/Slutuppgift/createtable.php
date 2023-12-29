<!-- createtable.php -->
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>Create</title>
</head>

<body>
    <?php
include ('dbconnection.php');
try {

    // sql to create table
    $sql = "CREATE TABLE pdodemotable (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    age INT,
    reg_date DATETIME
    )";

    // use exec() because no results are returned
    $dbconn2->exec($sql);
    $dbconn1->exec($sql);
    echo "Table created successfully";
}
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
}

//Rensa kopplingen till databasen
$dbconn = null;

?>
</body>

</html>