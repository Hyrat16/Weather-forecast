import React from "react";

import { fetchWeatherApi } from "openmeteo";
import { useState, useEffect, useContext, ReactNode } from "react";

async function main() {
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

// criar 3 contexts diferentes para cada dado  DAILY, CURRENT E O HOURLY
interface Daily {
  time: Date;
  tempMax: number;
  tempMin: number;
  weathercode: number;
  precipitationMax: number;
}

interface Current {
  temperature: number;
  weathercode: number;
}

interface Hourly {
  time: Date;
  temperature: number;
  weathercode: number;
  precipitation: number;
}

interface DadosWearther {
  current: Current | null;
  daily: Daily[];
  hourly: Hourly[];

  loading: boolean;
  erro: string | null;
  refetch: () => void;
}

interface WeatherCoordinatorProps {
  children: ReactNode;
}

//
export const nameContext = React.createContext<DadosWearther | undefined>(
  undefined,
);

export const DaisProvider = ({ children }: WeatherCoordinatorProps) => {
  const [current, setCurrent] = useState<Current | null>(null);
  const [daily, setDaily] = useState<Daily[]>([]);
  const [hourly, setHourly] = useState<Hourly[]>([]);

  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const BuscDay = async () => {
    try {
      setLoading(true);
      setErro(null);

      const dados = await main();

      setCurrent(dados.current);
      setDaily(dados.daily);
      setHourly(dados.hourly);
    } catch (error) {
      setErro("Erro");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    BuscDay();
  }, []);

  return (
    <nameContext.Provider
      value={{ daily, hourly, current, loading, erro, refetch: BuscDay }}
    >
      {children}
    </nameContext.Provider>
  );
};

/* export const UseDadosAPI = () => {
  const context = useContext(nameContext);

  if (context === undefined) {
    throw new Error("useDadosAPI deve ser usado dentro de DadosAPIProvider");
  }

  return context;
}; */

export const useHourly = () => {
  const context = useContext(nameContext);

  if (!context) {
    throw new Error("useDadosAPI deve ser usado dentro de DadosAPIProvider");
  }

  const { hourly, loading, erro } = context;

  return { hourly, loading, erro };
};

export const useDaily = () => {
  const context = useContext(nameContext);

  if (!context) {
    throw new Error("useDadosAPI deve ser usado dentro de DadosAPIProvider");
  }

  const { loading, erro, daily } = context;

  return { loading, erro, daily };
};

export const useCurrent = () => {
  const context = useContext(nameContext);

  if (!context) {
    throw new Error("useDadosAPI deve ser usado dentro de DadosAPIProvider");
  }

  const { loading, erro, current } = context;

  return { loading, erro, current };
};
