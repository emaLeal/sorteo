"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useState, useRef } from "react";
import { delOne } from "../lib/fetchMethod";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import Image from "next/image";
import CrearEventoDialog from "./crear-evento-dialog";
import Link from "next/link";
import InvitacionDialog from "./invitaciondialog";

const ListaEventos = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [eventos, setEventos] = useState(data);
  const [eventoData, setEventoData] = useState(undefined);
  const [prevData, setPrevData] = useState(null);
  const [invitacionVisible, setInvitacionVisible] = useState(false);
  const toast = useRef(null);

  const header = () => {
    return (
      <div className="flex justify-between">
        <span className="font-bold self-center text-xl">Lista de Eventos</span>
        <div>
          <Button
            icon="pi pi-plus"
            className="p-button p-button-success p-button-text"
            tooltip="Crear Evento"
            onClick={() => {
              setPrevData(null);
              setVisible(!visible);
            }}
          />
        </div>
      </div>
    );
  };

  const Acciones = (rowData) => {
    return (
      <div>
        <Button
          icon="pi pi-pencil"
          tooltip="Editar Evento"
          className="p-button mr-2 p-button-warning p-button-rounded"
          onClick={() => edit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          tooltip="Eliminar Evento"
          className="p-button mr-2 p-button-danger p-button-rounded"
          onClick={(rowData) => del(rowData.id)}
        />
        <Link href={`/admin-hub/gestionarevento/${rowData.id}`}>
          <Button
            icon="pi pi-calendar"
            className="p-button p-button-primary p-button-rounded mr-2"
            tooltip="Gestionar Evento"
          />
        </Link>
        <Button
          icon="pi pi-eye"
          className="p-button p-button-primary p-button-rounded"
          onClick={() => onHideInvitacion(rowData)}
        />
      </div>
    );
  };

  const del = (id) => {
    confirmDialog({
      header: "Eliminar Evento",
      message: "Estas seguro que quieres eliminar este evento?",
      accept: () => {
        const res = delOne(`/api/sorteo/${id}`).then((resp) => {
          if (resp.status === 204) {
            toast.current.show({
              severity: "error",
              summary: "Sorteo Eliminado",
              detail: "Se ha eliminado el sorteo",
              life: 3000,
            });
          }
        });
      },
      reject: () => {},
    });
  };

  const edit = (rowData) => {
    setVisible(!visible);
    setPrevData(rowData);
  };

  const imgBody = (rowData) => {
    return (
      <Image
        alt={`${rowData.nombre}`}
        src={rowData.foto_evento}
        width={100}
        height={50}
      />
    );
  };

  const onHideInvitacion = (data) => {
    if (data !== undefined) {
      setEventoData(data);
    }
    setInvitacionVisible(!invitacionVisible);
  };

  const onHide = () => setVisible(!visible);

  return (
    <>
      <ConfirmDialog />
      <InvitacionDialog
        visible={invitacionVisible}
        onHide={onHideInvitacion}
        evento_data={eventoData}
      />
      <Toast ref={toast} />
      <CrearEventoDialog visible={visible} onHide={onHide} data={prevData} />
      <div className="mx-28 my-12">
        <DataTable
          value={eventos}
          header={header}
          emptyMessage="No se encontraron eventos"
        >
          <Column field="nombre_evento" header="Nombre Evento" />
          <Column field="empresa" header="Empresa" />
          <Column header="Foto de Evento" body={imgBody} />
          <Column body={Acciones} header="Acciones" />
        </DataTable>
      </div>
    </>
  );
};

export default ListaEventos;
