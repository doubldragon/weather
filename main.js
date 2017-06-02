//input form
var zipInput = document.getElementById('zipInput');
var weatherButton = document.getElementById('weatherButton');
var output = document.getElementById('output');
var city_name = document.getElementById('city_name');
var temp = document.getElementById('temp');
var conditions = document.getElementById('conditions');
var icon = document.getElementById('image');
var temp_display = document.getElementById('temp_display');
var celsius = document.getElementById('celsius');
var kelvin = document.getElementById('kelvin');
var results;

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

function catchResponse() { //receives the api request
	$('#output').hide();
	$('#error').hide();
	console.dir(apiRequest);
	if (apiRequest.statusText == 'OK') {
		parseResults();
	} else {
		httpRequestOnError();
	}
}

function httpRequestOnError() {
	$('#error').toggle();
    console.log("did not get weather");
}
function parseResults() {
	
	results = JSON.parse(apiRequest.response);
	var iconUrl = "http://openweathermap.org/img/w/" + results.weather[0].icon + ".png";
	var img = 	document.createElement('img');
	img.src = iconUrl;
	convTemp('fahr')
	city_name.innerHTML = results.name;
	conditions.innerHTML = capital(results.weather[0].description);
	icon.src = iconUrl;
	$('#output').toggle();
}

function convTemp(id){
	var temp = results.main.temp;
	var unit;
	switch (id) {
		case "fahr":
			temp = temp *9/5-459.67;
			unit = "&#176F"
			break;
		case "celsius":
			temp = temp - 273.15;
			unit = "&#176C"
			break;
		case "kelvin":
			unit = "K";
			break;
	}
	temp_display.innerHTML = "" + Math.round(temp) + unit;
}

function capital (string) {
	var array = string.split(" ");
	for (var i=0; i < array.length; i++){
		array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
	}
	return array.join(" ");
}