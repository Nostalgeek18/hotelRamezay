

/**
 * build HTLM for the menu for the first time and displays it, or display it if already exists.
 */
function appendMenuHTML() {

	//Retrieve page's name
	const page 	  = window.location.pathname.split('/').pop();
	const pattern = /(_e|-e)/;

	const language = pattern.test(page) ? "en" : "fr";

	let languageSelectionHTML="";
	if(language == "en") {
		languageSelectionHTML = '<div><a href="#"><b>EN</b></a> | <a href="index.html">FR</a></div>';
	}else {
		languageSelectionHTML = '<div><a href="index_e.html">EN</a> | <a href="#"><b>FR</b></a></div>';
	}


	//Check first if sideMenu doesnt exist in the page, hidden
	if($(".sideMenu").length == 0) {
		const htmlMenu = `
		<div class="sideMenu">
			<div class="cross-container" onclick='toggleMenu()'>
				<span class="cross"></span>
				<span class="cross"></span>
			</div>
			<div class="container--links">
				<a href="chambres_e.html">ROOMS & SUITES</a>
				<a href="historique_e.html">HISTORY</a>
				<a href="contact_e.html">CONTACT US</a>
				<a>FACEBOOK</a>
				${languageSelectionHTML}
			</div>
		</div>
	`

	$("#container").append(htmlMenu);

	}
	
	$('.sideMenu').addClass('active');
	$('html, body').addClass('no-scroll');
}

/*
* Knows if we either show or display the menu when clicking
*/
function toggleMenu() {
	$('.sideMenu').toggleClass('active');
	
	$('.sideMenu').hasClass('active') ? $('html, body').addClass('no-scroll'): $('html, body').removeClass('no-scroll');
	
}

$(document).ready(function() {
	const hamburgerMenu = $('.hamburger');
	hamburgerMenu.click(() => {
	  appendMenuHTML();
	});
  });