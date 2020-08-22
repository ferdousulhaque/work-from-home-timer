
var x = document.getElementById("alarm-player");
var slideIndex = 1;

$('#notify-btn-start').click(function () {
	if (isExists('#normal-countdown')) {
		var date = moment().add(20, 'minutes').format('l LTS');

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

$(document).ready(function () {
	$.ajax({
		url: 'https://cors-anywhere.herokuapp.com/' + 'https://www.bodybuilding.com/rss/articles/training',
		type: 'GET',
		dataType: "xml"
	}).done(function (xml) {
		$.each($("item", xml), function (i, e) {
			var itemURL = ($(e).find("link"));
			var itemTitle = ($(e).find("title"));

			var blogTitle = '<div class="mySlides">' + itemTitle.text() + '<a target="_blank" href="' + itemURL.text()+'"><p class="author">' + itemURL.text() + "</p></a></div>";

			$("#feed").append(blogTitle);
		});
		showSlides(slideIndex);
	});
});

function plusSlides(n) {
	showSlides(slideIndex += n);
}

function currentSlide(n) {
	showSlides(slideIndex = n);
}

function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	var dots = document.getElementsByClassName("dot");
	if (n > slides.length) { slideIndex = 1 }
	if (n < 1) { slideIndex = slides.length }
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex - 1].style.display = "block";
	dots[slideIndex - 1].className += " active";
}