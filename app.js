const WEATHER_API = "/api/weather";
let searchCity = document.querySelector(".search-city");
let searchIcon = document.querySelector("#search-icon");
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
let cityCard = document.querySelectorAll(".city-card");
let tab = document.querySelectorAll(".tab");
let content = document.querySelectorAll(".content");
let contents = document.querySelector(".tab-content");
let overView = document.querySelector("#overview");
let forecastContainer = document.querySelector(".forecast-container");
let precipitationContainer = document.querySelector(".precipitation-container");
let windContainer = document.querySelector(".wind-container");
let airQualityContainer = document.querySelector(".air-container");
let humidityContainer = document.querySelector(".humidity-container");
let cloudContainer = document.querySelector(".cloud-container");
let sideBar = document.querySelector(".side-bar");
let menuButton =document.querySelector(".menu-button");
let menuItems = document.querySelectorAll(".menu-item[data-page]");

async function searchWeather() {
    let city = searchCity.value
    if (city == "") {
        alert("Please enter a city.");
        return;
    }
    let URL = `/api/weather?city=${encodeURIComponent(city)}&type=current`;
    let response = await fetch(URL);
    let data = await response.json();
    cityName.innerText = `${data.location.name} , ${data.location.region} , ${data.location.country}`;
    weatherTime.innerText = `${data.location.localtime}`;
    temperature.innerHTML = `${data.current.temp_c}<sup>°C</sup>`;
    tempSrc.src = "https:" + data.current.condition.icon;
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
await forecastWeather();

}
searchIcon.addEventListener("click", async() => {
    await searchWeather(); 

})
searchCity.addEventListener("keydown", async function (evnt) {
    if (evnt.key === "Enter") {
       await searchWeather();
       
    }


});
cityCard.forEach((card) => {
    card.addEventListener("click", (evnt) => {
        let city = card.dataset.city;
        window.location.href = `weather.html?city=${city}`;

    })
});

async function updateCityCard() {
    cityCard.forEach(async(card)=>{
        let city = card.dataset.city;
        let URL = `/api/weather?city=${encodeURIComponent(city)}&type=current`;
        let response = await fetch(URL);
        let data = await response.json();

        card.innerHTML = ` <span>${data.location.name}</span>
            <img src="https:${data.current.condition.icon}">
            <span>${Math.round(data.current.temp_c)}°</span>`;
    });
};

tab.forEach((button) => {
    overView.classList.add("active-content");
    button.addEventListener("click", () => {
        tab.forEach((btn) => {
            btn.classList.remove("active");
        });
        content.forEach((box) => {
            box.classList.remove("active-content");
        });
        button.classList.add("active");
        const target = button.dataset.target;
        document.getElementById(target).classList.add("active-content");
    });
    
});
function getDayName(itemDate) {
    let today = new Date();
    let forecastDate = new Date(itemDate);

    if (forecastDate.toDateString() === today.toDateString()) {
        return "Today";
    } else {
        return forecastDate.toLocaleDateString("en-US", {
            weekday: "long"
        });
    }
}


async function forecastWeather() {

   let city = searchCity.value;

let URL = `/api/weather?city=${encodeURIComponent(city)}&type=forecast`;
    let response = await fetch(URL);
    let data = await response.json();

    forecastContainer.innerHTML = "";
    precipitationContainer.innerHTML = "";
    windContainer.innerHTML = "";
    airQualityContainer.innerHTML = "";
    humidityContainer.innerHTML = "";
    cloudContainer.innerHTML ="";
    console.log(URL)
    let maxWind = Math.max(
        ...data.forecast.forecastday.map(item => item.day.maxwind_kph)
    );

    data.forecast.forecastday.forEach((item) => {

        // OVERVIEW
        let overviewBox = document.createElement("div");
        overviewBox.classList.add("Box");

        let date = document.createElement("div");
        date.classList.add("date");
        date.innerText = item.date;

        let day = document.createElement("div");
        day.classList.add("day");
        day.innerText = getDayName(item.date);
        getDayName(item.date)

        let icon = document.createElement("img");
        icon.classList.add("temp-icon");
        icon.src = "https:" + item.day.condition.icon;

        let temp = document.createElement("div");
        temp.classList.add("temp");
        temp.innerText = item.day.maxtemp_c + "°";

        let tempTxt = document.createElement("div");
        tempTxt.classList.add("temp-txt");
        tempTxt.innerText = item.day.condition.text;


        overviewBox.appendChild(date);
        overviewBox.appendChild(day);
        overviewBox.appendChild(icon);
        overviewBox.appendChild(temp);
        overviewBox.appendChild(tempTxt);

        forecastContainer.appendChild(overviewBox);

        // PRECIPITATION


        let precipitationBox = document.createElement("div");
        precipitationBox.classList.add("Box");

        let precipitationDate = document.createElement("div");
        precipitationDate.classList.add("date");
        precipitationDate.innerText = item.date;

        let precipitationDay = document.createElement("div");
        precipitationDay.classList.add("day");
        precipitationDay.innerText = getDayName(item.date);


        // precipitation value
        let precipitation = document.createElement("div");
        precipitation.classList.add("precipitation");
        let precipitationValue = item.day.totalprecip_mm / 10;
        precipitation.innerText = precipitationValue.toFixed(2) + " cm";

        let precipitationBar = document.createElement("div");
        precipitationBar.classList.add("bar");
        let precipitationFill = document.createElement("div");
        precipitationFill.classList.add("fill");
        let fillHeight = Math.min((precipitationValue / 3) * 100, 100);
        precipitationFill.style.height = fillHeight + "%";

        let precipitationRainChance = document.createElement("div");
        precipitationRainChance.classList.add("rain-chance");
        precipitationRainChance.innerHTML = `<i class="fa-solid fa-droplet"></i>${item.day.daily_chance_of_rain}%`;



        precipitationBar.appendChild(precipitationFill);

        precipitationBox.appendChild(precipitationDate);
        precipitationBox.appendChild(precipitationDay);
        precipitationBox.appendChild(precipitation);
        precipitationBox.appendChild(precipitationBar);
        precipitationBox.appendChild(precipitationRainChance);
        precipitationContainer.appendChild(precipitationBox);

        // Wind


        let windBox = document.createElement("div");
        windBox.classList.add("Box");
        let windDate = document.createElement("div");
        windDate.classList.add("date");
        windDate.innerText = item.date;
        let windDay = document.createElement("div");
        windDay.classList.add("day");
        windDay.innerText = getDayName(item.date);
        let wind = document.createElement("div");
        wind.classList.add("wind");
        wind.innerText = item.day.maxwind_kph + "km/h";
        let windBar = document.createElement("div");
        windBar.classList.add("bar");
        let windFill = document.createElement("div");
        windFill.classList.add("fill");
        let fillWindHeight =
            (item.day.maxwind_kph / maxWind) * 100;
        windFill.style.height = fillWindHeight + "%";

        let gusts = document.createElement("div");
        gusts.classList.add("gusts");
        item.hour.forEach((hour) => {
            gusts.innerText = "Gusts : " + hour.gust_kph + "km/h";
        });

        windBox.appendChild(gusts);
        windBar.appendChild(windFill);
        windBox.appendChild(windBar);
        windBox.appendChild(wind);
        windBox.appendChild(windDay);
        windBox.appendChild(windDate);
        windContainer.appendChild(windBox);

        // air quality
        let airBox = document.createElement("div");
airBox.classList.add("Box");

let airQualityDate = document.createElement("div");
airQualityDate.classList.add("date");
airQualityDate.innerText = item.date;

let airQualityDay = document.createElement("div");
airQualityDay.classList.add("day");
airQualityDay.innerText = getDayName(item.date);


// Bar
let airBar = document.createElement("div");
airBar.classList.add("bar");

let airFill = document.createElement("div");
airFill.classList.add("fill");



let air = document.createElement("div");
air.classList.add("air");

let aqiText = document.createElement("div");
aqiText.classList.add("aqi-text");


if (item.air_quality) {

    let aqi = item.air_quality["us-epa-index"];

    let fillAirHeight = (aqi / 6) * 100;
    airFill.style.height = fillAirHeight + "%";

    air.innerText = aqi;

    if (aqi === 1) {
        aqiText.innerText = "Good";
    } else if (aqi === 2) {
        aqiText.innerText = "Moderate";
    } else {
        aqiText.innerText = "Unhealthy";
    }

} else {

    air.innerText = "N/A";
    aqiText.innerText = "N/A";
    airFill.style.height = "0%";

}


airBar.appendChild(airFill);
airBox.appendChild(airBar);
airBox.appendChild(aqiText);
airBox.appendChild(air);
airBox.appendChild(airQualityDay);
airBox.appendChild(airQualityDate);
airQualityContainer.appendChild(airBox);

// Humidity
let humidityBox = document.createElement("div");
humidityBox.classList.add("Box");

let humidityDate = document.createElement("div");
humidityDate.classList.add("date");
humidityDate.innerText = item.date;

let humidityDay = document.createElement("div");
humidityDay.classList.add("day");
humidityDay.innerText = getDayName(item.date);

let humidity = document.createElement("div");
 humidity.classList.add("humidity");
 
let humidityValue = item.hour.map(hour =>hour.humidity);
let humidityMaxValue = Math.max(...humidityValue);
let humidityMinValue = Math.min(...humidityValue)
 humidity.innerHTML = `${humidityMaxValue}%<br>${humidityMinValue}%`;

 let humidityBar = document.createElement("div");
humidityBar.classList.add("bar");

let humidityFill = document.createElement("div");

humidityFill.classList.add("fill");

humidityFill.style.height = humidityMaxValue + "%";


humidityBar.appendChild(humidityFill);
humidityBox.appendChild(humidityBar);
humidityBox.appendChild(humidity);
humidityBox.appendChild(humidityDay);
humidityBox.appendChild(humidityDate);
humidityContainer.appendChild(humidityBox);

// Cloud Cover
let cloudBox = document.createElement("div");
cloudBox.classList.add("Box");
let cloudDate = document.createElement("div");
cloudDate.classList.add("date");
cloudDate.innerText = item.date;
let cloudDay = document.createElement("div");
cloudDay.classList.add("day");
cloudDay.innerText = getDayName(item.date);
let cloud = document.createElement("div");
cloud.classList.add("cloud");
let cloudValue = item.hour.map(hour=>hour.cloud)
   .filter(value => value > 0);
let maxCloudValue = Math.max(...cloudValue);
let minCloudValue = Math.min(...cloudValue);
cloud.innerHTML = `${maxCloudValue}%<br>${minCloudValue}%`;
let cloudBar = document.createElement("div");
cloudBar.classList.add("bar");

let cloudFill = document.createElement("div");

cloudFill.classList.add("fill");

cloudFill.style.height = maxCloudValue + "%";

cloudBox.appendChild(cloudBar);
cloudBar.appendChild(cloudFill);
cloudBox.appendChild(cloud);
cloudBox.appendChild(cloudDay);
cloudBox.appendChild(cloudDate);
cloudContainer.appendChild(cloudBox);
    });
}
menuButton.addEventListener("click" , ()=>{
    sideBar.classList.toggle("open");
});
menuItems.forEach((item) => {
    item.addEventListener("click", () => {
         console.log("clicked:", item.dataset.page);
        let page = item.dataset.page;
        window.location.href = page;
    });
   
});
updateCityCard()
searchCity.value = "New Delhi";
searchWeather();

