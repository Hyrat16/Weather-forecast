import { isAfter, startOfDay, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { WeatherIcon } from "../temperature-icons-wather/Icon";
import { useDaily } from "../../api-response/emb";
import "./index.css";

export const DaysComponent = () => {
  const { daily, loading, erro } = useDaily();

  const days = daily.map((item) => item);

  const diasPosteriores = days.filter((item) =>
    isAfter(new Date(item.time), startOfDay(new Date())),
  );

  const linha1 = diasPosteriores.slice(0, 5);
  const linha2 = diasPosteriores.slice(5, 10);

  const renderCard = (item: any, index: any) => (
    <div key={index} className="daily-card">
      <div className="daily-header">
        <span className="daily-day">
          {format(new Date(item.time), "eee", { locale: ptBR })}
        </span>
        <WeatherIcon codeNumber={item.weathercode} size="m" color="white" />
      </div>

      <div className="daily-temp-box">
        <span className="temp-max">{item.tempMax}º</span>
        <span className="temp-min">{item.tempMin}º</span>
      </div>

      <div className="daily-precipitation">💧 {item.precipitationMax}%</div>
    </div>
  );

  if (loading) return <div>Carregando previsão semanal...</div>;
  if (erro) return <div>Erro: {erro}</div>;
  if (daily.length === 0) return <div>Sem dados</div>;

  return (
    <div className="daily-wrapper">
      <div className="daily-grid-row">
        {linha1.map((item, index) => renderCard(item, index))}
      </div>
      <div className="daily-grid-row">
        {linha2.map((item, index) => renderCard(item, index))}
      </div>
    </div>
  );
};
