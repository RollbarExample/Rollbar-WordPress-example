<?php 

header('Content-type:application/json;charset=utf-8');
$notice = array(
	'id' => '101',
	'message' => 'This is admin notice',

);
echo json_encode($notice);