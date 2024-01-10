import Image from "next/image";
import Link from "next/link";
import logo from "/public/logo.png";
import MenuSorteo from "@/components/jugarevento/menusorteo";

async function getData(id) {
  const url = `${process.env.COMPLETE_HOST}/api/eventos/${id}`;

  const res = await fetch(url, { cache: "no-store" });

  const json = await res.json();

  return json;
}
async function getSorteos(id) {
  const url = `${process.env.COMPLETE_HOST}/api/sorteos/${id}`;

  const res = await fetch(url, { cache: "no-cache" });

  if (res.ok) {
    const json = await res.json();

    return json;
  }
}

export default async function JugarSorteoPage({ params }) {
  const { id, configuraciones } = params;
  const data = await getData(id);
  const sorteos = await getSorteos(id);

  return (
    <>
      <div className="flex flex-row overflow-hidden">
        <div
          className="w-full h-screen sm:w-4 overflow-y-auto"
          style={{ background: "#071426" }}
        >
          <div className="flex justify-between mb-4 border-b-2 ">
            <Link href={"/admin-hub"}>
              <Image src={logo} width={50} height={50} alt="logo" />
            </Link>
            <span className="font-bold text-2xl ml-2">Lista de Sorteos</span>
          </div>
          <MenuSorteo id={id} data={sorteos} />
          <div className="absolute bottom-0">
            <Link
              className="underline underline-offset-2 font-500 [hover]"
              href={"/admin-hub"}
            >
              Volver a Pagina Principal
            </Link>
          </div>
        </div>
        <div className="hidden sm:block w-full sm:overflow-y-hidden">
          <div className="flex justify-center my-2">
            <span className="font-bold sm:text-4xl">
              {data.data.nombre_evento}
            </span>
            <Image
              src={`/api/foto${data.data.foto_empresa}`}
              alt="nombre de empresa"
              className="w-auto h-auto"
              width={50}
              height={50}
            />
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
      </div>
    </>
  );
}
