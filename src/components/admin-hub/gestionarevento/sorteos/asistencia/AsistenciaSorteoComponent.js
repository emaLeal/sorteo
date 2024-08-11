"use client";
import React, { useState, useRef } from "react";
import SubirQr from "@/components/admin-hub/gestionarevento/asistencia/SubirQr";
import { Button } from "primereact/button";
import Link from "next/link";

const atributos = [
  "id",
  "nombre",
  "correo",
  "cargo",
  "evento_id",
  "foto",
  "cedula",
  "habilitado",
  "sorteo_id",
  "nombre_empresa",
  "nombre_evento",
];

const initialForm = {
  id: 0,
  nombre: "",
  cedula: "",
  cargo: "",
  correo: "",
  evento_id: "",
  foto: "",
  habilitado: "",
  sorteo_id: "",
  nombre_empresa: "",
  nombre_evento: "",
};

const AsistenciaSorteoComponent = ({ evento_id, sorteo_id }) => {
  const canvasRef = useRef(null);
  const errorRef = useRef(null);
  const [dataQr, setDataQr] = useState(initialForm);
  const [error, setError] = useState("");

  const habilitarParticipante = async (id, nombre) => {
    const url = `/api/sorteos_ex/habilitar_exclusivo/${id}`;
    const res = await fetch(url, {
      body: JSON.stringify({ id, sorteo_id }),
      method: "PUT",
      next: { revalidate: 0 },
    });
    if (res.ok) {
      const url2 = `/api/historial/${sorteo_id}`;
      const res2 = await fetch(url2, {
        method: "POST",
        body: JSON.stringify({
          evento_id,
          participante_id: id,
          sorteo_id,
        }),
      });
      if (res2.status === 201) {
        console.log("Ya esta habilitado");
        errorRef.current.show({
          severity: "success",
          summary: "El Participante fue Habilitado",
          detail: `El participante ${nombre} fue habilitado exitosamente`,
          life: 3000,
        });
      } else {
        errorRef.current.show({
          severity: "info",
          summary: "El Participante ya ha Habilitado",
          detail: `El participante ${nombre} fue habilitado exitosamente`,
          life: 3000,
        });
      }
    }
  };
  return (
    <>
      <Link
        href={`/admin-hub/gestionarevento/${evento_id}/sorteos/exclusividad_sorteo/${sorteo_id}`}
      >
        <Button label="Volver" severity="secondary" raised rounded />
      </Link>
      <div className="flex justify-center items-center w-screen h-96">
        <SubirQr
          habilitarParticipante={habilitarParticipante}
          dataQr={dataQr}
          setDataQr={setDataQr}
          error={error}
          setError={setError}
          atributos={atributos}
          errorRef={errorRef}
          canvasRef={canvasRef}
        />
      </div>
    </>
  );
};

export default AsistenciaSorteoComponent;
