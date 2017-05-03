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
$stmt = $conn->prepare("INSERT INTO news (title, author, content, category) VALUES(?, ?, ?, ?)");
$stmt->bind_param("ssss", $title, $author, $content, $category);
// 设置参数并执行
$title = $_REQUEST['title'];
$author = $_REQUEST['author'];
$content = $_REQUEST['content'];
$category = $_REQUEST['category'];
if($stmt->execute()){
	echo 1;
}
else{
	echo 0;
}
$stmt->close();
$conn->close();
?>