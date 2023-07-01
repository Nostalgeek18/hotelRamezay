
/**
 * build HTLM for the menu for the first time and displays it, or display it if already exists.
 */
function appendMenuHTML() {

	//Retrieve page's name
	const page 	  = window.location.pathname.split('/').pop();
	const pattern = /(_e|-e)/;

	const language = pattern.test(page) ? "en" : "fr";

	let languageSelectionHTML= getLanguagesLink();

	let linkChambres, linkHistorique, linkContact;
	if(language == "en") {
		linkChambres   = "chambres_e.html";
		linkHistorique = "historique_e.html";
		linkContact    = "contact_e.html"
	}else {
		linkChambres   = "chambres.html";
		linkHistorique = "historique.html";
		linkContact    = "contact.html"
	}

	const labelRoomsSuite = getLabel(language, 'rooms_and_suite');
	const labelHistorique = getLabel(language, 'history');
	const labelContact    = getLabel(language, 'contact_us');


	//Check first if sideMenu doesnt exist in the page, hidden
	if($(".sideMenu").length == 0) {
		const htmlMenu = `
		<div class="sideMenu">
			<div class="cross-container" onclick='toggleMenu()'>
				<span class="cross"></span>
				<span class="cross"></span>
			</div>
			<div class="container--links">
				<a href="${linkChambres}">${labelRoomsSuite}</a>
				<a href="${linkHistorique}">${labelHistorique}</a>
				<a href="${linkContact}">${labelContact}</a>
				<a href="https://www.facebook.com/ManoirRamezay" target="_blank">FACEBOOK</a>
				${languageSelectionHTML}
			</div>
		</div>
	`

	$("#container").append(htmlMenu);

	}
	
	$('.sideMenu').addClass('active');
	$('html, body').addClass('no-scroll');
}

/* Return appropriate string according to page's language and key of the label */
function getLabel(language, keyLabel) {


	const arrayLabels = {
		"en" : {
			"rooms_and_suite" : "ROOMS & SUITES",
			"history" : "HISTORY",
			"contact_us" : "CONTACT US",
			"phone"	: "PHONE"
 		},
		"fr" : {
			"rooms_and_suite": "CHAMBRES & SUITES",
			"history" : "HISTOIRE",
			"contact_us" : "NOUS CONTACTER",
			"phone"	: "TELEPHONE"
		}
	}

	// Set default language to 'rn' if language is not 'en' or 'fr'
	if (language !== 'en' && language !== 'fr') {
		language = 'en';
	  }

	return arrayLabels[language][keyLabel];
}

/*
 This function detects user's page and generate customized redirection links
 */
function getLanguagesLink() {

	//Get page's name from url
	const page 	  = window.location.pathname.split('/').pop();

	const pattern = /(_e|-e)/;
	const language = pattern.test(page) ? "en" : "fr";

	let languageSelectionHTML="";
	if(language == "en") {
		
		//Convert to French version of files
		if (page.includes('_e')) {
			pageFrench = page.replace('_e', '');
		  } else if (page.includes('-e')) {
			pageFrench = page.replace('-e', '');
		  }
		languageSelectionHTML = `<div><a href="#"><b>EN</b></a> | <a href="${pageFrench}">FR</a></div>`;
	}else {

		//Convert to English version of files
		const pageEnglish = page.replace(/\./, '_e.');
		languageSelectionHTML = `<div><a href="${pageEnglish}">EN</a> | <a href="#"><b>FR</b></a></div>`;
	}

	return languageSelectionHTML;
}

/*
* Knows if we either show or display the menu when clicking
*/
function toggleMenu() {
	$('.sideMenu').toggleClass('active');
	
	$('.sideMenu').hasClass('active') ? $('html, body').addClass('no-scroll'): $('html, body').removeClass('no-scroll');
	
}

/*
	Generates customized HTML for the footer
*/
function generateFooter() {

	//Get page's name from url
	const page 	 		  = window.location.pathname.split('/').pop();

	const footerContainer = $('#footer');
	const pattern 		  = /(_e|-e)/;
	const language 		  = pattern.test(page) ? "en" : "fr";

	const contactLink = language == "en" ? "contact_e.html" : "contact.html";

	const labelRoomsSuite = getLabel(language, 'rooms_and_suite');
	const labelHistorique = getLabel(language, 'history');
	const labelContact    = getLabel(language, 'contact_us');
	const labelPhone      = getLabel(language, 'phone');

	
	let linkChambres, linkHistorique, linkContact;
	if(language == "en") {
		linkChambres   = "chambres_e.html";
		linkHistorique = "historique_e.html";
		linkContact    = "contact_e.html"
	}else {
		linkChambres   = "chambres.html";
		linkHistorique = "historique.html";
		linkContact    = "contact.html"
	}

	const footerInnerHTML = `
	<div class="container--links">
		<a href="${linkChambres}">${labelRoomsSuite}</a>
		<a href="${linkHistorique}">${labelHistorique}</a>
		<a href="${linkContact}">${labelContact}</a>
		<a href="https://www.facebook.com/ManoirRamezay" target="_blank">FACEBOOK</a>
	</div>
	<img class="" alt="manoirRamezayLogo" src="../images/photos2.0/manoirRamezay.png">
	<div class="contact--infos">
		<p>${labelPhone}: 450 460 3251</p>
		<p>TOLL FREE: 1 866 460 3251</p>
		<p>492, rue Claude de Ramezay (Route 227) Marieville (Québec) J3M 1J6</p>
		<p>&copy 2023 MANOIR RAMEZAY</p>
	</div>
`

	footerContainer.html(footerInnerHTML);
}

$(document).ready(function() {
	const hamburgerMenu = $('.hamburger');
	hamburgerMenu.click(() => {
	  appendMenuHTML();
	});

	generateFooter();
  });