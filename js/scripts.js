
var x = document.getElementById("alarm-player");

$('#notify-btn-start').click(function () {
	if (typeof (Storage) !== "undefined") {
		localStorage.setItem("workTime", 1);
		localStorage.setItem("type", "coding-start");
		if (localStorage.getItem("type") === "coding-start") {
			if (isExists('#normal-countdown')) {
				var date = moment().add(localStorage.getItem('workTime'), 'minutes').format('l LTS');

				$('#normal-countdown').show();
				$('#notify-btn-start').hide();
				$('#notify-btn-reset').show();

				$('#normal-countdown').countdown(date, function (event) {
					var $this = $(this).html(event.strftime('' +
						'<div class="time-sec"><h3 class="main-time">%M</h3> <span>Mins</span></div>' +
						'<div class="time-sec"><h3 class="main-time">%S</h3> <span>Sec</span></div>'));
				}).on('finish.countdown', function () {
					breakTime();
					
				});
			}
		} else {

		}
	} else {
		// Sorry! No Web Storage support..
	}
});

function breakTime(){
	$(window).focus();
	$('#normal-countdown').countdown('stop');
	$('#normal-countdown').hide();
	$('#notify-btn-start').show();
	$('#notify-btn-reset').hide();
	playAudio();
}

function playAudio() {
	document.getElementById('alarm-player').play();
}

function isExists(elem) {
	if ($(elem).length > 0) {
		return true;
	}
	return false;
}

$('#notify-btn-reset').click(function () {
	$('#normal-countdown').countdown('stop');
	$('#normal-countdown').hide();
	$('#notify-btn-start').show();
	$('#notify-btn-reset').hide();
});

$('#notify-btn-play').click(() => {
	document.getElementById('alarm-player').play();
});