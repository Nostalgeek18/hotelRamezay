<?
/*

	envoi.php

*/

//phpinfo();


	function verifie_http()
	{
		$str_recherche = "manoirramezay.com";
		
		foreach ($_REQUEST as $name => $value) 
		{
			//echo "Cl� : $name; Valeur : $value<br />\n";

			$tmp = stristr($value,  $str_recherche  );
			if ( $tmp != FALSE )
			{
				return FALSE;
			}
		}
		return TRUE;
	}


function longeur_texte_mini()
{
	$long = strlen ($_POST['nom']) + strlen ($_POST['telephone']) + strlen ($_POST['email']) + strlen ($_POST['commentaires']) ;
	if ($long <= 5 )
	{
		return FALSE;	
	}
	return TRUE;
}


if (   (verifie_http() == FALSE)  OR (longeur_texte_mini() == FALSE )   )
{
//print "D�sol�, pour des raisons de s�curit�, nous n�acceptons pas les URLs dans les messages. Veuillez r�essayer. <br><br> ";
// 	print "Desole, pour des raisons de securite, nous n'acceptons pas les URLs dans les messages. Veuillez reessayer. <br><br> "; 
//	print "Sorry, for security reasons, we cannot accept URLs in messages. Please try again. "; 
//	exit;

	if(isset( $_POST['langue'] )  AND ( $_POST['langue'] == "en" )  ){
		$langue = "en";
	}else{
		$langue = "fr";
	}

	$redirect_erreur["fr"] = "erreur-f.html";
	$redirect_erreur["en"] = "erreur-e.html";

	$relative_url = $redirect_erreur[$langue];

	header("Location: ".dirname($_SERVER['HTTP_REFERER'])
                     ."/".$relative_url);
	exit;
}



//
//recupere element du formulaire
//
$sujet = "WEB SITE - contact us form";

$to = "mouzai.n@yahoo.com";
//$to = "mikemore69@hotmail.com";

$from = "choco18@live.ca";

//$to_vide =  "<mailto:info@manoirramezay.com>info@manoirramezay.com";

if (strlen( $_POST['email'] ) > 5 )
{
	$from = $_POST['email'];
}



$textreport = "$sujet \n\n" ;
$textreport .="Name: {$_POST['nom']}  \n";
$textreport .="Telephone: {$_POST['telephone']} \n";
//$textreport .="Email: {$_POST['email']} \n";
$textreport .="Email: <mailto:{$_POST['email']}>{$_POST['email']} \n";
$textreport .="Comments: {$_POST['commentaires']} \n";

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