//import { useState } from 'react'
import "./App.css";
import { WeatherIcon } from "./components/temperature-icons-wather/Icon";
import { dates } from "./components/date";
import { ButtonSearch } from "./components/button-search";
import { CardHours } from "./components/card-Hours";
import { DaysComponent } from "./components/card-Daily";
import { DaisProvider, useHourly, useCurrent } from "./api-response/emb";

const city = "São Paulo";

function WeatherContent() {
  const { current } = useCurrent();

  return (
    <div id="container">
      <div className="glass-panel">
        <div className="temperature-block">
          <div className="temperature-main">
            <h1 className="city-name">{city}</h1>
            <p className="temperature-main">{current?.temperature}°C</p>
            <p className="date-hours">{dates}</p>
          </div>

          <div className="icon">
            <div className="inner-circle-icon">
              <WeatherIcon
                codeNumber={current?.weathercode!}
                size="g"
                color="blue"
              />
            </div>
          </div>
        </div>

        <div id="divPrimariaTemp1">
          <ButtonSearch />
        </div>
      </div>

      <div id="divPrincipal2">
        <CardHours />
      </div>

      <div id="divPrincipal3">
        <DaysComponent />
      </div>
    </div>
  );
}

function App() {
  return (
    <DaisProvider>
      <WeatherContent />
    </DaisProvider>
  );
}

export default App;
