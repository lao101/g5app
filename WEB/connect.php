<?php
    class Connect
    {
        static function getConnect()
        {
            $link = new mysqli("localhost", "root", "12345", "native");
            $link->query("set names utf8");
            return $link;
        }
    }
?>
