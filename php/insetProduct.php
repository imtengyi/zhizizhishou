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
$stmt = $conn->prepare("INSERT INTO product (productNumber, marketPrice, price, weight, series, category, imgSrc) VALUES(?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $productNumber, $marketPrice, $price, $weight, $series, $category, $imgSrc);
// 设置参数并执行
$productNumber = $_REQUEST['productNumber'];
$marketPrice = $_REQUEST['marketPrice'];
$price = $_REQUEST['price'];
$weight = $_REQUEST['weight'];
$series = $_REQUEST['series'];
$category = $_REQUEST['category'];
$imgSrc = $_REQUEST['imgSrc'];

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