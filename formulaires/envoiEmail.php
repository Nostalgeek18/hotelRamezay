<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $nom = htmlspecialchars($_POST['nom']);
    $email = htmlspecialchars($_POST['email']);
    $commentaires = htmlspecialchars($_POST['commentaires']);
    $langue = htmlspecialchars($_POST['langue']);

    // Prepare the email content
    $to = $email; // Sending email to the user
    $subject = "Votre formulaire a été soumis";
    $message = "Bonjour $nom,\n\nMerci pour vos commentaires:\n\n$commentaires\n\nLangue: $langue\n\nCordialement,\nVotre équipe";
    $headers = "From: noreply@yourdomain.com";

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "Email envoyé avec succès à $email.";
    } else {
        echo "Échec de l'envoi de l'email.";
    }
} else {
    echo "Méthode de requête non valide.";
}
?>