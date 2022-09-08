import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  name: z.string(),
  age: z.number(),
  testNumber: z.number().min(10),
});

export default function TestFormPage(): JSX.Element {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <input {...register("name")} />
      <input {...register("age")} type="number" />
      <input
        {...register("testNumber", { valueAsNumber: true })}
        type="number"
      />
      <input type="submit" />
    </form>
  );
}
