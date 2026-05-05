import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Coordenadas = {
  name: string;
  lat: number;
  long: number;
};

interface DadosGeoAPIReturn {
  lat: number;
  long: number;
  name: string;

  loading: boolean;
  erro: string | null;
  buscarCidadePorNome: (nomeCidade: string) => Promise<void>;
  buscarCidadePorGeolocalizacao: () => Promise<void>;
}

interface GeoProps {
  children: ReactNode;
  cidadePadrao: string;
  usarGeolocalizaçao?: boolean;
}

const getErrorMessage = (error: any) => {
  if (error.status === 500) return "Conexao com data base falhou";
  return "Algo deu errado. Tente novamente";
};

// Funçao responsável por buscar a cidade a partir do nome colocado no input //ButtonSearch que vai dar a partida no caso
export const buscarCoordenadas = async (
  nomeCidade: string,
): Promise<Coordenadas> => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(nomeCidade)}&format=json&limit=1`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "WeatherApp/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (!data || data.length === 0) {
    throw new Error("Cidade não encontrada");
  }

  return {
    name: data[0].display_name,
    lat: parseFloat(data[0].lat),
    long: parseFloat(data[0].lon),
  };
};

/*
Essa parte localiza via browser a localidade do usuario. Lembrando que aqui é um caso de Promisse - Reject / Resolve que retorna um objeto ja tipado evitando 
que retorne void para depois utilizar no AGI Provider
*/

export const buscarCidadePorGeolocalizacao = async (): Promise<Coordenadas> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocalização não suportada"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=pt-BR`;

        try {
          const response = await fetch(url, {
            headers: {
              "User-Agent": "WeatherApp/1.0",
            },
          });

          const data = await response.json();

          console.log(data);

          resolve({
            name: data.address?.town,
            lat: parseFloat(data.lat),
            long: parseFloat(data.lon),
          });
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        reject(new Error(`Erro de geolocalização: ${error.message}`));
      },
    );
  });
};

const GeoApiContext = createContext<DadosGeoAPIReturn | undefined>(undefined);

export const AGIProvider = ({
  children,
  cidadePadrao = "Berlim",
  usarGeolocalizaçao = true,
}: GeoProps) => {
  const [lat, setLatitude] = useState<number>(0);
  const [long, setLongitude] = useState<number>(0);
  const [name, setName] = useState<string>("");

  const [geoLoading, setGeoLoading] = useState<boolean>(false);
  const [erro, setErro] = useState<string | null>(null);

  //Como vou ter que atualizar 2x os estados em funçoes diferentes melhor opçao é criar um "atalho"
  const atualizarCoordenadas = (data: Coordenadas) => {
    setLatitude(data.lat);
    setLongitude(data.long);
    setName(data.name);
  };

  const buscarCidadePorNome = async (nomeCidade: string) => {
    try {
      setGeoLoading(true);
      setErro(null);
      const data = await buscarCoordenadas(nomeCidade);

      atualizarCoordenadas(data);
    } catch (error) {
      setErro(getErrorMessage(error));
    } finally {
      setGeoLoading(false);
    }
  };

  const buscarPorGeolocalizacao = async () => {
    try {
      setGeoLoading(true);
      setErro(null);

      const data = await buscarCidadePorGeolocalizacao();
      atualizarCoordenadas(data);
    } catch (error) {
      setErro(getErrorMessage(error));
      if (cidadePadrao) {
        await buscarCidadePorNome(cidadePadrao);
      }
    } finally {
      setGeoLoading(false);
    }
  };

  // Montando o componente na primeira renderizaçao com o dado correto utilizando do boolean em usarGeolocalizaçao
  useEffect(() => {
    if (usarGeolocalizaçao) {
      buscarPorGeolocalizacao();
    } else if (cidadePadrao) {
      buscarCidadePorNome(cidadePadrao);
    }
  }, []);

  return (
    <GeoApiContext
      value={{
        lat,
        long,
        name,
        loading: geoLoading,
        erro,
        buscarCidadePorNome,
        buscarCidadePorGeolocalizacao: buscarPorGeolocalizacao,
      }}
    >
      {children}
    </GeoApiContext>
  );
};

export const useCoordenadas = () => {
  const context = useContext(GeoApiContext);

  if (!context) {
    throw new Error("useDadosAPI deve ser usado dentro de DadosAPIProvider");
  }

  const { lat, long, loading } = context;

  return { lat, long, loading };
};

export const useGeoApi = () => {
  const context = useContext(GeoApiContext);

  if (!context) {
    throw new Error("useGeoApi deve ser usado dentro de AGIProvider");
  }

  return context;
};
