import { createElement } from "react";
import { getWeatherIcon } from "./ImportIconsComponents";

export function WeatherCard({ weathercode }: { weathercode: number }) {
  const Icon = getWeatherIcon(weathercode);

  return <p>{createElement(Icon, { size: 150, color: "black" })}</p>;
}
