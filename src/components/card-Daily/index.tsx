import { isAfter, startOfDay, format, set } from "date-fns";
import { ptBR } from "date-fns/locale";
import { WeatherIcon } from "../temperature-icons-wather/Icon";
import { useDaily } from "../../api-response/emb";
import "./index.css";

const daily = useDaily();

const days = daily.daily.map((item) => item);

const diasPosteriores = days.filter((item) =>
  isAfter(new Date(item.time), startOfDay(new Date())),
);

const linha1 = diasPosteriores.slice(0, 5);
const linha2 = diasPosteriores.slice(5, 10);

export const Daily = () => {
  return diasPosteriores.map((item, index) => (
    <div id="text" key={index}>
      <div id="TextSe">
        <p>{item.time}</p>
      </div>
      <WeatherIcon codeNumber={item.weathercode} size="p" color="red" />
      <div id="render">
        <p>Min: {item.tempMin}</p>
        <p>Max: {item.tempMax}</p>
        <p>Chance de chuva: {item.precipitationMax}%</p>
      </div>
    </div>
  ));
};
