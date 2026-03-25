import { fetchWeatherApi } from "openmeteo";

export async function main() {
  const params = {
    latitude: -19.9546,
    longitude: -44.3407,
    current: ["temperature_2m", "weathercode"],
    hourly: ["temperature_2m", "weather_code"],
    daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
    timezone: "auto",
    past_days: 1,
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();
  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  const hourlyTemperature = hourly.variables(0)!.valuesArray()!;
  //const hourlyPrecipitation = hourly.variables(1)!.valuesArray()!;
  const hourlyWeathercode = hourly.variables(1)!.valuesArray()!;

  const dailyTempMax = daily.variables(0)!.valuesArray()!;
  const dailyTempMin = daily.variables(1)!.valuesArray()!;
  //const dailyPrecipitation = daily.variables(2)!.valuesArray()!;
  //const dailyPrecipitationProb = daily.variables(3)!.valuesArray()!;
  //const dailyWeathercode = daily.variables(4)!.valuesArray()!;

  // Horário
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

  // Diário
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

  /*  const dayl = dailyTimes.map((time, i) => ({
    dia: time.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
    }),
    tempMax: Math.round(dailyTempMax[i]),
    tempMin: Math.round(dailyTempMin[i]),
    precipitacao: Math.round(dailyPrecipitation[i] * 10) / 10,
    chanceDeChuva: dailyPrecipitationProb[i],
    weathercode: dailyWeathercode[i],
  })); */

  /*  console.log("=== CURRENT ===");
  console.log("Temperature:", Math.round(current.variables(0)!.value()));
  console.log("Weathercode:", current.variables(1)!.value());

  console.log("\n=== DAILY (primeiro dia) ===");
  console.log("Temp Max:", Math.round(dailyTempMax[0]));
  console.log("Temp Min:", Math.round(dailyTempMin[0]));
  console.log("Precipitação:", dailyPrecipitation[0]);
  console.log("Chance de chuva:", dailyPrecipitationProb[0]);
  console.log("Weathercode:", dailyWeathercode[0]);

  console.log("\n=== DAILY (primeiro dois) ===");
  console.log("Temp Max:", Math.round(dailyTempMax[1]));
  console.log("Temp Min:", Math.round(dailyTempMin[1]));
  console.log("Precipitação:", dailyPrecipitation[1]);
  console.log("Chance de chuva:", dailyPrecipitationProb[1]);
  console.log("Weathercode:", dailyWeathercode[1]);

  console.log("\n=== HOURLY (primeira hora) ===");
  console.log("Temperature:", Math.round(hourlyTemperature[0]));
  console.log("Chance de chuva:", hourlyPrecipitation[0]);
  console.log("Weathercode:", hourlyWeathercode[0]); 

  console.log("\n=== HOURLY (segunda hora) ===");
  console.log("Temperature:", Math.round(hourlyTemperature[1]));
  console.log("Chance de chuva:", hourlyPrecipitation[1]);
  console.log("Weathercode:", hourlyWeathercode[1]); 

  console.log("\n=== PREVISÃO 7 DIAS ===");
  dailyTimes.forEach((time, i) => {
    console.log(`
  Dia: ${time.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "2-digit" })}
  Temp Max: ${Math.round(dailyTempMax[i])}°
  Temp Min: ${Math.round(dailyTempMin[i])}°
  Precipitação: ${Math.round(dailyPrecipitation[i] * 10) / 10}mm
  Chance de chuva: ${dailyPrecipitationProb[i]}%
  Weathercode: ${dailyWeathercode[i]}
  `);
  });*/

  return {
    current: {
      temperature: Math.round(current.variables(0)!.value()),
      weathercode: current.variables(1)!.value(),
    },
    hourly: hourlyTimes.map((time, i) => ({
      time,
      temperature: Math.round(hourlyTemperature[i]),
      //precipitationProbability: hourlyPrecipitation[i],
      weathercode: hourlyWeathercode[i],
    })),
    daily: dailyTimes.map((time, i) => ({
      time,
      tempMax: Math.round(dailyTempMax[i]),
      tempMin: Math.round(dailyTempMin[i]),
      //precipitationProbability: dailyPrecipitation[i],
      //weathercode: dailyWeathercode[i],
    })),
  };
}
