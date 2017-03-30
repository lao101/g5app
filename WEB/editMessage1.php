<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: origin, content-type, accept");
    header('Content-Type: application/json');

    $postdata = file_get_contents("php://input");
	$req = json_decode($postdata, true);

    $id = $req[message_id];
    $sql = "select * from messages where message_id = $id";
    //echo $sql;

    require_once("auto_load.php");
    $link = Connect::getConnect();
    $results = $link->query($sql);
    $json = array();
    while($row = $results->fetch_array(MYSQL_ASSOC)) {
        array_push($json, $row);
    }
    echo json_encode($json);
?>
