const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weatherIcon = document.getElementById("weatherIcon");

const apiKey = "914314bc3f66a5a7ab10f4f36a602412";

searchBtn.addEventListener("click", () => {
    const city = searchInput.value;

    if (city.trim() === "") {
        alert("Please enter a city name");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`).then((response) => {
        response.json().then((data) => {

            if (data.cod == "404") {
                alert("City not found!");
                document.getElementById("weatherInfo").classList.add("hidden");
                return;
            }

            document.getElementById("weatherInfo").classList.remove("hidden");

            cityName.innerHTML = data.name;
            temperature.innerHTML = `${Math.round(data.main.temp)}°C`
            condition.innerHTML = data.weather[0].main;
            humidity.innerText = `${data.main.humidity}%`;
            windSpeed.innerText = `${data.wind.speed} km/h`;
            const iconCode = data.weather[0].icon;
            weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        })
    })
})