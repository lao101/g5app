<?php
    require_once("auto_load.php");
    $link = Connect::getConnect();
    $sql = "select * from messages order by message_id desc";
    if ($result = $link->query($sql)) :
        $json = array();
        while($row = $result->fetch_array(MYSQL_ASSOC)) {
            array_push($json, $row);
        }
        echo json_encode($json);
    endif;
?>
