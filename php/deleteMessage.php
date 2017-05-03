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
$sql = "DELETE FROM contactUs where num=$num"; 
$result = $conn->query($sql);
if ($result) {
    
} else {
    echo "0 个结果";
}
$conn->close();
?>