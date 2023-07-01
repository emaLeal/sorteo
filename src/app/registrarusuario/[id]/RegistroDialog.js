"use client";
import Image from "next/image";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
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

  const uploadHandler = async (e) => {
    const file = e.files[0];

    const reader = new FileReader();
    const blob = await fetch(file.objectURL).then((r) => r.blob()); // blob:url

    reader.readAsDataURL(blob);

    reader.onloadend = () => {
      const base64data = reader.result;
      setParticipanteData({ ...participanteData, foto: base64data });
    };
  };

  useEffect(() => {
    if (data !== null) {
      setParticipanteData(data);
    }
  }, [data]);

  const onSubmit = () => {
    fetch("http://localhost:3000/api/registrarparticipante", {
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
      <Dialog visible={visible} onHide={onHide} modal header={"Registrarte"}>
        <div className="mb-4 flex justify-between text-xl">
          <span className="font-bold">Nombre Participante: </span>
          <span>{participanteData.nombre}</span>
        </div>
        <div className="mb-4 flex justify-between text-xl">
          <span className="font-bold">Correo Participante: </span>
          <span>{participanteData.correo}</span>
        </div>
        <div className="mb-4 flex justify-between text-xl">
          <span className="font-bold">Cedula Participante: </span>
          <span>{participanteData.cedula}</span>
        </div>
        <div className="mb-4 flex justify-between text-xl">
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
          <FileUpload
            mode="advanced"
            cancelLabel="Cancelar"
            chooseLabel="Elegir Imagen"
            uploadLabel="Subir Imagen"
            customUpload
            uploadHandler={uploadHandler}
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
