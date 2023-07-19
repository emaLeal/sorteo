"use client";
import SubirFoto from "@/components/subirfoto";
import Image from "next/image";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";

const RegistroDialog = ({ visible, onHide, data }) => {
  const [participanteData, setParticipanteData] = useState({
    nombre: "",
    cedula: "",
    correo: "",
    cargo: "",
    foto: "",
    evento_id: "",
    cedula: "",
  });
  const toast = useRef(null);

  useEffect(() => {
    if (data !== null) {
      setParticipanteData(data);
    }
  }, [data]);

  const onSubmit = () => {
    fetch("/api/registrarparticipante", {
      body: JSON.stringify(participanteData),
      method: "PUT",
    }).then((res) => {
      if (res.ok) {
        onHide();
        toast.current.show({
          severity: "success",
          summary: "Usuario Registrado",
          detail: "Se ha registrado correctamente tu usuario",
          life: 3000,
        });
      }
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={visible}
        onHide={onHide}
        className="md:w-1/2 lg:w-1/2"
        modal
        header={"Registrarte"}
      >
        <div className="mb-4 flex flex-col md:flex-row lg:flex-row md:justify-between lg:flex-row lg:text-xl">
          <span className="font-bold">Nombre Participante: </span>
          <span>{participanteData.nombre}</span>
        </div>
        <div className="mb-4 flex flex-col md:flex-row lg:flex-row md:justify-between lg:flex-row lg:text-xl">
          <span className="font-bold">Correo Participante: </span>
          <span>{participanteData.correo}</span>
        </div>
        <div className="mb-4 flex flex-col md:flex-row lg:flex-row md:justify-between lg:flex-row lg:text-xl">
          <span className="font-bold">Cedula Participante: </span>
          <span>{participanteData.cedula}</span>
        </div>
        <div className="mb-4 flex flex-col md:flex-row lg:flex-row md:justify-between lg:flex-row lg:text-xl">
          <span className="font-bold">Cargo Participante: </span>
          <span>{participanteData.cargo}</span>
        </div>
        <div className="flex justify-center mb-4">
          <Image
            src={`${participanteData.foto}`}
            alt={participanteData.nombre}
            width={200}
            height={150}
          />
        </div>
        <div className="my-4">
          <SubirFoto
            setForm={setParticipanteData}
            form={participanteData}
            field={"foto"}
            title={"Foto para usuario"}
          />
        </div>
        <div className="flex justify-end">
          <Button
            onClick={onSubmit}
            label="Registrar Participante"
            className="p-button p-button-info p-button-rounded p-button-text"
          />
        </div>
      </Dialog>
    </>
  );
};

export default RegistroDialog;
