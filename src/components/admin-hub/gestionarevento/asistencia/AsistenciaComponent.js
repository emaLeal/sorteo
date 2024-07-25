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

const AsistenciaComponent = () => {
  const canvasRef = useRef(null);
  const errorRef = useRef(null);
  const [dataQr, setDataQr] = useState(initialForm);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const habilitarParticipante = async (id) => {
    const url = `/api/participante/habilitar/${id}`;
    const res = await fetch(url, {
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
          error={error}
          setError={setError}
          visible={visible}
          setVisible={setVisible}
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
