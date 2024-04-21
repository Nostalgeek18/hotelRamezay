
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
        console.log('click')
        expandImages('desktop')
    })
}

function toggleRoomWrapper() {
	$('.global--wrapper').removeClass('active');
	$('#container').show();
}



$(document).ready(function() {

    attachEventsImg();

});
