<?php

	function __autoload($class) {
		include strtolower($class).".php";
	}

?>
