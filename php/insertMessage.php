<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mywebsite";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}
$conn->query("set names utf8");
// 预处理及绑定
$stmt = $conn->prepare("INSERT INTO contactUs (name, tel, content) VALUES(?, ?, ?)");
$stmt->bind_param("sss", $name, $tel, $content);
// 设置参数并执行
$name = $_REQUEST['name'];
$tel = $_REQUEST['tel'];
$content = $_REQUEST['content'];
if($stmt->execute()){
	echo 1;
}
else{
	echo 0;
}
$stmt->close();
$conn->close();
?>