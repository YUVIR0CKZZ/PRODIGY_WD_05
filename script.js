const apiKey = 'd029574bb56a4a0628a3443f39eea161'; // Replace with your OpenWeatherMap API key

// Fetch weather by city name
function getWeatherByCity() {
    const city = document.getElementById('city').value;
    if (city) {
        fetchWeather(`q=${city}`);
    } else {
        alert('Please enter a city name.');
    }
}

// Fetch weather by geolocation
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeather(`lat=${lat}&lon=${lon}`);
        }, (error) => {
            alert('Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Fetch weather data from the OpenWeatherMap API
function fetchWeather(query) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?${query}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            alert('Failed to fetch weather data. Please try again.');
        });
}

// Display weather information
function displayWeather(data) {
    const cityName = document.getElementById('city-name');
    const temp = document.getElementById('temp');
    const condition = document.getElementById('condition');

    cityName.textContent = data.name;
    temp.textContent = `Temperature: ${data.main.temp}°C`;
    condition.textContent = `Condition: ${data.weather[0].description}`;
}
