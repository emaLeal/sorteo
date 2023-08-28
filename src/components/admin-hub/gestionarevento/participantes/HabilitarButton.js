import React from "react";
import { Button } from "primereact/button";
import { habilitar, descalificar } from "./ParticipantesActions";
import { useRouter } from "next/navigation";

const HabilitarButton = ({ rowData }) => {
  const router = useRouter();
  return (
    <Button
      className="p-button mr-2"
      rounded
      raised
      text
      severity={rowData.participara === 1 ? "success" : "danger"}
      tooltip={rowData.participara === 1 ? "Descalificar" : "Habilitar usuario"}
      icon={`pi ${
        rowData.participara === 1 ? "pi-check-circle" : "pi-times-circle"
      }`}
      onClick={
        rowData.participara === 1
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
