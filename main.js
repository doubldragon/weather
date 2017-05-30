//input form
var zipInput = document.getElementById('zipInput');
var weatherButton = document.getElementById('weatherButton');
var output = document.getElementById('output');

document.onreadystatchange = function() {
    if (document.readyState == "interactive") {
        weatherButton.onclick = getWeather;
    }
};

function getWeather() {
    var url = "http://api.openweathermap.org/data/2.5/weather?zip=<zipCode>&us&appid=58e92c763df5499a2c9ae20da806e2dc";
    url = url.replace("<zipCode>", zipInput.value);
    console.log(url);
    apiRequest = new XMLHttpRequest();
    apiRequest.onload = catchResponse;
    apiRequest.onerror = httpRequestOnError;
    apiRequest.open('get', url, true);
    apiRequest.send();
}

function catchResponse() {
	 $('#output').hide();
	 $('#error').hide();
	if (apiRequest.statusText == 'OK') {
		parseResults();
	} else {
		httpRequestOnError();
	}
   
    console.log(apiRequest.statusText);
}

function httpRequestOnError() {
	$('#error').toggle();
    console.log("did not get weather");
}
function parseResults() {
	$('#output').toggle();
	console.log('Parsing the api call');
}