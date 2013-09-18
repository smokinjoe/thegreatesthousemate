<?php

if ( !isset($_POST['email']) || !isset($_POST['name']) ||
      $_POST['email'] === "" || $_POST['name'] === "") {

  echo json_encode(array('result' => false, 'errors' => 'Must include both email and name.', 'message' => 'Must include both email and name.'));
  return false;
}
else {
  $email = $_POST['email'];
  $name = stripHtmlAndSpecials($_POST['name']);

}

require 'PHPMailerAutoload.php';

//Create a new PHPMailer instance
$mail = new PHPMailer();
// Set PHPMailer to use the sendmail transport
$mail->isSendmail();
//Set who the message is to be sent from
$mail->setFrom('info@thegreatesthousemate.com', $name);
//Set who the message is to be sent to
$mail->addAddress('thegreatesthousemate@gmail.com', 'Joe Ekiert');
//Set the subject line
$mail->Subject = $name . ' is trying to contact you!';
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->msgHTML("Someone is trying to get in touch with you.  Their email is: " . $email . " and their name is: " . $name);
//Replace the plain text body with one created manually
$mail->AltBody = 'Someone is trying to get in touch with you.  Their email is: ' . $email . " and their name is: " . $name;

//send the message, check for errors
if (!$mail->send()) {
  echo json_encode(array('result' => false, 'errors' => $mail->ErrorInfo, 'message' => 'Email failed to send.'));
  return false;
  #echo "Mailer Error: " . $mail->ErrorInfo;
} else {
  echo json_encode(array('result' => true, 'errors' => '', 'message' => 'I\'ll be getting back to you shortly!'));
}

function stripHtmlAndSpecials($des) {
  // Strip HTML Tags
  $clear = strip_tags($des);
  // Clean up things like &amp;
  $clear = html_entity_decode($clear);
  // Strip out any url-encoded stuff
  $clear = urldecode($clear);
  // Replace non-AlNum characters with space
  $clear = preg_replace('/[^A-Za-z0-9]/', ' ', $clear);
  // Replace Multiple spaces with single space
  $clear = preg_replace('/ +/', ' ', $clear);
  // Trim the string of leading/trailing space
  $clear = trim($clear);

  return $clear;
}
?>