const ROOMS_DATA = [
	{
		name : 'standard',
		classImg : 'standardGuest',
		label : 'Standard Guest Room',
		labelFR : 'Chambre Standard'
	},
	{
		name : 'deluxe',
		classImg : 'deluxeGuest',
		label : 'Standard Guest Room',
		labelFR : 'Chambre supérieure'
	},
	{
		name : 'queenSuite',
		classImg : 'queenSuite',
		label : 'Standard Guest Room',
		labelFR : 'Suite Queen'
	},
	{
		name : 'suiteFireplace',
		classImg : 'suiteFireplace',
		label : 'Standard Guest Room',
		labelFR : 'Suite avec foyer'
	},
	{
		name : 'familySuite',
		classImg : 'familySuite',
		label : 'Standard Guest Room',
		labelFR : 'Suite familiale avec cuisine'
	},
	{
		name : 'royalSuite',
		classImg : 'kingSuite',
		label : 'Standard Guest Room',
		labelFR : 'Suite royale',
		starBanner : true
	},
	{
		name : 'royalSuiteKitchen',
		classImg : 'royalSuite',
		label : 'Standard Guest Room',
		labelFR : 'Suite Royale avec cuisine',
		starBanner : true
	}
]


/* Took from common.js */
function getLanguageCommon() {
	//Get page's name from url
	const page 	 		  = window.location.pathname;
	const pattern 		  = /en/;
	const language 		  = pattern.test(page) ? "en" : "fr";

	return language;
}

function getRoomsImgs(roomName) {


	let roomsHtml = '';
	for (let i =1; i<= 5 ; i ++) {
		roomsHtml+= `<div class="card card--header ${roomName}Room room${i}"></div>`
	}

	return roomsHtml;
}

function attachEventsImg() {
    const imgContainers = $('.grid-container .grid-item')

    imgContainers.click((container)=> {
        expandImages('desktop')
    })
}

function toggleRoomWrapper() {
	$('.global--wrapper').removeClass('active');
	$('#container').show();
}

function findRoomTypeInURL() {
	const url  = window.location.href;
	for (const room of ROOMS_DATA) {
		if (url.includes(room.name)) {
			return room.name;
		}
	}
	return null;
}


function loadOtherRooms() {

	const globalWrapper = $('.wrapper--allRooms--standAlone');
	console.log(globalWrapper);

	const matchedRoomType = findRoomTypeInURL() || "standard";

	let HTMLRooms = ""


	ROOMS_DATA.forEach(({name, classImg, label, labelFR, starBanner}) => {

		if(name === matchedRoomType) return //dont repeat the ream

		const finalLabel = getLanguageCommon() === "fr" ? labelFR : label
		const starBannerHTML = starBanner ? `<div class="banner--mostBeautiful"><img src="../../images/icons/star.png"/> One of the most beautiful in Québec</div>` : ''

		HTMLRooms += `
		<div class="wrapper-room" id="${name}" onClick="checkRoom(this)">
			<div class="room ${classImg}">
				${starBannerHTML}
				<div class="overlay"></div>
			</div>
			<div class="roomBannerClick">${finalLabel} <span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
				<path d="M5 14.5C4.17157 14.5 3.5 15.1716 3.5 16C3.5 16.8284 4.17157 17.5 5 17.5V14.5ZM27.0607 17.0607C27.6464 16.4749 27.6464 15.5251 27.0607 14.9393L17.5147 5.3934C16.9289 4.80761 15.9792 4.80761 15.3934 5.3934C14.8076 5.97919 14.8076 6.92893 15.3934 7.51472L23.8787 16L15.3934 24.4853C14.8076 25.0711 14.8076 26.0208 15.3934 26.6066C15.9792 27.1924 16.9289 27.1924 17.5147 26.6066L27.0607 17.0607ZM5 17.5H26V14.5H5V17.5Z" fill="#2B0000"/>
				</svg></span>
			</div>
		</div>
		`
	})
	
	//dynamically setup the html for the whole rooms
	globalWrapper.html(HTMLRooms);
}


$(document).ready(function() {

    attachEventsImg();

	loadOtherRooms();

});
