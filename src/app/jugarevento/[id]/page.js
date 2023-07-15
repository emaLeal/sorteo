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
      <div className="my-12 mx-48">
        <div className="text-center">
          <span className="font-bold text-3xl">{data.data.nombre_evento}</span>
          <Image
            src={data.data.foto_evento}
            alt={data.data.nombre_evento}
            width={500}
            height={500}
          />
        </div>
        <div className="mt-4 mx-28 text-center">
          <Image
            src={data.data.foto_empresa}
            alt={data.data.empresa}
            width={250}
            height={250}
          />
          <span className="font-bold text-2xl">{data.data.empresa}</span>
        </div>
      </div>
    </>
  );
}
