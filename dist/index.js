"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const apiKey = "bc86a50f4cc66c9276aea2f9b4b6ffa8";
// Sélection des éléments du DOM
const searchBtn = document.getElementById("search");
const cityInput = document.getElementById("city");
const resultDiv = document.getElementById("result");
function showLoading() {
    resultDiv.innerHTML = "<p> Chargement...</p>";
}
function showError(msg) {
    resultDiv.innerHTML = `<p style="color:red;">${msg}</p>`;
}
function render(data) {
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
function getWeather(city) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            showLoading();
            const res = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`);
            if (!res.ok)
                throw new Error("Ville introuvable !");
            const data = yield res.json();
            render(data);
        }
        catch (err) {
            showError(err.message);
        }
    });
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
