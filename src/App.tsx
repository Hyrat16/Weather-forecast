//import { useState } from 'react'
import "./App.css";
import { main } from "./api-response/emb";
import { WeatherCard } from "./components/temperature-icons-wather/Icon";
import { dateFormat } from "./components/date";
import { ButtonSearch } from "./components/button-search";
import { CardHours } from "./components/cardHours";

const city = "São Paulo";
const mais = await main();

function App() {
  //console.log(mais.hourly);
  return (
    <>
      <div id="divPrincipal">
        <div id="divLocalizaçao-Inicial">
          <div id="divPrimariaTemp">
            <h1>{city}</h1>
            <p id="temp">{mais.current.temperature}°C</p>
            <p id="temp2">{dateFormat}</p>
          </div>

          <div id="divPrimariaTemp1">{ButtonSearch()}</div>

          <div id="divPrimariaTemp2">
            <WeatherCard weathercode={mais.current.weathercode} />
          </div>
        </div>

        <div id="divPrincipal2">
          <CardHours />
        </div>

        <div id="divPrincipal3"></div>
      </div>
    </>
  );
}

export default App;
