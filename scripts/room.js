const ROOMS_DATA = [
	{
		name : 'standard',
		classImg : 'standardGuest',
		label : 'Standard Guest Room',
		labelFR : 'Chambre Régulière',
		dirImages : 'standardRoom',
		description : '5 standard guestrooms with one double bed.',
		descriptionFR : '5 chambres régulières à lit double.'
	},
	{
		name : 'deluxe',
		classImg : 'deluxeGuest',
		label : 'Deluxe Room',
		labelFR : 'Chambre supérieure',
		dirImages : 'deluxeRoom',
		description : '4 standard guestrooms with one double bed.',
		descriptionFR : '4 chambres supérieures à lit double.'
	},
	{
		name : 'queenSuite',
		classImg : 'queenSuite',
		label : 'Queen Suite',
		labelFR : 'Suite Queen',
		dirImages : 'queenSuite',
		description : '1 queen suite with one Queen size bed and Double bed.',
		descriptionFR : '1 Suite queen à grand lit (Queen) et lit double.'
	},
	{
		name : 'suiteFireplace',
		classImg : 'suiteFireplace',
		label : 'Suite With Fireplace',
		labelFR : 'Suite avec foyer',
		dirImages : 'suiteFireplace',
		description : '1 Suite with fireplace, queen size bed and futon.',
		descriptionFR : '1 suite avec foyer, avec lit queen et futon.'
	},
	{
		name : 'familySuite',
		classImg : 'familySuite',
		label : 'Family Suite with kitchen',
		labelFR : 'Suite familiale avec cuisine',
		dirImages : 'familySuite',
		description : '1 Cozy family suite with kitchen.',
		descriptionFR : '1 suite familiale douillette avec cuisine, lit queen et futon'
	},
	{
		name : 'royalSuite',
		classImg : 'kingSuite',
		label : 'Royal Suite',
		labelFR : 'Suite royale',
		starBanner : true,
		dirImages : 'royalSuite',
		description : '1 King suite with one King size bed.',
		descriptionFR : '1 suite royale à très grand lit (King).'
	},
	{
		name : 'royalSuiteKitchen',
		classImg : 'royalSuite',
		label : 'Royal Suite with kitchen',
		labelFR : 'Suite Royale avec cuisine',
		starBanner : true,
		dirImages : 'royalSuiteKitchen',
		description : '1 Royal suite with very comfortable queen bed and sofa bed upstairs.',
		descriptionFR : '1 Suite royale avec lit très confortable (Queen) et lit sofa en ahut.'
	}
]


/* Took from common.js */
function getLanguageCommon() {
	//Get page's name from url
	const page 	 		  = window.location.pathname;
	const pattern 		  = /\/en\//;

	const language 		  = pattern.test(page) ? "en" : "fr";

	return language;
}

// function getRoomsImgs(roomName) {


// 	let roomsHtml = '';
// 	for (let i =1; i<= 5 ; i ++) {
// 		roomsHtml+= `<div class="card card--header ${roomName}Room room${i}"></div>`
// 	}

// 	return roomsHtml;
// }

function attachEventsImg(dirImages) {
    const imgContainers = $('.grid-container .grid-item')

    imgContainers.click((container)=> {
        expandImages(dirImages)
    })
}

function toggleRoomWrapper() {
	$('.global--wrapper').removeClass('active');
	$('#container').show();
}

function findRoomTypeInURL() {
	const url  = window.location.href.toLowerCase();
	for (const room of ROOMS_DATA) {
		if (url.includes(room.name.toLowerCase())) {
			return room.name;
		}
	}

	console.log('Room could not be find !');
	return "standard"; //default if cant find
}

/** Appears at the bottom of the page as a preview section*/
function loadOtherRooms() {

	const globalWrapper = $('.wrapper--allRooms--standAlone');

	const matchedRoomType = findRoomTypeInURL() || "standard";
	console.log('matched : ', matchedRoomType);

	let HTMLRooms = ""

	ROOMS_DATA.forEach(({name, classImg, label, labelFR, starBanner}) => {

		if(name === matchedRoomType) return //avoid showing the same room

		const extraPrevious  = getLanguageCommon() === "fr" ? '' : '../' //one more depth to go back if its in english folder
		const finalLabel     = getLanguageCommon() === "fr" ? labelFR : label
		const finalLabelStar = getLanguageCommon() === "fr" ? "Une des plus belles du Québec" : "One of the most beautiful in Québec"
		const starBannerHTML = starBanner ? `<div class="banner--mostBeautiful"><img src="${extraPrevious}../../images/icons/star.png"/> ${finalLabelStar}</div>` : ''

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

function loadMainImagesRoom() {
	const wrapperImgSection = $('.grid-container.standalone');
	const wrapperInfosRoom  = $('.infos--room');

	const matchedRoomType = findRoomTypeInURL();

	let HTMLImages = ''
	ROOMS_DATA.forEach(({name, dirImages, label, labelFR, description, descriptionFR}) => {
		if(name === matchedRoomType) {
			if(name === "deluxe") {
				HTMLImages +=  `
				<div class="grid-item grid-item-1" onClick="expandImages('${dirImages}')">
					<div class="image-shadow"></div>
					<img src="/images/photos2.0/rooms/${dirImages}/topImgDesktop/topMain.png" alt="room image #1"/>
				</div>
				<div class="subgrid-container-deluxe grid-item" onClick="expandImages('${dirImages}')">
					<div class="grid-item grid-item-1">
						<img src="/images/photos2.0/rooms/${dirImages}/topImgDesktop/top1.png" alt="room image #2"/>
						<div class="image-shadow"></div>
					</div>
					<div class="grid-item grid-item-2" onClick="expandImages('${dirImages}')">
						<img src="/images/photos2.0/rooms/${dirImages}/topImgDesktop/top2.png" alt="room image #3"/>
						<div class="image-shadow"></div>
					</div>
					<div class="grid-item grid-item-3" onClick="expandImages('${dirImages}')">
						<img src="/images/photos2.0/rooms/${dirImages}/topImgDesktop/top3.png" alt="room image #4"/>
						<div class="image-shadow"></div>
					</div>
				</div>
			`
	
			}else {

				HTMLImages +=  `
				<div class="grid-item grid-item-1" onClick="expandImages('${dirImages}')">
					<div class="image-shadow"></div>
					<img src="/images/photos2.0/rooms/${dirImages}/topImgDesktop/topMain.png" alt="room image #1"/>
				</div>
				<div class="subgrid-container grid-item" onClick="expandImages('${dirImages}')">
					<div class="grid-item grid-item-1">
						<img src="/images/photos2.0/rooms/${dirImages}/topImgDesktop/top1.png" alt="room image #2"/>
						<div class="image-shadow"></div>
					</div>
					<div class="grid-item grid-item-2" onClick="expandImages('${dirImages}')">
						<img src="/images/photos2.0/rooms/${dirImages}/topImgDesktop/top2.png" alt="room image #3"/>
						<div class="image-shadow"></div>
					</div>
					<div class="grid-item grid-item-3" onClick="expandImages('${dirImages}')">
						<img src="/images/photos2.0/rooms/${dirImages}/topImgDesktop/top3.png" alt="room image #4"/>
						<div class="image-shadow"></div>
					</div>
					<div class="grid-item grid-item-4" onClick="expandImages('${dirImages}')">
						<img src="/images/photos2.0/rooms/${dirImages}/topImgDesktop/top4.png" alt="room image #5"/>
						<div class="image-shadow"></div>
					</div>
				</div>
			`
			}

		//add infos of Title

		const finalLabel 	   = getLanguageCommon() === "fr" ? labelFR : label
		const finalDescription = getLanguageCommon() === "fr" ? descriptionFR : description

		const infosRoomHTML = `
		<h1>${finalLabel}</h1>
		<p>${finalDescription}</p>
		`

		//append infos of the room
		wrapperInfosRoom.html(infosRoomHTML);



		} //end IF
	})

	wrapperImgSection.html(HTMLImages);
}


$(document).ready(function() {

	loadMainImagesRoom();

	loadOtherRooms();

});
