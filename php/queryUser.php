<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mywebsite";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo("连接失败: " . $conn->connect_error);
} 
$conn->query("set names utf8;");
$name=$_REQUEST['name'];
$password=$_REQUEST['password'];
$sql = "SELECT name FROM user where name='$name' and password='$password'"; 
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    echo 1;
    
} else {
    echo 0;
}
$conn->close();
?>