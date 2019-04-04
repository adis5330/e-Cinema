<?php
include("database.config.php");
 
//getting id of the data from url
$userName = $_POST['userName'];
$last = $_POST['lastName'];
$tel = $_POST['telephone'];
$pass = $_POST['password'];
$birth = $_POST['birth'];
$userType = $_POST['useerType'];

$sql = "INSERT INTO users (name,lastName,email,telephone,password,birth,userType) 
VALUES ($userName,$last,$tel,$pass,$birth,$userType)";
 

//deleting the row from table
$result = mysqli_query($mysqli, $sql);

echo $result;
?>