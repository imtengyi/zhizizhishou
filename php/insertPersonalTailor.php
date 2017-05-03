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
$stmt = $conn->prepare("INSERT INTO personalTailor (date, hour, name, tel) VALUES(?, ?, ?, ?)");
$stmt->bind_param("ssss", $date, $hour, $name, $tel);
// 设置参数并执行
$date = $_REQUEST['date'];
$hour = $_REQUEST['hour'];
$name = $_REQUEST['name'];
$tel = $_REQUEST['tel'];

if($stmt->execute()){
	echo 1;
}
else{
	echo 0;
}
//$stmt->execute();
//echo "新记录插入成功";
$stmt->close();
$conn->close();
?>