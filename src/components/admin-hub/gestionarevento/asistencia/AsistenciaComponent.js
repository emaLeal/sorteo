"use client";
import React, { useRef, useState } from "react";
import SubirQr from "./SubirQr";

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
  nombre_empresa: "",
  nombre_evento: "",
};

const atributos = [
  "id",
  "nombre",
  "correo",
  "cargo",
  "evento_id",
  "foto",
  "cedula",
  "participara",
  "acepta",
  "nombre_empresa",
  "nombre_evento",
];

const AsistenciaComponent = ({ evento_id }) => {
  const canvasRef = useRef(null);
  const errorRef = useRef(null);
  const [dataQr, setDataQr] = useState(initialForm);
  const [error, setError] = useState("");
  const habilitarParticipante = async (id, nombre) => {
    const url = `/api/participante/habilitar/${id}`;
    const res = await fetch(url, {
      method: "PUT",
      next: { revalidate: 0 },
    });
    if (res.ok) {
      errorRef.current.show({
        severity: "success",
        summary: "El Participante fue Habilitado",
        detail: `El participante ${nombre} fue habilitado exitosamente`,
        life: 3000,
      });

      const url2 = `/api/historial/${evento_id}`;
      const res2 = await fetch(url2, {
        method: "POST",
        body: JSON.stringify({
          evento_id,
          participante_id: id,
        }),
      });
    }
  };
  return (
    <>
      <div className="">
        <SubirQr
          habilitarParticipante={habilitarParticipante}
          error={error}
          setError={setError}
          atributos={atributos}
          dataQr={dataQr}
          setDataQr={setDataQr}
          errorRef={errorRef}
          canvasRef={canvasRef}
        />
      </div>
    </>
  );
};

export default AsistenciaComponent;
