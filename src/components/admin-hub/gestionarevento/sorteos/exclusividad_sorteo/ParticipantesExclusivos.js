"use client";
import Image from "next/image";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useRef } from "react";
import Header from "./HeaderParticipantesExclusivos";
import Footer from "./FooterParticipantesExclusivos";
import HabilitarButton from "./HabilitarButton";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";

const ParticipantesExclusivos = ({ data, evento_id, sorteo_id }) => {
  const router = useRouter();
  const toast = useRef();
  const imgBody = (rowData) => {
    return (
      <Image
        src={
          rowData.foto === "/user.png"
            ? rowData.foto
            : `/api/foto${rowData.foto}`
        }
        alt={rowData.nombre}
        width={75}
        height={75}
      />
    );
  };

  const quitar = async (id) => {
    const url = `/api/sorteos_ex/${id}`;
    const res = await fetch(url, { method: "DELETE" });
    if (res.ok) {
      console.log(":D");
      toast.current.show({
        severity: "error",
        summary: "Participante quitado",
        detail: "Se ha eliminado el participante del sorteo",
        life: 3000,
      });
      router.refresh();
    }
  };

  const quitarParticipante = (id) => {
    confirmDialog({
      message: "Quiere quitar este participante de el sorteo?",
      header: "Quitar participante",
      accept: () => quitar(id),
      acceptLabel: "Quitar Participante",
      acceptClassName: "p-button p-button-raised p-button-text p-button-danger",
      acceptIcon: "pi pi-trash",
      rejectLabel: "Cancelar",
      rejectClassName:
        "p-button p-button-secondary p-button-raised p-button-text",
      rejectIcon: "pi pi-times",
    });
  };

  const Acciones = (rowData) => {
    return (
      <>
        <HabilitarButton rowData={rowData} />
        <Button
          icon="pi pi-trash"
          severity="danger"
          raised
          text
          rounded
          className="ml-2"
          tooltip="Quitar Participante"
          onClick={() => quitarParticipante(rowData.id)}
          tooltipOptions={{ position: "left" }}
        />
      </>
    );
  };
  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <DataTable
        value={data}
        emptyMessage="No se encontraron Participantes"
        header={<Header evento_id={evento_id} sorteo_id={sorteo_id} />}
        footer={<Footer data={data} evento={evento_id} sorteo_id={sorteo_id} />}
        paginator
        rows={3}
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Sorteos"
      >
        <Column field="nombre" header="Nombre Participante" />
        <Column field="cedula" header="Cedula de Participante" />
        <Column field="correo" header="Correo Participante" />
        <Column field="cargo" header="Cargo Participante" />
        <Column header="Foto del Participante" body={imgBody} />
        <Column body={Acciones} header="Acciones" />
      </DataTable>
    </>
  );
};

export default ParticipantesExclusivos;
