import "./index.css";
import { main } from "../../api-response/emb";
import { WeatherCard } from "../temperature-icons-wather/Icon";

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
      <WeatherCard
        weathercode={(item.weathercode, { size: 30, color: "black" })}
      />
      <p>{item.temperature}</p>
    </div>
  ));
};
