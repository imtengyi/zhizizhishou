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
$start=$_REQUEST['start'];
$num=$_REQUEST['num'];
$sort=$_REQUEST['sort'];
$category=$_REQUEST['category'];
$series=$_REQUEST['series'];

if($category=="all"&&$series=="all"){
	$sql = "SELECT num,productNumber, marketPrice, price, weight, category, series, imgSrc FROM product order by $sort desc limit $start,$num"; 
}
else if($category=="all"&&$series!="all"){
	$sql = "SELECT num,productNumber, marketPrice, price, weight, category, series, imgSrc FROM product where series='$series' order by $sort desc limit $start,$num"; 
}
else if($category!="all"&&$series=="all"){
	$sql = "SELECT num,productNumber, marketPrice, price, weight, category, series, imgSrc FROM product where category='$category' order by $sort desc limit $start,$num"; 
}
else if($category!="all"&&$series!="all"){
	$sql = "SELECT num,productNumber, marketPrice, price, weight, category, series, imgSrc FROM product where category='$category' and series='$series' order by $sort desc limit $start,$num"; 
}


$result = $conn->query($sql);
$outp = "";
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        if ($outp != "") {$outp .= ",";}
        $outp .= '{"num":"'. $row["num"] . '",';
        $outp .= '"productNumber":"'. $row["productNumber"] . '",';
        $outp .= '"marketPrice":"'. $row["marketPrice"]  . '",';
        $outp .= '"price":"'. $row["price"] . '",';
        $outp .= '"weight":"'. $row["weight"] . '",';
        $outp .= '"category":"'. $row["category"] . '",';
        $outp .= '"series":"'. $row["series"] . '",';
        $outp .= '"imgSrc":"'. $row["imgSrc"]. '"}'; 
    }
    
} else {
//  echo "0 个结果";
}
$sql2 = "SELECT productNumber FROM product"; // limit ($page-1)*10+1,($page-1)*10+1+9
$result2 = $conn->query($sql2);
$outp ='{"num":'.$result2->num_rows.',"list":['.$outp.']}';
echo $outp;
$conn->close();
?>