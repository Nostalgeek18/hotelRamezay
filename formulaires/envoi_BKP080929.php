<?
/*

	envoi.php

*/

//phpinfo();

//
//recupere element du formulaire
//
$sujet = "FORMULAIRE DE CONTACT - SITE WEB";

$to = "info@manoirramezay.com";
//$to = "jl2@fullvu.com";

$from = $to;


$textreport = "$sujet \n\n" ;
$textreport .="Nom: {$_POST['nom']}  \n";
$textreport .="Telephone: {$_POST['telephone']} \n";
$textreport .="Courriel: {$_POST['email']} \n";
$textreport .="Commentaires: {$_POST['commentaires']} \n";

if(isset( $_POST['langue'] )  AND ( $_POST['langue'] == "en" )  )
{
	$langue = "en";
}
else
{
	$langue = "fr";
}


$redirect_succes["fr"] = "succes-f.html";
$redirect_succes["en"] = "succes-e.html";

$redirect_erreur["fr"] = "erreur-f.html";
$redirect_erreur["en"] = "erreur-e.html";




$ret = mail($to, $sujet, $textreport,
     "From: $from\r\n"
    ."Reply-To: $from\r\n"
    ."X-Mailer: PHP/" . phpversion());



if ($ret == TRUE)
{
	//$relative_url = "merci2-f.html";
	$relative_url = $redirect_succes[$langue];

	header("Location: ".dirname($_SERVER['HTTP_REFERER'])
                     ."/".$relative_url);



}
else
{
	//$relative_url = "erreur-f.html";
	$relative_url = $redirect_erreur[$langue];

	header("Location: ".dirname($_SERVER['HTTP_REFERER'])
                     ."/".$relative_url);

}






?>