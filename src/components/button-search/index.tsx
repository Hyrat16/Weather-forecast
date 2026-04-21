import { useForm } from "react-hook-form";
import "./index.css"; // Importe do CSS

export function ButtonSearch() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <form className="search-form" onSubmit={handleSubmit(onSubmit)}>
      <label className="search-label">Buscar cidade</label>
      <input
        className="search-input"
        placeholder="Ex: Rio de Janeiro"
        {...register("cityName", { required: true })}
      />
      <button className="search-button" type="submit">
        Buscar
      </button>
    </form>
  );
}
