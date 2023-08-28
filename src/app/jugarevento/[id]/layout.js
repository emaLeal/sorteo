import MenuSorteo from "@/components/jugarevento/menusorteo";
import Link from "next/link";
import logo from "/public/logo.png";
import Image from "next/image";

async function getData(id) {
  const url = `http://localhost:3000/api/sorteos/${id}`;

  const res = await fetch(url, { next: { revalidate: 60 } });

  if (res.ok) {
    const json = await res.json();

    return json;
  }
}

export default async function EventoLayout({ params, children }) {
  const { id } = params;
  const data = await getData(id);

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
          <MenuSorteo id={id} data={data} />
          <div className="absolute bottom-0">
            <Link
              className="underline underline-offset-2 font-500 [hover]"
              href={"/admin-hub"}
            >
              Volver a Pagina Principal
            </Link>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
