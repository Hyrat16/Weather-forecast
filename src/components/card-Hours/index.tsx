import "./index.css";
import { useHourly } from "../../api-response/emb";
import { WeatherIcon } from "../temperature-icons-wather/Icon";
import { isSameDay } from "date-fns";

export const CardHours = () => {
  const use = useHourly();
  const hoje = new Date();


  const horasHoje = use.hourly.filter((item) =>
    isSameDay(new Date(item.time), hoje),
  );
  return horasHoje.map((item, index) => (
    <div key={index} id="divP">
      <p id="hours">{new Date(item.time).getHours()}:00</p>
      <p>
        <WeatherIcon codeNumber={item.weathercode} size="p" color="white" />
      </p>
      <p id="temp">{item.temperature}</p>
    </div>
  ));
};
