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
$page=$_REQUEST['page'];
$num=$_REQUEST['num'];
$category=$_REQUEST['category'];
$start=($page-1)*$num;
$sql = "SELECT title, author, content, date FROM news where category='$category' order by num desc limit $start,$num"; // limit ($page-1)*10+1,($page-1)*10+1+9
$result = $conn->query($sql);
$outp = "";
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        if ($outp != "") {$outp .= ",";}
        $outp .= '{"title":"'. $row["title"] . '",';
        $outp .= '"author":"'. $row["author"]  . '",';
        $outp .= '"content":"'. $row["content"] . '",';
        $outp .= '"date":"'. $row["date"]. '"}'; 
    }
//  $outp ='{"records":['.$outp.']}';
    
} else {
    echo "0 个结果";
}

$sql2 = "SELECT title FROM news where category='$category'"; // limit ($page-1)*10+1,($page-1)*10+1+9
$result2 = $conn->query($sql2);
$outp ='{"num":'.$result2->num_rows.',"list":['.$outp.']}';
echo $outp;
$conn->close();
?>