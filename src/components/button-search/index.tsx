import { useForm } from "react-hook-form";

export function ButtonSearch() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("cityName", { required: true })} />
      <input type="submit" />
    </form>
  );
}
