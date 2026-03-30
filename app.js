const API_KEY = "2b7f75fcedf068d4b08fb57d11d7d3c5";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// DOM Elements
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherDisplay = document.getElementById("weather-display");

// Elements
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");

async function getWeather(city) {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        showLoading();
        hideError();

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found");
            }
            throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        displayWeather(data);
        saveToHistory(city);

    } catch (err) {
        if (err.name === "TypeError") {
            showError("Network error. Check your connection.");
        } else {
            showError(err.message);
        }
    } finally {
        hideLoading();
    }
}

function displayWeather(data) {
    hideError();

    cityName.textContent = `${data.name}, ${data.sys.country}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    temperature.textContent = `${data.main.temp}°C`;
    description.textContent = data.weather[0].description;

    feelsLike.textContent = `${data.main.feels_like}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} m/s`;
    pressure.textContent = `${data.main.pressure} hPa`;

    weatherDisplay.classList.remove("hidden");
    if (data.weather[0].main === "Rain") {
  document.body.style.background = "linear-gradient(135deg, #667db6, #0082c8)";
    createRain();
    } else if (data.weather[0].main === "Snow") {
    document.body.style.background = "linear-gradient(135deg, #83a4d4, #b6fbff)";
    createSnow();
    if (weatherMain === "Clear") {
    document.body.style.background = "linear-gradient(135deg, #fceabb, #f8b500)";
}
    } else {
    document.body.style.background = "linear-gradient(135deg, #f6d365, #fda085)";
    clearEffects();
}
cityName.textContent = `${data.name}, ${data.sys.country}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    temperature.textContent = `${data.main.temp}°C`;
    description.textContent = data.weather[0].description;

    feelsLike.textContent = `${data.main.feels_like}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} m/s`;
    pressure.textContent = `${data.main.pressure} hPa`;

    weatherDisplay.classList.remove("hidden");

}

function showLoading() {
    loading.classList.remove("hidden");
    weatherDisplay.classList.add("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    error.textContent = message;
    error.classList.remove("hidden");
    weatherDisplay.classList.add("hidden");
}

function hideError() {
    error.classList.add("hidden");
}

function saveToHistory(city) {
    let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

    history = history.filter(c => c.toLowerCase() !== city.toLowerCase());
    history.unshift(city);

    if (history.length > 5) history.pop();

    localStorage.setItem("weatherHistory", JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    const list = document.getElementById("search-history");
    const history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

    list.innerHTML = history.map(city => 
        `<li data-city="${city}">${city}</li>`
    ).join("");
}

// Attach ONCE
document.getElementById("search-history").addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        getWeather(e.target.dataset.city);
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();

    if (city) {
        getWeather(city);
        cityInput.value = "";
    }
});

window.addEventListener("DOMContentLoaded", () => {
    weatherDisplay.classList.add("hidden");
    loadHistory();
});
const effectsContainer = document.getElementById("weather-effects");

function clearEffects() {
    effectsContainer.innerHTML = "";
}

function createRain() {
    clearEffects();

    for (let i = 0; i < 100; i++) {
        const drop = document.createElement("div");
        drop.classList.add("rain-drop");

        drop.style.left = Math.random() * 100 + "vw";
        drop.style.animationDuration = (0.5 + Math.random() * 0.5) + "s";
        drop.style.opacity = Math.random();

        effectsContainer.appendChild(drop);
    }
}

function createSnow() {
    clearEffects();

    for (let i = 0; i < 60; i++) {
        const flake = document.createElement("div");
        flake.classList.add("snowflake");

        flake.style.left = Math.random() * 100 + "vw";
        flake.style.animationDuration = (3 + Math.random() * 3) + "s";
        flake.style.opacity = Math.random();

        effectsContainer.appendChild(flake);
    }
}