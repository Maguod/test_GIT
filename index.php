<?php 
	$ser = [];

	/*записываем в фаил log.txt пользователей заходивших на сайт. Настроить только данные которые нам интересны для идентификации пользователя от массива $_SERVER*/
	$ser[] = date('Y-m-d H:i:s');
	$ser[] = $_SERVER['REMOTE_ADDR'];
	$ser[] = $_SERVER['REQUEST_METHOD'];
	$ser[] = $_SERVER['REQUEST_URI'];
	$ser[] = $_SERVER['HTTP_USER_AGENT'];

	$str = implode('* *', $ser);

	file_put_contents('log.txt', $str . "\n" , FILE_APPEND);

	$data = file('log.txt');
	header('Location: index.html');

