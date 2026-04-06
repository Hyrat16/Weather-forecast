import { getWeatherIcon } from "./Import-icons-components";

type CompProp = {
  codeNumber: number;
  size?: "p" | "m" | "g";
  color?: string;
};

const sizes = {
  p: 30,
  m: 60,
  g: 150,
};

export function WeatherIcon({
  codeNumber,
  size = "m",
  color = "black",
}: CompProp) {
  const Icon = getWeatherIcon(codeNumber);

  return <Icon size={sizes[size]} color={color} />;
}
