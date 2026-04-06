import "./index.css";
import { mai } from "../../api-response/emb";
import { WeatherIcon } from "../temperature-icons-wather/Icon";
import { isSameDay } from "date-fns";

const hoje = new Date();

const horasHoje = mai.hourly.filter((item) =>
  isSameDay(new Date(item.time), hoje),
);

export const CardHours = () => {
  return horasHoje.map((item, index) => (
    <div key={index} id="divP">
      <p>{new Date(item.time).getHours()}:00</p>
      <p>
        <WeatherIcon codeNumber={item.weathercode} size="p" color="white" />
      </p>
      <p>{item.temperature}</p>
    </div>
  ));
};
