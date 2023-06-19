<?
/*

	envoi.php

*/

//phpinfo();


	function verifie_http()
	{
		$str_recherche = "http://";
		
		foreach ($_REQUEST as $name => $value) 
		{
			//echo "Clé : $name; Valeur : $value<br />\n";

			$tmp = stristr($value,  $str_recherche  );
			if ( $tmp != FALSE )
			{
				return FALSE;
			}
		}
		return TRUE;
	}



if (verifie_http() == FALSE)
{
	print "Désolé, pour des raisons de sécurité, nous n’acceptons pas les URLs dans les messages. Veuillez réessayer. <br><br> "; 
	print "Sorry, for security reasons, we cannot accept URLs in messages. Please try again. "; 
	exit;
}



//
//recupere element du formulaire
//
$sujet = "FORMULAIRE DE CONTACT - SITE WEB";

$to = "info@manoirramezay.com";
//$to = "jl2@fullvu.com";

$from = "info@manoirramezay.com";

//$to_vide =  "<mailto:info@manoirramezay.com>info@manoirramezay.com";

if (strlen( $_POST['email'] ) > 5 )
{
	$from = $_POST['email'];
}



$textreport = "$sujet \n\n" ;
$textreport .="Nom: {$_POST['nom']}  \n";
$textreport .="Telephone: {$_POST['telephone']} \n";
//$textreport .="Courriel: {$_POST['email']} \n";
$textreport .="Courriel: <mailto:{$_POST['email']}>{$_POST['email']} \n";
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