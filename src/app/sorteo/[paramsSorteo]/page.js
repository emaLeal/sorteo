import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import Image from "next/image";
import SorteoCarga from "@/components/jugarevento/sorteoCarga";
import SorteoEstatico from '@/components/jugarevento/sorteoEstatico'

async function getData(id) {
  const res = await fetch(`${process.env.COMPLETE_HOST}/api/sorteo/${id}`, {
    cache: "no-store",
  });

  const json = await res.json();

  return json;
}

async function getEvento(id) {
  const res = await fetch(`${process.env.COMPLETE_HOST}/api/eventos/${id}`, {
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
      <div
        className="flex justify-center font-bold text-3xl mb-2 p-2"
        style={{ background: "#508ec3" }}
      >
        <h1 className="mx-4">{evento.data.nombre_evento}</h1>
        <Image
          style={{ width: "auto", height: "auto" }}
          src={`/api/foto${evento.data.foto_empresa}`}
          width={50}
          height={50}
          alt="logo de empresa"
        />
      </div>
      {parametros.estilo !== 'estatico' ? <SorteoCarga
        data={data}
        estilo={parametros.estilo}
        duracion={parametros.duracion}
        audio={parametros.audio}
        noImagen={parametros.noImagen}
        participantes={data.participantes}
      /> : <SorteoEstatico participantes={data.participantes} duracion={parametros.duracion} />}

    </>
  );
}
