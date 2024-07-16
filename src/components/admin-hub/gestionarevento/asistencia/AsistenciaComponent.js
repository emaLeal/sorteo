"use client";
import React from "react";
import SubirQr from "./SubirQr";

const AsistenciaComponent = () => {
  return (
    <>
      <h1 className="flex justify-center font-bold text-5xl my-4">
        Modulo de Asistencia
      </h1>
      <div className="flex justify-center items-center w-screen h-96">
        <SubirQr />
      </div>
    </>
  );
};

export default AsistenciaComponent;
