//input form
var zipInput = document.getElementById('zipInput');
var weatherButton = document.getElementById('weatherButton');
var output = document.getElementById('output');
var city_name = document.getElementById('city_name');
var temp = document.getElementById('temp');
var conditions = document.getElementById('conditions');
var icon = document.getElementById('image');
var fahr = document.getElementById('fahr');
var celsius = document.getElementById('celsius');
var kelvin = document.getElementById('kelvin');

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
	var iconUrl = "http://openweathermap.org/img/w/" + results.weather[0].icon + ".png";
	var img = 	document.createElement('img');
	img.src = iconUrl;
	fahr.innerHTML = Math.round(results.main.temp*9/5-459.67) + '&#176 F';
	celsius.innerHTML = Math.round(results.main.temp - 273.15) + '&#176 C';
	kelvin.innerHTML = Math.round(results.main.temp) + 'K';
	city_name.innerHTML = '<p>' + results.name + '</p>';
	conditions.innerHTML = '<p>' + results.weather[0].description + '</p>';
	icon.innerHTML = '<p>' + $(".image").html(img) +'</p>';
	$('#output').toggle();
}