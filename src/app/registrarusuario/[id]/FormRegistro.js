"use client";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useRef, useState } from "react";
import RegistroDialog from "./RegistroDialog";
import { Toast } from "primereact/toast";

const FormRegistro = ({ participantes }) => {
  const toast = useRef(null);
  const [cedula, setCedula] = useState("");
  const [visible, setVisible] = useState("");
  const [data, setData] = useState(null);
  const onHide = () => setVisible(!visible);

  const getParticipante = () => {
    const participante = participantes.find(
      (participante) => participante.cedula === cedula
    );
    if (participante === undefined) {
      toast.current.show({
        severity: "error",
        summary: "Usuario no Encontrado",
        detail: "El usuario no existe",
        life: 3000,
      });
    } else {
      if (participante.participara === 1) {
        toast.current.show({
          severity: "info",
          summary: "El usuario ya ha sido registrado",
          detail: "El usuario buscado ya ha sido registrado",
          life: 3000,
        });
      } else {
        setData(participante);
        onHide();
      }
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <RegistroDialog visible={visible} onHide={onHide} data={data} />
      <InputText
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
        name="cedula"
        className="mr-2"
        placeholder="Ingresa tu cedula"
      />
      <Button
        label="Buscar Participante"
        className="p-button p-button-info "
        onClick={getParticipante}
      />
    </>
  );
};

export default FormRegistro;
