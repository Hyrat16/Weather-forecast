import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function useRelogio() {
  const [horaAtual, setHoraAtual] = useState("");

  useEffect(() => {
    const atualizarHora = () => {
      const horaFormatada = format(new Date(), "EEEE, d 'de' MMMM • HH:mm:ss", {
        locale: ptBR,
      });
      setHoraAtual(horaFormatada);
    };

    atualizarHora();

    const intervalo = setInterval(atualizarHora, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return horaAtual;
}
