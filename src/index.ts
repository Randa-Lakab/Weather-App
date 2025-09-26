const apiKey: string = "bc86a50f4cc66c9276aea2f9b4b6ffa8";

interface WeatherAPIResponse {
  name: string;
  sys: { country: string };
  main: { temp: number; humidity: number };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
}

// Sélection des éléments du DOM
const searchBtn = document.getElementById("search") as HTMLButtonElement;
const cityInput = document.getElementById("city") as HTMLInputElement;
const resultDiv = document.getElementById("result") as HTMLDivElement;

function showLoading() {
  resultDiv.innerHTML = "<p> Chargement...</p>";
}

function showError(msg: string) {
  resultDiv.innerHTML = `<p style="color:red;">${msg}</p>`;
}

function render(data: WeatherAPIResponse) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  resultDiv.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <div style="display:flex;align-items:center;gap:12px">
      <img src="${iconUrl}" alt="${data.weather[0].description}" />
      <div>
        <p>🌡 Température: <strong>${Math.round(data.main.temp)}°C</strong></p>
        <p>☁ ${data.weather[0].description}</p>
        <p>💧 Humidité: ${data.main.humidity}%</p>
        <p>💨 Vent: ${data.wind.speed} m/s</p>
      </div>
    </div>
  `;
}

async function getWeather(city: string) {
  try {
    showLoading();

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`
    );

    if (!res.ok) throw new Error("Ville introuvable !");

    const data: WeatherAPIResponse = await res.json();
    render(data);
  } catch (err: any) {
    showError(err.message);
  }
}

//  Attacher l'événement au bouton
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    showError(" Veuillez entrer une ville !");
    return;
  }
  getWeather(city);
});

