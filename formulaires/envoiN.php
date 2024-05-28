<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $to = "client-email@gmail.com";
    $subject = "Message from $name";
    $body = $message;
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Email successfully sent.";
    } else {
        echo "Email sending failed.";
    }
}
?>
