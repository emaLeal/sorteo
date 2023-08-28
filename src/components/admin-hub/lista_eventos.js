"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import Image from "next/image";
import CrearEventoDialog from "./crear-evento-dialog";
import Link from "next/link";
import InvitacionDialog from "./invitaciondialog";
import { useRouter } from "next/navigation";

const ListaEventos = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [eventoData, setEventoData] = useState(undefined);
  const [prevData, setPrevData] = useState(null);
  const [invitacionVisible, setInvitacionVisible] = useState(false);
  const toast = useRef(null);
  const router = useRouter();

  const header = () => {
    return (
      <div className="flex justify-between">
        <span className="font-bold self-center text-xl">Lista de Eventos</span>
        <div>
          <Button
            icon="pi pi-plus"
            text
            severity="success"
            className="hover:scale-110 transition-transform"
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
      <div className="max-sm:flex">
        <Button
          rounded
          raised
          text
          severity="warning"
          icon="pi pi-pencil"
          tooltip="Editar Evento"
          className="sm:mr-2 hover:scale-110 transition-transform"
          onClick={() => edit(rowData)}
        />
        <Button
          rounded
          raised
          text
          severity="danger"
          icon="pi pi-trash"
          tooltip="Eliminar Evento"
          className=" sm:mr-2 hover:scale-110 transition-transform"
          onClick={() => del(rowData.id)}
        />
        <Link
          href={`/admin-hub/gestionarevento/${rowData.id}`}
          className="max-sm:hidden"
        >
          <Button
            rounded
            raised
            text
            severity="info"
            icon="pi pi-calendar"
            className=" mr-2 hover:scale-110 transition-transform"
            tooltip="Gestionar Evento"
          />
        </Link>
        <Button
          rounded
          raised
          severity="help"
          text
          tooltip="Ver QR de invitación"
          icon="pi pi-qrcode"
          className=" mr-2 hover:scale-110 transition-transform"
          onClick={() => onHideInvitacion(rowData)}
        />
        <Link href={`/jugarevento/${rowData.id}`}>
          <Button
            text
            rounded
            raised
            severity="success"
            icon="pi pi-step-forward"
            tooltip="Jugar evento"
            className="max-sm:hidden hover:scale-110 transition-transform"
          />
        </Link>
      </div>
    );
  };

  const del = (id) => {
    confirmDialog({
      header: "Eliminar Evento",
      message: "Estas seguro que quieres eliminar este evento?",
      accept: () => {
        fetch(`api/eventos/${id}`, {
          method: "DELETE",
        }).then((resp) => {
          if (resp.status === 200) {
            toast.current.show({
              severity: "error",
              summary: "Evento Eliminado",
              detail: "Se ha eliminado el evento",
              life: 3000,
            });
            router.refresh();
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
        src={`/api/foto${rowData.foto_evento}`}
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

  const onHide = () => {
    setVisible(!visible);
  };

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
      <div className="my-12 sm:mx-28 sm:my-12">
        <DataTable
          value={data}
          header={header}
          rows={2}
          paginator
          emptyMessage="No se encontraron eventos"
        >
          <Column field="nombre_evento" header="Nombre Evento" />
          <Column field="empresa" header="Empresa" className="max-sm:hidden" />
          <Column header="Foto de Evento" body={imgBody} />
          <Column body={Acciones} header="Acciones" />
        </DataTable>
      </div>
    </>
  );
};

export default ListaEventos;
