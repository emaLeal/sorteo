import Image from "next/image";

export async function getData(id) {
  const url = `${process.env.COMPLETE_HOST}/api/eventos/${id}`;

  const res = await fetch(url, { cache: "no-store" });

  const json = await res.json();

  return json;
}

export default async function JugarSorteoPage({ params }) {
  const { id } = params;
  const data = await getData(id);

  return (
    <>
      <div className="hidden sm:block sm:mx-80">
        Bienvenido al Evento{" "}
        <span className="font-bold">{data.data.nombre_evento}</span>
        <Image
          src={data.data.foto_evento}
          alt={data.data.nombre_evento}
          width={250}
          height={200}
        />
        De la Empresa <span className="font-bold">{data.data.empresa}</span>
        <Image
          src={data.data.foto_empresa}
          alt={data.data.empresa}
          width={150}
          height={150}
        />
      </div>
    </>
  );
}
