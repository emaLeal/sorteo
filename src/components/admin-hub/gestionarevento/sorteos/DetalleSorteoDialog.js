"use client";
import Image from "next/image";
import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";

const initialForm = {
  id: 0,
  nombre: "",
  jugado: 0,
  premio: "",
  premio_foto: "",
  ganador_id: 0,
  evento_id: 0,
  nombre_ganador: "",
  correo_ganador: "",
  imagen_ganador: "",
};

const DetalleSorteoDialog = ({ visible, onHide, rowData }) => {
  const [data, setData] = useState(initialForm);

  useEffect(() => {
    if (rowData === null) {
      setData(initialForm);
    } else {
      setData(rowData);
    }
  }, [rowData]);

  const footer = () => {
      
  }

  return (
    <>
      <Dialog
        visible={visible}
        onHide={onHide}
        header="Detalle del Sorteo"
        modal
        className="w-5/6 sm:w-1/2"
      >
        <div className="flex justify-between my-2">
          <label className="font-bold sm:text-xl">Nombre del Sorteo:</label>
          <label className="sm:text-xl">{data.nombre}</label>
        </div>
        <div className="flex justify-between my-2">
          <label className="font-bold sm:text-xl">Premio del Sorteo:</label>
          <label className="sm:text-xl">{data.premio}</label>
        </div>
        <div className="flex justify-center my-2">
          <Image
            src={`/api/foto${data.premio_foto}`}
            alt="Foto de Premio"
            width={300}
            height={300}
            className="w-auto h-auto"
          />
        </div>
        {data.jugado === 1 && (
          <>
            <div className="flex justify-between my-2">
              <label className="font-bold sm:text-xl">
                Ganador del Sorteo:{" "}
              </label>
              <label className="sm:text-xl">{data.nombre_ganador}</label>
            </div>
            <div className="flex justify-center my-2">
              <Image
                className="w-auto h-auto"
                src={
                  data.imagen_ganador !== "/user.png"
                    ? `/api/foto${data.imagen_ganador}`
                    : "/user.png"
                }
                alt="Imagen del Ganador"
                width={150}
                height={150}
              />
            </div>
          </>
        )}
      </Dialog>
    </>
  );
};

export default DetalleSorteoDialog;
