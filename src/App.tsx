//import { useState } from 'react'
import "./App.css";
import { WeatherIcon } from "./components/temperature-icons-wather/Icon";
import { dates } from "./components/date";
import { ButtonSearch } from "./components/button-search";
import { CardHours } from "./components/card-Hours";
import { mai } from "./api-response/emb";
import { Daily } from "./components/card-Daily";

const city = "São Paulo";

function App() {
  //console.log(mai);

  return (
    <>
      <div id="container">
        <div className="glass-panel">
          <div className="temperature-block">
            <div className="temperature-main">
              <h1 className="city-name">{city}</h1>
              <p className="temperature-main">{mai.current.temperature}°C</p>
              <p className="date-hours">{dates}</p>
            </div>

            <div className="icon">
              <div className="inner-circle-icon">
                <WeatherIcon
                  codeNumber={mai.current.weathercode}
                  size="g"
                  color="white"
                />
              </div>
            </div>
          </div>

          <div id="divPrimariaTemp1">{ButtonSearch()}</div>
        </div>

        <div id="divPrincipal2">
          <CardHours />
        </div>

        <div id="divPrincipal3">
          <Daily />
        </div>
      </div>
    </>
  );
}

export default App;
