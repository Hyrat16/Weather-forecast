import "./App.css";
import { WeatherIcon } from "./components/temperature-icons-wather/Icon";
import { ButtonSearch } from "./components/button-search";
import { CardHours } from "./components/card-Hours";
import { DaysComponent } from "./components/card-Daily";
import { DaisProvider, useCurrent } from "./api-response/weatherapi";
import { AGIProvider } from "./api-response/geoapi";
import { useGeoApi } from "./api-response/geoapi";
import { useRelogio } from "./components/date";
import { useDragScroll } from "./api-response/useDragScrow";

function WeatherContent() {
  const { current } = useCurrent();
  const { name: cityName } = useGeoApi();
  const horaAtual = useRelogio();
  const scrollRef = useDragScroll();

  return (
    <div id="container">
      <div className="glass-panel">
        <div className="temperature-block">
          <div className="temperature-main">
            <h1 className="city-name">{cityName}</h1>
            <p className="temperature-main">{current?.temperature}°C</p>
            <p className="date-hours">{horaAtual}</p>
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

      <div id="divPrincipal2" ref={scrollRef}>
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
    <AGIProvider usarGeolocalizaçao={true} cidadePadrao="São Paulo">
      <DaisProvider>
        <WeatherContent />
      </DaisProvider>
    </AGIProvider>
  );
}

export default App;
