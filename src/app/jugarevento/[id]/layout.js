import MenuSorteo from "@/app/components/jugarevento/menusorteo";
import Link from "next/link";
import logo from "/public/logo.png";
import Image from "next/image";

export async function getData(id) {
  const res = await fetch(`${process.env.COMPLETE_HOST}/api/eventos/${id}`, {
    cache: "no-cache",
  });

  const json = await res.json();

  return json;
}

export default async function EventoLayout({ params, children }) {
  const { id } = params;

  return (
    <>
      <div className="flex flex-row overflow-hidden">
        <div
          className="w-full h-screen sm:w-3"
          style={{ background: "#071426" }}
        >
          <div className="flex justify-between mb-4 border-b-2 ">
            <Link href={"/admin-hub"}>
              <Image src={logo} width={50} height={50} alt="logo" />
            </Link>
            <span className="font-bold text-2xl ml-2">Lista de Sorteos</span>
          </div>
          <MenuSorteo id={id} />
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
