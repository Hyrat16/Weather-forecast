import { mai } from "../../api-response/emb";
import { isAfter, startOfDay, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { WeatherIcon } from "../temperature-icons-wather/Icon";
import "./index.css";

const diasPosteriores = mai.daily.filter((item) =>
  isAfter(new Date(item.time), startOfDay(new Date())),
);

const fort = (item: any) => {
  return format(new Date(item), "iiiiii", {
    locale: ptBR,
  });
};

export const Daily = () => {
  return diasPosteriores.map((item, index) => (
    <div id="text" key={index}>
      <div id="TextSe">
        <p>{fort(item.time)}</p>
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
