import Image from "next/image";

async function getData(id) {
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
      <div className="hidden sm:block w-full sm:overflow-y-hidden">
        <div className="flex justify-center my-2">
          <span className="font-bold sm:text-4xl">
            {data.data.nombre_evento}
          </span>
          {data.data.mostrar_foto_empresa === 1 && <Image
            src={`/api/foto${data.data.foto_empresa}`}
            alt="nombre de empresa"
            className="w-auto h-auto"
            width={50}
            height={50}
          />}
        </div>
        <div className="w-full h-full relative">
          <Image
            src={`/api/foto${data.data.foto_evento}`}
            alt="nombre de evento"
            className="w-full h-full"
            fill
          />
        </div>
      </div>
    </>
  );
}
