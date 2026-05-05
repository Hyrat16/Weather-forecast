import { useForm } from "react-hook-form";
import "./index.css";
import { useState } from "react";
import { useGeoApi } from "../../api-response/geoapi";

export function ButtonSearch() {
  const { buscarCidadePorNome, loading } = useGeoApi();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    buscarCidadePorNome(data.cityName); // Extrair o valor do objeto
  };

  return (
    <form className="search-form" onSubmit={handleSubmit(onSubmit)}>
      <label className="search-label">Buscar cidade</label>
      <input
        className="search-input"
        placeholder="Ex: São Paulo, SP"
        {...register("cityName", { required: true })}
        disabled={loading}
      />
      <button className="search-button" type="submit" disabled={loading}>
        {loading ? "Buscando..." : "Buscar"}
        Buscar
      </button>
    </form>
  );
}
