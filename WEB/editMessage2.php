<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: origin, content-type, accept");
    header('Content-Type: application/json');

    $postdata = file_get_contents("php://input");
	$req = json_decode($postdata, true);

    $message_id = $req[id];
    $name = $req[name];
    $message = $req[message];

    require_once("auto_load.php");
    $link = Connect::getConnect();
    $sql = "update messages set name='$name', message='$message' where message_id=$message_id";
    $result = $link->query($sql);
    if ($result):
        echo json_encode(array(success => true));
    else:
        echo json_encode(array(success => false));
    endif;
?>
