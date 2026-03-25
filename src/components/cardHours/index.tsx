import "./index.css";

type Card = {
  hours: number;
  weathercodeIcon: number;
  temperature: number;
};

export function CardHours({ hours, weathercodeIcon, temperature }: Card) {
  return (
    <div id="divP">
      <p>hours</p>
      <p>weathercodeIcon</p>
      <p>temperature</p>
    </div>
  );
}
