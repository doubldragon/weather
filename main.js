//input form
var zipInput = document.getElementById('zipInput');
var weatherButton = document.getElementById('weatherButton');
var output = document.getElementById('output');
var city_name = document.getElementById('city_name');
var temp = document.getElementById('temp');

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
	console.dir(apiRequest);
	if (apiRequest.statusText == 'OK') {
		parseResults();
	} else {
		httpRequestOnError();
	}
   console.log(apiRequest.response);
   console.log(apiRequest.statusText);
}

function httpRequestOnError() {
	$('#error').toggle();
    console.log("did not get weather");
}
function parseResults() {
	
	var results = JSON.parse(apiRequest.response);
	city_name.innerHTML = results.name;
	temp.innerHTML = results.main.temp;

	$('#output').toggle();

	console.log(results.coord.lon);
	console.log('Parsing the api call');
}