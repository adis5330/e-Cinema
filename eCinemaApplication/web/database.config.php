<?php
$servername = "localhost";
$username = "id8865303_root";
$password = "12345";
$database = "id8865303_eciname";

// Create connection
$conn = new mysqli($servername, $username, $password,$database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully";
?>