
const ROOMS = {
	standard          : 'standard',
	deluxe            : 'deluxe',
	queenSuite        : 'queenSuite',
	suiteFireplace    : 'suiteFireplace',
	familySuite       : 'familySuite',
	royalSuite        : 'royalSuite',
	royalSuiteKitchen : 'royalSuiteKitchen'
}

function getDepth() {
	
	const page = window.location.pathname === "" ? 'index.html' : window.location.pathname

	const language = getLanguage();

	let previous = '';
	if(language == "fr") {
		previous = ''
	}else {
		const depth = (page.match(/\//g) || []).length -1; //dont count initial backslash
		for(let i =0; i< depth ; i++) {
		
			if(i == depth -1) {
				previous += '..'
			}else {
				previous += '../'
			}
			
		}
	}

	return previous
}

function setActiveMenu() {

	const PAGES  = [
		'chambres',
		'rooms',
		'contact',
		'historique'
	]
	const url  = window.location.href.toLowerCase();

	let finalPage = "";
	for (const page of PAGES) {
		const exactMatch = new RegExp(`\\b${page}\\b`);
		if (exactMatch.test(url)) {
			console.log('active page : ', page);
			switch(page) {
				case "chambres" :
				case "room"     :
					$('#chambres').addClass('active');
					break;
				case "contact" :
					$('#contact').addClass('active');
					break;
				case "historique" :
					$('#history').addClass('active');
					break;
			

			}
		}
	}

}


/**
 * build HTLM for the menu for the first time and displays it, or display it if already exists.
 */
function appendMenuHTML() {


	//Retrieve page's name
	const page 	  = window.location.pathname;
	const pattern = /\/en\//;;

	const language = pattern.test(page) ? "en" : "fr";


	let languageSelectionHTML= getLanguagesLink();



	const previous = language == "fr" ? "" : '/en'

	const linkChambres   = `chambres.html`;
	const linkHistorique = `historique.html`;
	const linkContact    = `contact.html`;
	const linkFacebook   = `https://www.facebook.com/ManoirRamezay`;
	

	const labelRoomsSuite = getLabel(language, 'rooms_and_suite');
	const labelHistorique = getLabel(language, 'history');
	const labelContact    = getLabel(language, 'contact_us');
	const labelFacebook   = getLabel(language, 'facebook')


	//Check first if sideMenu doesnt exist in the page, hidden
	if($(".sideMenu").length == 0) {
		const htmlMenu = `
		<div class="sideMenu">
			<div class="cross-container" onclick='toggleMenu()'>
				<span class="cross"></span>
				<span class="cross"></span>
			</div>
			<div class="menu--container--links">
				<a id="chambres" href="${previous}/${linkChambres}">${labelRoomsSuite}</a>
				<a id="history" href="${previous}/${linkHistorique}">${labelHistorique}</a>
				<a id="contact" href="${previous}/${linkContact}">${labelContact}</a>
				<a id="" href="${linkFacebook}" target="_blank">${labelFacebook}</a>
				${languageSelectionHTML}
			</div>
		</div>
	`

		$("#container").append(htmlMenu);
		setActiveMenu();

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
			"phone"	: "PHONE",
			"facebook" : "facebook",
			"registration" : "REGISTRATION NUMBER",
			"toll" : "TOLL FREE"
 		},
		"fr" : {
			"rooms_and_suite": "CHAMBRES & SUITES",
			"history" : "HISTOIRE",
			"contact_us" : "CONTACTEZ-NOUS",
			"phone"	: "TELEPHONE",
			"facebook" : "facebook",
			"registration" : "NUMÉRO D'ENREGISTREMENT",
			"toll" : "SANS FRAIS"
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

	//Get page's name from url - If result is blank then it means its the index page. 
	let page 	= window.location.pathname === "" ? 'index.html' : window.location.pathname

	const language = getLanguage();

	const previous = getDepth();

	let languageSelectionHTML="";
	if(language == "en") {
		page = page.replace("/en/", "");
		languageSelectionHTML = `<div><a href="#"><b>EN</b></a> | <a href="${previous}/${page}">FR</a></div>`;
	}else {
		//Convert to English version of files
		languageSelectionHTML = `<div><a href="/en${page}">EN</a> | <a href="#"><b>FR</b></a></div>`;
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

function getLanguage() {
	//Get page's name from url
	const page 	 		  = window.location.pathname;
	const pattern 		  = /\/en\//;
	const language 		  = pattern.test(page) ? "en" : "fr";

	return language;
}

/**
 * 
 * @param {string} page 
 * @param {string} langage 
 */
function goTo(page) {
	const language = getLanguage();

	const extension = language == 'fr' ? '' : '/en'

	switch (page) {
		case 'history' : 
			window.location.href = `${extension}/historique.html`
			break;
		default : 
			window.location.href = `${extension}/index.html`
	}
	
}

/*
	Generates customized HTML for the footer
*/
function generateFooter() {


	const language = getLanguage();

	const footerContainer = $('#footer');

	const labelRoomsSuite   = getLabel(language, 'rooms_and_suite');
	const labelHistorique   = getLabel(language, 'history');
	const labelContact      = getLabel(language, 'contact_us');
	const labelPhone        = getLabel(language, 'phone');
	const labelToll         = getLabel(language, 'toll')
	const labelRegistration = getLabel(language, 'registration');

	
	
	const previous = getPrefixPage();

	const linkChambres   = `${previous}chambres.html`;
	const linkHistorique = `${previous}historique.html`;
	const linkContact    = `${previous}contact.html`;
	const linkFacebook   = `https://www.facebook.com/ManoirRamezay`;


	const currentYear = new Date().getFullYear();

	const footerInnerHTML = `
	<div class="container--links">
		<a href="${linkChambres}">${labelRoomsSuite}</a>
		<a href="${linkHistorique}">${labelHistorique}</a>
		<a href="${linkContact}">${labelContact}</a>
		<a class="facebook" href="${linkFacebook}" target="_blank">FACEBOOK</a>
	</div>
	<div class="contact--infos">
		<p>${labelPhone}: 450 460 3251</p>
		<p>${labelToll}: 1 866 460 3251</p>
		<p>hotelmanoirramezay@gmail.com</p>
		<p class="adresse">492, rue Claude de Ramezay (Route 227) Marieville (Québec) J3M 1J6</p>
		<div class="establishment mobile">${labelRegistration} 211094</div>
		<p>&copy ${currentYear} MANOIR RAMEZAY</p>
	</div>
	<div class="logo--section">
		<img class="footerLogo" alt="manoirRamezayLogo" src="/images/photos2.0/ramezayLogo.png">
		<div class="establishment desktop">${labelRegistration} 211094</div>
	</div>

`

	footerContainer.html(footerInnerHTML);
}

function goBack(page = 'index') {
	const language = getLanguage();
	const prev = language == "fr" ? "" : "/en"

	//Trivial but as long the architecture is flatten, should work
	let link = "/index.html"

	switch(page) {
		case "index" :
			break;
		case "chambres":
			link = `${prev}/chambres.html`
			break;
		default :
			break;
	}
	window.location.href = link;
	
}

function getRoomsImgs(dirImages) {

	const device   = checkDeviceType();	
	const prefix   = getLanguage() === "fr" ? '' : '../';

	let endLoop = 5;
	switch (dirImages) {
		case "deluxeRoom" :
			endLoop = 4;
			break;
		case "royalSuiteKitchen":
			endLoop = 6;
			break;
		default:
			endLoop = 5;
			break;
	}

	let roomsHtml = '';
	if(device === "mobile") {
		for (let i =1; i<= endLoop ; i ++) {
			roomsHtml+= `
			<div class="">
				<img class="" src="${prefix}../../images/photos2.0/rooms/${dirImages}/carousel/carousel${i}.png">
			</div>
			`
		}
	
	}else {
		
		for (let i =1; i<= endLoop ; i ++) {
			roomsHtml+= `
			<div class="global">
				<img class="" src="${prefix}../../images/photos2.0/rooms/${dirImages}/carousel/carousel${i}.png">
			</div>
			`
		}

	}

	const globalWrapper = `
	<div class="global--imgExpand ${device}">
		${roomsHtml}
	</div>
`

return globalWrapper;

}

function checkRoom(element){


	const langFolder = getLanguage() === "fr" ? '' : '/en'
	const terminaison = checkDeviceType() === "desktop" ? '_d' : ''
	const { id : room } = element || "standard"

	if(!element || element === "all") {
		location.href = `${langFolder}/chambres.html`
		return;
	}


	location.href = `${langFolder}/rooms/${room}/room${terminaison}.html`

	// switch (room) {
	// 	case ROOMS.standard:
	// 		location.href = `./rooms/${room}/room${terminaison}.html`
	// 		break;
	// 	default:
	// 		location.href = `./rooms/${room}/room${terminaison}.html`
	// }

}


function expandImages(dirImages = 'standardRoom') {

	const device = checkDeviceType();

	const goBackIcon = `
	<div onclick="toggleRoomWrapper()" class="arrowBack roomWrapper">
	<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
		<g filter="url(#filter0_d_111_756)">
		<rect x="10" y="6" width="44" height="44" rx="22" fill="white"/>
		<path d="M33.8332 20.6667L27.7962 26.7036C27.0803 27.4196 27.0803 28.5804 27.7962 29.2964L33.8332 35.3333" stroke="#2B0000" stroke-width="2.5" stroke-linecap="round"/>
		</g>
		<defs>
		<filter id="filter0_d_111_756" x="0" y="0" width="64" height="64" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
		<feFlood flood-opacity="0" result="BackgroundImageFix"/>
		<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
		<feOffset dy="4"/>
		<feGaussianBlur stdDeviation="5"/>
		<feComposite in2="hardAlpha" operator="out"/>
		<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
		<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_111_756"/>
		<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_111_756" result="shape"/>
		</filter>
		</defs>
		</svg>
</div>`


		const roomImgsHTML = getRoomsImgs(dirImages);

        //Check first if sideMenu doesnt exist in the page, hidden
        if($(".global--wrapper").length == 0) {

			let wrapperRooms;
			if(device === "mobile") {
				wrapperRooms = `
				<div class="global--wrapper ${device}">
					<div class="wrapper--allImg">
					${goBackIcon}
					${roomImgsHTML}
					</div>
				</div>
				`
			}else {
				wrapperRooms = `
				<div class="global--wrapper ${device}">
					${goBackIcon}
					<div class="wrapper--allImg ${device}">
						${roomImgsHTML}
					</div>
				</div>
				`
	
			}
	
			$('body').append(wrapperRooms);
		}


		$('#container').hide();
		$('.global--wrapper').addClass('active');

}

function toggleRoomWrapper() {
	$('.global--wrapper').removeClass('active');
	$('#container').show();
}

function generateMenu(){
	const hamburgerMenu = $('.hamburger');
	hamburgerMenu.click(() => {
	  appendMenuHTML();
	});
}

function isMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Check for mobile user agents
    if (/android|avantgo|blackberry|bada|bb|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile|netfront|nokia|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up(\.browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(userAgent)) {
        return true;
    }

    // Check for iPad
    if (/iPad|Macintosh/i.test(userAgent) && 'ontouchend' in document) {
        return true;
    }

    // Check for small screen sizes
    if (window.matchMedia && window.matchMedia('(max-width: 767px)').matches) {
        return true;
    }

    return false;
}

function checkDeviceType() {
    if (isMobileDevice()) {
        return "mobile";
    } else {
        return "desktop";
    }
}

function sendEmail(e){
	e.preventDefault();
	console.log('sending email');
	const formData = new FormData(document.forms.form1);
            const formObj = {};
            formData.forEach((value, key) => {
                formObj[key] = value;
            });

            fetch('/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObj)
            })
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
}


//************CAROUSEL SCRIPTS (with dots) **************/
function triggerCarouselDots() {

	if(!document.getElementsByClassName('carousel')[0]) return; //no carousel
	const slideIndicator = document.getElementsByClassName('carousel--indicator')[0];
	const slides 		 = slideIndicator.closest("[data-carousel").querySelector("[data-slides]")
	const dots 			 = document.getElementsByClassName('carousel--indicator')[0];


	setInterval(()=>{
		const activeSlide = slides.querySelector("[data-active]")
		const activeDot = dots.querySelector("[data-active]")
		let newIndex = [...slides.children].indexOf(activeSlide) + 1
		if(newIndex < 0) newIndex = slides.children.length -1 //go back to last element
		if(newIndex >= slides.children.length) newIndex = 0; //go back first index 

		slides.children[newIndex].dataset.active = true 
		dots.children[newIndex].dataset.active = true
		delete activeSlide.dataset.active
		delete activeDot.dataset.active
	},3000)
}

/**
 * Use to get accurate relative paths in redirection
 */
function getPrefixPage(handleLang = true) {
	const page = window.location.pathname;
	// Calculate the relative path depth
	const depth = page.split('/').length - 2; // -2 because the first element is an empty string and the last one is the page name
	let prefix = '';
	for (let i = 0; i < depth; i++) {
		prefix += '../';
	}

	if(prefix === "") prefix = "/"

	const language = getLanguage();
	if(handleLang && language == "en") {
		prefix += "en/"
	}

	return prefix;

}

function appendLinkLogo() {
	$('.logoManoirRamezay').on("click", () => {

		const prefix = getPrefixPage(); //handles lang too
		window.location.href = `${prefix}index.html`;


	})
}

/* Used in  desktops */
function triggerCarouselNoDots() {

	if(!document.getElementsByClassName('carousel')[0]) return; //no carousel
	const slideIndicator = document.getElementsByClassName('carousel--indicator')[0];
	const slides = slideIndicator.closest("[data-carousel").querySelector("[data-slides]")
	const dots = document.getElementsByClassName('carousel--indicator')[0];


	setInterval(()=>{
		const activeSlide = slides.querySelector("[data-active]")
		let newIndex = [...slides.children].indexOf(activeSlide) + 1
		if(newIndex < 0) newIndex = slides.children.length -1 //go back to last element
		if(newIndex >= slides.children.length) newIndex = 0; //go back first index 

		slides.children[newIndex].dataset.active = true 
		delete activeSlide.dataset.active
	},5000)
}

window.mobileCheck = function() {
	let check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
  };

$(document).ready(function() {

	appendLinkLogo();
	
	generateMenu();

	generateFooter();	

	setTimeout(()=>{
		checkDeviceType() === "desktop" ? triggerCarouselNoDots() : triggerCarouselDots();
	}, 500)

});
