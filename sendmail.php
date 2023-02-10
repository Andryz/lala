<?php // Define constants
define( "RECIPIENT_NAME", "Lala-stars.com" );
define( "RECIPIENT_EMAIL", "affiliates@lala-stars.com" ); // where to send email affiliates@junglistars.com
define( "EMAIL_SUBJECT", "[Lala-stars.com]" );


$sender_message			= $_POST['message'];
$sender_email			= $_POST['email'];
$sender_name			= $_POST['name'];


$message = "
	<html>
		<body>
			<p>Почта: <strong>$sender_email</strong></p>
			<p>Имя: <strong>$sender_name</strong></p>
			<p>Сообщение: <span style=\"font-size:20px\">$sender_message</span></p>
        </body>
	</html>
";

// If all values exist, send the email
//if ($sender_name && $sender_email && $sender_company) {
if ($sender_name) {
    $recipient = RECIPIENT_NAME . " <" . RECIPIENT_EMAIL . ">";
    $headers = "Content-type: text/html; charset = utf-8 \r\n";
    $headers .= "From: " . $sender_name . " <" . $sender_email . ">";
    $success = mail($recipient, EMAIL_SUBJECT, $message, $headers);
}

// Return an appropriate response to the browser
if (isset($_GET["ajax"])) {
    echo $success ? "success" : "error";
}
else { ?>
    <html>
        <head>
            <title>Thank you!</title>
        </head>

        <body>
        <?php if ($success) {
            echo "<p>Thank you for your message!</p>";
        }
        else {
            echo "<p>Error while sendind, try again please</p>";
        } ?>
        </body>
    </html>
<?php } ?>


