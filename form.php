<?php
if(!isset($_POST)) {
	header( "Location: index.html" );
	exit;
}

if(isset($_POST)) {
	$pattern_name = ^[а-яА-ЯёЁa-zA-Z0-9-_@ ]+$;
	$name_post = preg_replace($pattern_name, $_POST['name']);
	$name = "Имя пользователя: " . $name_post . "<br/>";
	$email = "E-mail пользователя: " . preg_replace($pattern_name, trim($_POST['email'])) . "<br/>";
	$tel = "Телефон пользователя: " . preg_replace($pattern_name, trim($_POST['tel'])) . "<br>";
	$mess = "Сообщение пользователя: " . preg_replace($pattern_name, trim($_POST['msg']));

	$message = $name . $email . $tel . $mess;

	echo $name;
	echo $email;
	echo $tel;
	echo $mess;

	
	function send_mail($message){
		// почта, на которую придет письмо
		$mail_to = "magumaxod@gmail.com";
		// тема письма yuliyamalinina1679@gmail.com
		$subject = "Письмо с обратной связи";
		 
		// заголовок письма
		$headers= "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
		$headers .= "From: Тестовое письмо <maggu@vh340.ffox.site>\r\n"; // от кого письмо
		 
		// отправляем письмо 
		mail($mail_to, $subject, $message, $headers);
 }
    send_mail($message); // отправим письмо
	// header( "Location: index.html" );
 
};
