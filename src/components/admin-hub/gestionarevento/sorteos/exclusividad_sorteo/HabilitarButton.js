import React from "react";
import { useRouter } from "next/navigation";
import { habilitar, descalificar } from "./Acciones";
import { Button } from "primereact/button";

const HabilitarButton = ({ rowData }) => {
  const router = useRouter();
  return (
    <Button
      className="p-button mr-2"
      rounded
      raised
      text
      severity={rowData.habilitado === 1 ? "success" : "danger"}
      tooltip={rowData.habilitado === 1 ? "Descalificar" : "Habilitar usuario"}
      tooltipOptions={{ position: "bottom" }}
      icon={`pi ${
        rowData.habilitado === 1 ? "pi-check-circle" : "pi-times-circle"
      }`}
      onClick={
        rowData.habilitado === 1
          ? () => {
              descalificar(rowData);
              router.refresh();
            }
          : () => {
              habilitar(rowData);
              router.refresh();
            }
      }
    />
  );
};

export default HabilitarButton;
