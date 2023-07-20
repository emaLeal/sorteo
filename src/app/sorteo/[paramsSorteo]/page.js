import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import SorteoCarga from "@/components/sorteoCarga";
import Image from "next/image";

export async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/sorteo/${id}`, {
    cache: "no-store",
  });

  const json = await res.json();

  return json;
}

export async function getEvento(id) {
  const res = await fetch(`http://localhost:3000/api/eventos/${id}`, {
    cache: "no-store",
  });

  const json = await res.json();

  return json;
}

export default async function SorteoPage({ params }) {
  const { paramsSorteo } = params;
  const parametros = JSON.parse(decodeURIComponent(paramsSorteo));
  const data = await getData(parametros.sorteo_id);
  const evento = await getEvento(data.data.evento_id);
  const cookieStore = cookies().get("miToken");
  try {
    const payload = await jwtVerify(
      new TextEncoder().encode(cookieStore.value),
      new TextEncoder().encode(process.env.SECRET)
    );
  } catch (error) {
    redirect("/");
  }

  return (
    <>
      <div className="flex justify-center font-bold text-3xl mb-2 bg-teal-500 p-2">
        <h1 className="mx-4">{evento.data.nombre_evento}</h1>
        <Image
          src={evento.data.foto_evento}
          width={50}
          height={50}
          alt={data.data.nombre_evento}
        />
      </div>
      <SorteoCarga data={data} estilo={parametros.estilo} />;
    </>
  );
}
