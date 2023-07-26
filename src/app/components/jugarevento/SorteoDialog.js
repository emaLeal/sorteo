import Image from "next/image";
import Link from "next/link";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Slider } from "primereact/slider";
import { RadioButton } from "primereact/radiobutton";
import { useState } from "react";

const SorteoDialog = ({ visible, onHide, id, datosSorteo }) => {
  const estilos = [
    { label: "Horizontal", value: "horizontal" },
    { label: "Vertical", value: "vertical" },
  ];
  const audios = [
    { label: "AUDIO 1", value: "/audio-1.mp3" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
  ];
  const [estilo, setEstilo] = useState(null);
  const [duracion, setDuracion] = useState(18);
  const [audio, setAudio] = useState("");
  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={datosSorteo.nombre}
      className="sm:w-1/3"
      modal
    >
      <div className="flex justify-between my-2">
        <span className="font-bold text-xl">Sorteo: </span>
        <span className="text-xl">{datosSorteo.nombre}</span>
      </div>
      <div className="flex justify-between my-2">
        <span className="font-bold text-xl">Premio: </span>
        <span className="text-xl">{datosSorteo.premio}</span>
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
        <span className="font-bold text-xl">Estilo del Sorteo: </span>
        <Dropdown
          className="w-full"
          options={estilos}
          value={estilo}
          onChange={(e) => setEstilo(e.value)}
          placeholder="Elige un estilo para el sorteo"
        />
      </div>
      <div className="block my-2">
        <span className="font-bold text-xl">Duracion del sorteo: </span>
        <Slider value={duracion} onChange={(e) => setDuracion(e.value)} />
        <span>{duracion} Segundos</span>
      </div>
      <div className="block my-2"></div>
      <div className="my-2">
        <Link
          className="font-bold text-2xl"
          href={`/sorteo/${encodeURIComponent(
            JSON.stringify({
              id,
              estilo,
              duracion,
              sorteo_id: datosSorteo.id,
            })
          )}`}
        >
          <Button
            onClick={() => onHide()}
            label="Jugar Sorteo"
            disabled={estilo === null}
          />
        </Link>
      </div>
    </Dialog>
  );
};

export default SorteoDialog;
