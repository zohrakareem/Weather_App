
const input = document.querySelector('.input');
const searchbutton = document.getElementById('searchbutton');
const img = document.querySelector('.img');
const temprature = document.querySelector('.temprature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity'); 
const wind = document.getElementById('wind'); 
const location_notfound = document.querySelector('.location-notfound'); 
const weather_body = document.querySelector('.weather-body');

async function checkweather(city) {
    const api_key = "2dc9031ac7cb08022d276d9e60bec47c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(url).then(response => response.json());

    if (weather_data.cod === '404') {
        location_notfound.style.display = "flex";
        weather_body.style.display = "none";
        console.log("City not found");
        return;
    }

    location_notfound.style.display = "none";
    weather_body.style.display = "flex";

    temprature.innerHTML = `${Math.round(weather_data.main.temp- 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind.innerHTML = `${(weather_data.wind.speed * 3.6).toFixed(1)} KM/H`;

    switch (weather_data.weather[0].main) {
        case 'Clouds':
            img.src = "/image/cloud.jpg";
            break;
        case 'Rain':
            img.src = "/image/img3.jpg";
            break;
        case 'Snow':
            img.src = "/image/snow.jpg";
            break;
        case 'Clear Sky':
            img.src = "/image/clear.jpg";
            break;
        case 'Wind':
            img.src = "/image/wind.jpg";
            break;
            default:
                img.src="/image/img1.jpg"
          
    }

    console.log(weather_data);
}

searchbutton.addEventListener('click', () => {
    checkweather(input.value);
});