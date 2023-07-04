/* GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city */

let apiKey = '8306c65c15f82d24a8451b12f1c7dfee';
let today = moment().format('L');
let searchHistory = [];

function currentConditions(city) {
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${apiKey}`

    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function (cityWeatherResponse) {
        let cityName = currentWeatherResponse.name;
        let temperature = currentWeatherResponse.main.temp;
        let humidity = currentWeatherResponse.main.humidity;
        let windSpeed = currentWeatherResponse.main.wind.speed;
        let iconCode = currentWeatherResponse.weather[0].icon;

        $('#currentCityName').text(cityName + ' (' + today + ')');
        $('#day0-date').text(today);
        $('#day0-icon').attr('src', `http://openweathermap.org/img/w/${iconCode}.png`);
        $('#day0-temp').text('Temperature: ' + temperature + ' °C');
        $('#day0-hum').text('Humidity: ' + humidity + '%');
        $('#day0-wind').text('Wind Speed: ' + windSpeed + ' m/s');

        saveToSearchHistory(city);
        displaySearchHistory();

        getForecast(city);
    }).catch(function (error) {
        console.log('Error fetching current weather:', error);
    });
}

function getForecast(city) {
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function (forecastResponse) {
        let forecastData = forecastResponse.list

        for (let i = 0; i < forecastData.length; i += 8) {
            let forecastData = moment(forecastData[i].dt_txt).format('L');
            let forecastIcon = forecastData[i].weather[0].icon;
            let forecastTemperature = forecastData[i].main.temp;
            let forecastHumidity = forecastData[i].main.humidity;

            $(`#day${i / 8 + 1}-date`).text(forecastDate);
        $(`#day${i / 8 + 1}-icon`).attr('src', `http://openweathermap.org/img/w/${forecastIcon}.png`);
        $(`#day${i / 8 + 1}-temp`).text('Temperature: ' + forecastTemperature + ' °C');
        $(`#day${i / 8 + 1}-hum`).text('Humidity: ' + forecastHumidity + '%');
      }
    }).catch(function (error) {
      console.log('Error fetching forecast:', error);
    });
  }
    

currentConditions()