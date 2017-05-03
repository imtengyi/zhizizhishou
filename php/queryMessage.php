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
$start=($page-1)*$num;
$sql = "SELECT name, tel, content, date, num FROM contactUs order by num desc limit $start,$num"; // limit ($page-1)*10+1,($page-1)*10+1+9
$result = $conn->query($sql);
$outp = "";
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        if ($outp != "") {$outp .= ",";}
        $outp .= '{"name":"'. $row["name"] . '",';
        $outp .= '"tel":"'. $row["tel"]  . '",';
        $outp .= '"content":"'. $row["content"] . '",';
        $outp .= '"num":"'. $row["num"] . '",';
        $outp .= '"date":"'. $row["date"]. '"}'; 
    }
//  $outp ='{"records":['.$outp.']}';
    
} else {
    echo "0 个结果";
}

$sql2 = "SELECT name FROM contactUs"; // limit ($page-1)*10+1,($page-1)*10+1+9
$result2 = $conn->query($sql2);
$outp ='{"num":'.$result2->num_rows.',"list":['.$outp.']}';
echo $outp;
$conn->close();
?>