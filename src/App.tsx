//import { useState } from 'react'
import "./App.css";
import { main } from "./api-response/emb";
import { WeatherCard } from "./components/temperature-icons-wather/Icon";
import { dates, dateFormat } from "./components/date";

const city = "São Paulo";
//const graus = "25";
//const currentDate = formatISO(new Date());
//const icon = mais.current.weathercode;
const cel = "xww";
const mais = await main();

function App() {
  console.log(mais);
  console.log(dateFormat);
  /* console.log(
    mais.daily.map((x) => {
      return {
        TempMin: x.tempMin,
        TempMax: x.tempMax,
      };
    }),
  ); */
  return (
    <>
      <div id="divPrincipal">
        <div id="divLocalizaçao-Inicial">
          <div id="divPrimariaTemp">
            <h1>{city}</h1>
            <p id="temp">{mais.current.temperature}°C</p>
            <p id="temp2">{dateFormat}</p>
          </div>

          <div id="divPrimariaTemp1">
            <p>{cel}</p>
          </div>

          <div id="divPrimariaTemp2">
            <WeatherCard weathercode={mais.current.weathercode} />
          </div>
        </div>

        <div id="divPrincipal2"></div>

        <div id="divPrincipal3"></div>
      </div>
    </>
  );
}

export default App;
