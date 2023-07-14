import { cookies } from "next/headers";
import SorteoCarga from "../../sorteoCarga";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";

export async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/sorteo/${id}`, {
    cache: "no-store",
  });

  const json = await res.json();

  return json;
}

export default async function SorteoPage({ params }) {
  const { paramsSorteo } = params;
  const parametros = JSON.parse(decodeURIComponent(paramsSorteo));
  const data = await getData(parametros.sorteo_id);
  const cookieStore = cookies().get("miToken");
  console.log(parametros)
  try {
    const payload = await jwtVerify(
      new TextEncoder().encode(cookieStore.value),
      new TextEncoder().encode(process.env.SECRET)
    );
  } catch (error) {
    redirect("/");
  }

  return <SorteoCarga data={data} estilo={parametros.estilo} />;
}
