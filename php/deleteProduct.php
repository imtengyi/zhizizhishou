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
$num=$_REQUEST['num'];
$sql = "DELETE FROM product where num=$num"; 
$result = $conn->query($sql);
if ($result) {
     echo 1;
} else {
    echo 0;
}
$conn->close();
?>