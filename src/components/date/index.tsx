import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const dates = format(new Date(), "EEEE , d 'de' MMMM * HH:mm", {
  locale: ptBR,
});

//export const dateFormat = dates.charAt(0).toUpperCase() + dates.slice(1);
