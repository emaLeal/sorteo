import Link from "next/link";
import { Button } from "primereact/button";
import React from "react";

const Header = ({ evento_id, sorteo_id }) => {
  return (
    <>
      <div className="flex justify-between content-center">
        <span className="font-bold text-lg">
          Lista de Participantes del Sorteo
        </span>

        <Link href={`/admin-hub/gestionarevento/${evento_id}/sorteos/`}>
          <Button
            label="Volver"
            severity="secondary"
            text
            rounded
            raised
            tooltip="Volver a lista de sorteos"
            tooltipOptions={{ position: "left" }}
          />
        </Link>
      </div>
    </>
  );
};

export default Header;
