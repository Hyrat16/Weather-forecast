import { fetchWeatherApi } from "openmeteo";

export async function main() {
  const params = {
    latitude: -19.9546,
    longitude: -44.3407,
    current: ["temperature_2m", "weather_code"],
    hourly: ["temperature_2m", "weather_code", "precipitation_probability"],
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "weather_code",
      "precipitation_probability_max",
    ],
    timezone: "GMT",
    forecast_days: 11,
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();
  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  const hourlyTemperature = hourly.variables(0)!.valuesArray()!;
  const hourlyWeathercode = hourly.variables(1)!.valuesArray()!;
  const hourlyPrecipitationProb = hourly.variables(2)!.valuesArray()!;

  const dailyTempMax = daily.variables(0)!.valuesArray()!;
  const dailyTempMin = daily.variables(1)!.valuesArray()!;
  const dailyWeathercode = daily.variables(2)!.valuesArray()!;
  const dailyPrecipitationMax = daily.variables(3)!.valuesArray()!;

  const hourlyTimes = Array.from(
    {
      length:
        (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval(),
    },
    (_, i) =>
      new Date(
        (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
          1000,
      ),
  );

  const dailyTimes = Array.from(
    {
      length:
        (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval(),
    },
    (_, i) =>
      new Date(
        (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000,
      ),
  );

  return {
    current: {
      temperature: Math.round(current.variables(0)!.value()),
      weathercode: current.variables(1)!.value(),
    },
    hourly: hourlyTimes.map((time, i) => ({
      time,
      temperature: Math.round(hourlyTemperature[i]),
      weathercode: hourlyWeathercode[i],
      precipitation: hourlyPrecipitationProb[i],
    })),
    daily: dailyTimes.map((time, i) => ({
      time,
      tempMax: Math.round(dailyTempMax[i]),
      tempMin: Math.round(dailyTempMin[i]),
      weathercode: dailyWeathercode[i],
      precipitationMax: dailyPrecipitationMax[i],
    })),
  };
}

export const mai = await main();
