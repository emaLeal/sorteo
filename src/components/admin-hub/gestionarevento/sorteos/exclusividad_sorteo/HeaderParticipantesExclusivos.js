import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";

const Header = ({ evento_id, sorteo_id }) => {
  const router = useRouter();
  const toast = useRef();
  const quitarParticipantes = () => {
    confirmDialog({
      header: "Quitar Participantes",
      message: "Quiere quitar todos los participantes de este sorteo?",
      acceptLabel: "Quitar Participantes",
      acceptIcon: "pi pi-trash",
      acceptClassName:
        "p-button p-button-danger p-button-rounded p-button-raised p-button-text",
      accept: () => acceptQuitar(),
      rejectLabel: "Cancelar",
      rejectIcon: "pi pi-times",
      rejectClassName:
        "p-button p-button-secondary p-button-rounded p-button-raised p-button-text",
    });
  };

  const acceptQuitar = async () => {
    const url = `/api/sorteos_ex`;
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        sorteo: sorteo_id,
      }),
    });

    if (res.ok) {
      router.refresh();
      toast.current.show({
        severity: "error",
        summary: "Participantes quitados",
        detail: "Se han eliminado todos los participantes del sorteo",
        life: 3000,
      });
    }
  };
  return (
    <>
      <Toast ref={toast} />

      <div className="flex justify-between content-center">
        <span className="font-bold text-lg">
          Lista de Participantes del Sorteo
        </span>
        <div>
          <Button
            text
            raised
            rounded
            icon="pi pi-trash"
            severity="danger"
            tooltip="Quitar Participantes del Sorteo"
            tooltipOptions={{ position: "left" }}
            label="Quitar Participantes"
            onClick={() => quitarParticipantes()}
          />
          <Link href={`/admin-hub/gestionarevento/${evento_id}/sorteos/`}>
            <Button
              label="Volver"
              severity="secondary"
              text
              rounded
              raised
              tooltip="Volver a lista de sorteos"
              tooltipOptions={{ position: "left" }}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
