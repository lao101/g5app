<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: origin, content-type, accept");
    header('Content-Type: application/json');

    $postdata = file_get_contents("php://input");
	$req = json_decode($postdata, true);

    $id = $req[message_id];

    require_once("auto_load.php");
    $link = Connect::getConnect();
    $sql = "delete from messages where message_id = $id";
    $result = $link->query($sql);
    if ($result):
            echo json_encode(array(success => true));
    else:
        echo json_encode(array(success => false));
    endif;
?>
