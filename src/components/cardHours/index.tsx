import "./index.css";
import { main } from "../../api-response/emb";
import { WeatherIcon } from "../temperature-icons-wather/Icon";

const mai = await main();
const arr = mai.hourly;

const hoje = new Date().toLocaleDateString("sv-SE");

const horasHoje = arr.filter(
  (item) => new Date(item.time).toLocaleDateString("sv-SE") === hoje,
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
