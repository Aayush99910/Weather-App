import './assests/styles/main.css';



let useDefault = true;
const button = document.querySelector('button');



const renderWeather= (city, country, weather, temp, humidity, wind) => {
  const div = document.querySelector('.weather-container');
  const cityPara = document.querySelector('#city');
  const countryPara = document.querySelector('#country');
  const temperaturePara = document.querySelector('.temperature');
  const detailPara = document.querySelector('#detail');
  const humidityPara = document.querySelector('#humidity');
  const windPara = document.querySelector('#wind');

  cityPara.textContent = city;
  countryPara.textContent = country;
  temperaturePara.textContent = `${temp}`;
  detailPara.textContent = `${weather}`;
  humidityPara.textContent = `Humidity: ${humidity}`;
  windPara.textContent = `Wind Speed: ${wind}kmph`;

  
  if (div.classList.contains('fade-in2')) {
    div.classList.remove('fade-in2');
    div.offsetWidth;
    div.classList.add('fade-in2');
  } else {
    div.classList.add('fade-in2');
  }
};


const renderError = () => {
  const cityPara = document.querySelector('#city');

  cityPara.textContent = "There was an error. Please try again later."
}


async function getWeather(defaultValue) {
  try {
    const input = document.querySelector('input');
    const userInputCity = input.value;
    let response;

    if (defaultValue && useDefault === true) {
      useDefault = false;
      response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=${defaultValue}`, { mode: 'cors'});
    }else {
      if (userInputCity.length === 0) {
        alert('Please provide a city.');
        return;
      }
      response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=${userInputCity}`, { mode: 'cors'});
    }

    const responseJson = await response.json();
    const city = responseJson.location.name;
    const country = responseJson.location.country;
    const currentWeather = responseJson.current.condition.text;
    const currentTemperature = responseJson.current.temp_c;
    const humidity = responseJson.current.humidity;
    const windKmph = responseJson.current.wind_kph;

    renderWeather(city, country, currentWeather, currentTemperature, humidity, windKmph);
    input.value = '';
  } catch {
    renderError();
  }

}



window.onload = function Default() {
  getWeather('Kathmandu');
};



button.addEventListener('click', getWeather);


const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  getWeather();
})