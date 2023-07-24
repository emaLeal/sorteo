import Image from "next/image";
import Link from "next/link";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";

const SorteoDialog = ({ visible, onHide, id, datosSorteo }) => {
  const estilos = [
    { label: "Horizontal", value: "horizontal" },
    { label: "Vertical", value: "vertical" },
  ];
  const [estilo, setEstilo] = useState(null);
  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={datosSorteo.nombre}
      className="sm:w-1/3"
      modal
    >
      <div className="flex justify-between my-2">
        <span className="font-bold text-3xl">Sorteo: </span>
        <span className="text-3xl">{datosSorteo.nombre}</span>
      </div>
      <div className="flex justify-between my-2">
        <span className="font-bold text-3xl">Premio: </span>
        <span className="text-3xl">{datosSorteo.premio}</span>
      </div>
      <div className="flex justify-center my-4">
        <Image
          src={datosSorteo.premio_foto}
          alt={datosSorteo.nombre}
          width={200}
          height={200}
        />
      </div>
      <div className="block my-2">
        <span className="font-bold text-3xl">Estilo del Sorteo: </span>
        <Dropdown
          className="w-full"
          options={estilos}
          value={estilo}
          onChange={(e) => setEstilo(e.value)}
          placeholder="Elige un estilo para el sorteo"
        />
      </div>

      <Link
        className="font-bold text-2xl"
        href={`/sorteo/${encodeURIComponent(
          JSON.stringify({ id, estilo, sorteo_id: datosSorteo.id })
        )}`}
      >
        <Button onClick={() => onHide()} label="Jugar Sorteo" />
      </Link>
    </Dialog>
  );
};

export default SorteoDialog;
