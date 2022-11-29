import './assests/styles/main.css';



let useDefault = true;
const button = document.querySelector('button');



const renderWeather= (city, country, weather, temp, humidity, wind) => {
  const cityPara = document.querySelector('#city');
  const countryPara = document.querySelector('#country');
  const temperaturePara = document.querySelector('.temperature');
  const humidityPara = document.querySelector('#humidity');
  const windPara = document.querySelector('#wind');

  cityPara.textContent = city;
  countryPara.textContent = country;
  temperaturePara.textContent = `${temp}°C`;
  humidityPara.textContent = `Humidity: ${humidity}%`;
  windPara.textContent = `Wind Speed: ${wind} kmph`;
};



async function getWeather(defaultValue) {
  const input = document.querySelector('input');
  const userInputCity = input.value;
  let response;

  if (defaultValue && useDefault === true) {
    useDefault = false;
    response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=${defaultValue}`, { mode: 'cors'});
  }else {
    if (userInputCity.length === 0) {
      alert('Please provide a city.');
      return;
    }
    response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=${userInputCity}`, { mode: 'cors'});
  }

  const responseJson = await response.json();
  print(responseJson);
  const city = responseJson.location.name;
  const country = responseJson.location.country;
  const currentWeather = responseJson.current.condition.text;
  const currentTemperature = responseJson.current.temp_c;
  const humidity = responseJson.current.humidity;
  const windKmph = responseJson.current.wind_kph;

  renderWeather(city, country, currentWeather, currentTemperature, humidity, windKmph);
}



window.onload = function Default() {
  getWeather('Kathmandu');
};



button.addEventListener('click', getWeather);
