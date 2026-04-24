import "./index.css";
import { useHourly } from "../../api-response/emb";
import { WeatherIcon } from "../temperature-icons-wather/Icon";
import { isSameDay } from "date-fns";

export const CardHours = () => {
  const hoje = new Date();

  const { hourly, erro, loading } = useHourly();

  const horasHoje = hourly.filter((item) =>
    isSameDay(new Date(item.time), hoje),
  );

  if (loading) return <div>Carregando previsão semanal...</div>;
  if (erro) return <div>Erro: {erro}</div>;
  if (hourly.length === 0) return <div>Sem dados</div>;

  return horasHoje.map((item, index) => (
    <div key={index} className="hourly-item">
      <p className="hourly-time">{new Date(item.time).getHours()}:00</p>
      <div className="hourly-icon-wrapper">
        <WeatherIcon codeNumber={item.weathercode} size="p" color="white" />
      </div>
      <p className="hourly-temp">{item.temperature}º</p>
    </div>
  ));
};
