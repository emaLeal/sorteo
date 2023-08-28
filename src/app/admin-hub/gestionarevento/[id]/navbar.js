import React from "react";
import Menu from "./menu";
import Link from "next/link";
import { ButtonPrime } from "@/components/admin-hub/gestionarevento/sorteos/buttonprime";

export async function getEvent(id) {
  const res = await fetch(`http://localhost:3000/api/eventos/${id}`,{
    cache: 'no-cache'
  });

  const json = await res.json();

  return json;
}

const Navbar = async ({ id }) => {
  const data = await getEvent(id);

  return (
    <>
      <div className="mb-2 flex justify-center">
        <h1 className="text-white-600 text-4xl font-bold">
          {data.data.nombre_evento}
        </h1>
      </div>
      <div
        className="flex justify-start p-2"
        style={{ backgroundColor: "#071426" }}
      >
        <Link href={"/admin-hub"}>
          <ButtonPrime />
        </Link>
        <Menu id={id} />
      </div>
    </>
  );
};

export default Navbar;
