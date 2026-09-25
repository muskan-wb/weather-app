const WEATHER_API = "/api/weather";
const params = new URLSearchParams(window.location.search);
const city = params.get("city");
let cityName = document.querySelector("#city-name");
let weatherTime = document.querySelector(".weather-time");
let temperature = document.querySelector(".temperature");
let weatherCondition = document.querySelector(".weather-condition");
let tempSrc = document.querySelector(".temp-img");
let airQualityValue = document.querySelector("#air-quality-value");
let windValue = document.querySelector("#wind-value");
let humidityValue = document.querySelector("#humidity-value");
let feelsLikeValue = document.querySelector("#feels-like-value");
let visibilityValue = document.querySelector("#visibility-value");
let uvValue = document.querySelector("#uv-value");
let pressureValue = document.querySelector("#pressure-value");
let dewpointValue = document.querySelector("#dewpoint-value");
let URL = `/api/weather?city=${encodeURIComponent(city)}&type=current`;


fetch(URL)
.then ((Response)=>Response.json())
.then((data)=>{
 cityName.innerText = `${data.location.name},${data.location.region} , ${data.location.country}`;
 weatherTime.innerText = `${data.location.localtime}`;
temperature.innerHTML = `${data.current.temp_c}<sup>°C</sup>`;
tempSrc.src = "https:" +data.current.condition.icon;
tempSrc.style.display = "block"
weatherCondition.innerText = `${data.current.condition.text}`;
airQualityValue.innerText = `${data.current.air_quality["us-epa-index"]}`;
windValue.innerHTML = `${data.current.wind_kph}km/h`;
humidityValue.innerHTML = `${data.current.humidity}%`;
feelsLikeValue.innerHTML = `${data.current.feelslike_c}°C`;
visibilityValue.innerHTML = `${data.current.vis_km}km`;
uvValue.innerText = `${data.current.uv}`;
pressureValue.innerHTML = `${data.current.pressure_mb}mb`;
dewpointValue.innerHTML = `${data.current.dewpoint_c}°C`
});