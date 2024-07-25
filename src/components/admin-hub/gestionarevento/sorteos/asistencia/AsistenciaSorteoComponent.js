"use client";
import React, { useState, useRef } from "react";
import SubirQr from "@/components/admin-hub/gestionarevento/asistencia/SubirQr";

/*
 p.id,
      p.nombre,
      p.cargo,
      p.correo,
      p.foto,
      p.evento_id,
      p.cedula,
      es.sorteo_id,
      es.habilitado
*/
const atributos = [
  "id",
  "nombre",
  "correo",
  "cargo",
  "evento_id",
  "foto",
  "cedula",
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
  participara: "",
  acepta: "",
  sorteo_id: "",
  nombre_empresa: "",
  nombre_evento: "",
};

const AsistenciaSorteoComponent = () => {
  const canvasRef = useRef(null);
  const errorRef = useRef(null);
  const [dataQr, setDataQr] = useState(initialForm);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  const habilitarParticipante = async (id) => {
    const url = `/api/sorteos_ex/habilitar_exclusivo/${id}`;
    const res = await fetch(url, {
      body: JSON.stringify(dataQr),
      method: "PUT",
      next: { revalidate: 0 },
    });
    if (res.ok) {
      errorRef.current.show({
        severity: "success",
        summary: "El Participante fue Habilitado",
        detail: "El participante fue habilitado exitosamente",
        life: 3000,
      });
      setVisible(!visible);
    }
  };
  return (
    <>
      <h1 className="flex justify-center font-bold text-5xl my-4">
        Modulo de Asistencia
      </h1>
      <div className="flex justify-center items-center w-screen h-96">
        <SubirQr
          habilitarParticipante={habilitarParticipante}
          dataQr={dataQr}
          setDataQr={setDataQr}
          error={error}
          setError={setError}
          atributos={atributos}
          visible={visible}
          setVisible={setVisible}
          errorRef={errorRef}
          canvasRef={canvasRef}
        />
      </div>
    </>
  );
};

export default AsistenciaSorteoComponent;
