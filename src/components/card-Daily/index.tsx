import { isAfter, startOfDay, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { WeatherIcon } from "../temperature-icons-wather/Icon";
import { useDaily } from "../../api-response/emb";
import "./index.css";

export const DaysComponent = () => {
  const use = useDaily();

  const days = use.daily.map((item) => item);

  const diasPosteriores = days.filter((item) =>
    isAfter(new Date(item.time), startOfDay(new Date())),
  );

  const linha1 = diasPosteriores.slice(0, 5);
  const linha2 = diasPosteriores.slice(5, 10);

  return (
    <div id="daily-wrap">
      <div id="daily-row">
        {linha1.map((item, index) => (
          <div key={index} id="comp">
            <div id="icon">
              {format(new Date(item.time), "eeeeee", {
                locale: ptBR,
              })}

              <WeatherIcon
                codeNumber={item.weathercode}
                size="p"
                color="white"
              />
            </div>

            <div id="temp">
              <span>{item.tempMax}º</span> {item.tempMin}º
            </div>

            <div id="weather">{item.precipitationMax}%</div>
          </div>
        ))}
      </div>

      <div id="daily-row">
        {linha2.map((item, index) => (
          <div key={index} id="comp">
            <div id="icon">
              {format(new Date(item.time), "eeeeee", {
                locale: ptBR,
              })}

              <WeatherIcon
                codeNumber={item.weathercode}
                size="p"
                color="white"
              />
            </div>

            <div id="temp">
              <span>{item.tempMax}º</span> {item.tempMin}º
            </div>

            <div id="weather">{item.precipitationMax}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};
