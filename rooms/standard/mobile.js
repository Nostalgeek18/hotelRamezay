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
		label : 'Standard Guest Room',
		labelFR : 'Chambre supérieure',
		dirImages : 'deluxeRoom',
		description : '5 standard guestrooms with one double bed.',
		descriptionFR : '5 chambres supérieures à lit double.'
	},
	{
		name : 'queenSuite',
		classImg : 'queenSuite',
		label : 'Standard Guest Room',
		labelFR : 'Suite Queen',
		dirImages : 'queenSuite',
		description : '5 standard guestrooms with one double bed.',
		descriptionFR : '1 Suite queen à grand lit (Queen) et lit double.'
	},
	{
		name : 'suiteFireplace',
		classImg : 'suiteFireplace',
		label : 'Standard Guest Room',
		labelFR : 'Suite avec foyer',
		dirImages : 'suiteFireplace',
		description : '5 standard guestrooms with one double bed.',
		descriptionFR : '1 suite avec foyer, avec lit queen et futon.'
	},
	{
		name : 'familySuite',
		classImg : 'familySuite',
		label : 'Standard Guest Room',
		labelFR : 'Suite familiale avec cuisine',
		dirImages : 'familySuite',
		description : '5 standard guestrooms with one double bed.',
		descriptionFR : '1 suite familiale douillette avec cuisine, lit queen et futon'
	},
	{
		name : 'royalSuite',
		classImg : 'kingSuite',
		label : 'Standard Guest Room',
		labelFR : 'Suite royale',
		starBanner : true,
		dirImages : 'royalSuite',
		description : '5 standard guestrooms with one double bed.',
		descriptionFR : '1 suite royale à très grand lit (King).'
	},
	{
		name : 'royalSuiteKitchen',
		classImg : 'royalSuite',
		label : 'Standard Guest Room',
		labelFR : 'Suite Royale avec cuisine',
		starBanner : true,
		dirImages : 'royalSuiteKitchen',
		description : '5 standard guestrooms with one double bed.',
		descriptionFR : '1 Suite royale avec lit très confortable (Queen) et lit sofa en ahut.'
	}
]


function findRoomTypeInURL() {
	const url  = window.location.href;
	for (const room of ROOMS_DATA) {
		if (url.includes(room.name)) {
			return room.name;
		}
	}
	return null;
}

function loadCarousel() {
    const carouselWrapper= $('.carousel[data-carousel]');
    const matchedRoomType = findRoomTypeInURL() || "standard";

    let carouselHTML = "";
    let dataSlidesHTML = "";


    ROOMS_DATA.forEach(({name, dirImages}, index) => {

        if(name === matchedRoomType) {

            //load HTML for data-slides
            for( let i =1; i <= 5 ; i++) {

                const isActive = i ==1 ? 'data-active' : ''
                dataSlidesHTML += `
                <li class="slide" ${isActive}>
                    <img src="/images/photos2.0/rooms/${dirImages}/carousel/carousel${i}.png" alt="room image #${i}"/>
                </li>
                `
            }

            carouselHTML = `
            <div class="carousel--indicator">
                        <div class="dot" data-active></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                    <ul data-slides>
                        ${dataSlidesHTML}
                    </ul>
                    <div onclick="goBack('chambres')" class="arrowBack">
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
                    </div>
                    <div onclick="expandImages('${name}', '${dirImages}')" class="expandIcon">
                        
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_111_826)">
                            <rect x="10" y="6" width="44" height="44" rx="22" fill="white"/>
                            <g clip-path="url(#clip0_111_826)">
                            <path d="M23.9108 34.9107C23.5854 35.2362 23.5854 35.7638 23.9108 36.0892C24.2363 36.4147 24.7639 36.4147 25.0893 36.0892L23.9108 34.9107ZM40.0893 21.0892C40.4148 20.7638 40.4148 20.2362 40.0893 19.9107C39.7639 19.5853 39.2363 19.5853 38.9108 19.9107L40.0893 21.0892ZM25.0893 19.9107C24.7639 19.5853 24.2363 19.5853 23.9108 19.9107C23.5854 20.2362 23.5854 20.7638 23.9108 21.0892L25.0893 19.9107ZM38.9108 36.0892C39.2363 36.4147 39.7639 36.4147 40.0893 36.0892C40.4148 35.7638 40.4148 35.2362 40.0893 34.9107L38.9108 36.0892ZM22.8334 24.6667C22.8334 25.1269 23.2065 25.5 23.6667 25.5C24.127 25.5 24.5001 25.1269 24.5001 24.6667H22.8334ZM28.6667 20.5C29.127 20.5 29.5001 20.1269 29.5001 19.6667C29.5001 19.2064 29.127 18.8333 28.6667 18.8333V20.5ZM23.8484 20.5767L23.1059 20.1983V20.1983L23.8484 20.5767ZM24.5768 19.8483L24.9551 20.5908L24.9551 20.5908L24.5768 19.8483ZM35.3334 18.8333C34.8732 18.8333 34.5001 19.2064 34.5001 19.6667C34.5001 20.1269 34.8732 20.5 35.3334 20.5V18.8333ZM39.5001 24.6667C39.5001 25.1269 39.8732 25.5 40.3334 25.5C40.7937 25.5 41.1667 25.1269 41.1667 24.6667H39.5001ZM39.4234 19.8483L39.8017 19.1058V19.1058L39.4234 19.8483ZM40.1518 20.5767L40.8943 20.1983L40.8943 20.1983L40.1518 20.5767ZM41.1667 31.3333C41.1667 30.8731 40.7937 30.5 40.3334 30.5C39.8732 30.5 39.5001 30.8731 39.5001 31.3333H41.1667ZM35.3334 35.5C34.8732 35.5 34.5001 35.8731 34.5001 36.3333C34.5001 36.7936 34.8732 37.1667 35.3334 37.1667V35.5ZM40.1518 35.4233L40.8943 35.8016L40.8943 35.8016L40.1518 35.4233ZM39.4234 36.1517L39.0451 35.4092L39.0451 35.4092L39.4234 36.1517ZM28.6667 37.1667C29.127 37.1667 29.5001 36.7936 29.5001 36.3333C29.5001 35.8731 29.127 35.5 28.6667 35.5L28.6667 37.1667ZM26.3334 36.3333L26.3334 35.5H26.3334V36.3333ZM24.5001 31.3333C24.5001 30.8731 24.127 30.5 23.6667 30.5C23.2065 30.5 22.8334 30.8731 22.8334 31.3333H24.5001ZM24.5768 36.1517L24.1984 36.8942L24.1984 36.8942L24.5768 36.1517ZM23.8484 35.4233L23.1059 35.8016H23.1059L23.8484 35.4233ZM25.0893 36.0892L32.5893 28.5892L31.4108 27.4107L23.9108 34.9107L25.0893 36.0892ZM32.5893 28.5892L40.0893 21.0892L38.9108 19.9107L31.4108 27.4107L32.5893 28.5892ZM23.9108 21.0892L31.4108 28.5892L32.5893 27.4107L25.0893 19.9107L23.9108 21.0892ZM31.4108 28.5892L38.9108 36.0892L40.0893 34.9107L32.5893 27.4107L31.4108 28.5892ZM24.5001 24.6667V22.3333H22.8334V24.6667H24.5001ZM26.3334 20.5H28.6667V18.8333H26.3334V20.5ZM24.5001 22.3333C24.5001 21.8529 24.5007 21.5426 24.52 21.3065C24.5385 21.0801 24.5699 20.9962 24.5909 20.955L23.1059 20.1983C22.9452 20.5137 22.8858 20.8413 22.8589 21.1708C22.8328 21.4905 22.8334 21.8804 22.8334 22.3333H24.5001ZM26.3334 18.8333C25.8805 18.8333 25.4906 18.8327 25.1709 18.8588C24.8414 18.8857 24.5138 18.9451 24.1984 19.1058L24.9551 20.5908C24.9963 20.5698 25.0802 20.5384 25.3066 20.5199C25.5427 20.5006 25.853 20.5 26.3334 20.5V18.8333ZM24.5909 20.955C24.6708 20.7982 24.7983 20.6707 24.9551 20.5908L24.1984 19.1058C23.728 19.3455 23.3456 19.7279 23.1059 20.1983L24.5909 20.955ZM35.3334 20.5H37.6667V18.8333H35.3334V20.5ZM39.5001 22.3333V24.6667H41.1667V22.3333H39.5001ZM37.6667 20.5C38.1472 20.5 38.4574 20.5006 38.6936 20.5199C38.9199 20.5384 39.0039 20.5698 39.0451 20.5908L39.8017 19.1058C39.4864 18.9451 39.1587 18.8857 38.8293 18.8588C38.5095 18.8327 38.1197 18.8333 37.6667 18.8333V20.5ZM41.1667 22.3333C41.1667 21.8804 41.1674 21.4905 41.1413 21.1708C41.1144 20.8413 41.0549 20.5137 40.8943 20.1983L39.4093 20.955C39.4302 20.9962 39.4616 21.0801 39.4801 21.3065C39.4994 21.5426 39.5001 21.8529 39.5001 22.3333H41.1667ZM39.0451 20.5908C39.2019 20.6707 39.3294 20.7982 39.4093 20.955L40.8943 20.1983C40.6546 19.7279 40.2721 19.3455 39.8017 19.1058L39.0451 20.5908ZM39.5001 31.3333V33.6667H41.1667V31.3333H39.5001ZM37.6667 35.5H35.3334V37.1667H37.6667V35.5ZM39.5001 33.6667C39.5001 34.1471 39.4994 34.4573 39.4801 34.6935C39.4616 34.9198 39.4302 35.0038 39.4093 35.045L40.8943 35.8016C41.0549 35.4863 41.1144 35.1586 41.1413 34.8292C41.1674 34.5095 41.1667 34.1196 41.1667 33.6667H39.5001ZM37.6667 37.1667C38.1197 37.1667 38.5095 37.1673 38.8293 37.1412C39.1587 37.1143 39.4864 37.0548 39.8017 36.8942L39.0451 35.4092C39.0039 35.4302 38.9199 35.4616 38.6936 35.4801C38.4574 35.4993 38.1472 35.5 37.6667 35.5V37.1667ZM39.4093 35.045C39.3294 35.2018 39.2019 35.3293 39.0451 35.4092L39.8017 36.8942C40.2721 36.6545 40.6546 36.272 40.8943 35.8016L39.4093 35.045ZM28.6667 35.5L26.3334 35.5L26.3334 37.1667L28.6667 37.1667L28.6667 35.5ZM24.5001 33.6667V31.3333H22.8334V33.6667H24.5001ZM26.3334 35.5C25.853 35.5 25.5427 35.4993 25.3066 35.4801C25.0802 35.4616 24.9963 35.4302 24.9551 35.4092L24.1984 36.8942C24.5138 37.0548 24.8414 37.1143 25.1709 37.1412C25.4906 37.1673 25.8805 37.1667 26.3334 37.1667V35.5ZM22.8334 33.6667C22.8334 34.1196 22.8328 34.5095 22.8589 34.8292C22.8858 35.1586 22.9452 35.4863 23.1059 35.8016L24.5909 35.045C24.5699 35.0038 24.5385 34.9198 24.52 34.6935C24.5007 34.4573 24.5001 34.1471 24.5001 33.6667H22.8334ZM24.9551 35.4092C24.7983 35.3293 24.6708 35.2018 24.5909 35.045L23.1059 35.8016C23.3456 36.272 23.728 36.6545 24.1984 36.8942L24.9551 35.4092Z" fill="#2B0000"/>
                            </g>
                            </g>
                            <defs>
                            <filter id="filter0_d_111_826" x="0" y="0" width="64" height="64" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="5"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_111_826"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_111_826" result="shape"/>
                            </filter>
                            <clipPath id="clip0_111_826">
                            <rect width="20" height="20" fill="white" transform="translate(22 18)"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </div>
            `
        }//end if
    })


    carouselWrapper.html(carouselHTML);
}








$(document).ready(function() {

    loadCarousel();

});