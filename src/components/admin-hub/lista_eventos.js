"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { write, utils } from "xlsx";
import { Button } from "primereact/button";
import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import Image from "next/image";
import CrearEventoDialog from "./crear-evento-dialog";
import Link from "next/link";
import InvitacionDialog from "./invitaciondialog";
import { useRouter } from "next/navigation";
import Header from "./HeaderEventos";
import { updateShowImage } from "./action";

const ListaEventos = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [eventoData, setEventoData] = useState(undefined);
  const [prevData, setPrevData] = useState(null);
  const [invitacionVisible, setInvitacionVisible] = useState(false);
  const toast = useRef(null);
  const router = useRouter();

  const downloadXlsx = async (rowData) => {
    const idEvento = rowData.id;
    const nombreEvento = rowData.nombre_evento;
    const res = await fetch(`/api/participante/${idEvento}`);
    if (res.ok) {
      try {
        const participantes = await res.json();
        const data = participantes.data.map((part) => {
          if (part.participara === 1) {
            part.participara = "ATENDIÒ EL EVENTO";
          } else {
            part.participara = "NO ATENDIÒ EL EVENTO";
          }
          if (part.acepta === 1) {
            part.acepta = "ACEPTÒ TERMINOS Y CONDICIONES";
          } else {
            part.acepta = "NO ACEPTÒ TERMINOS Y CONDICIONES";
          }
          return part;
        });
        const work = utils.book_new();

        for (let key in data) {
          const workSheet = utils.json_to_sheet(data);
          utils.book_append_sheet(work, workSheet, key);
        }

        const wri = write(work, { type: "array", bookType: "xlsx" });
        saveAsExcel(wri, `Participantes de evento ${nombreEvento}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  function saveAsExcel(buffer, nombre) {
    const EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const EXCEL_EXTENSION = ".xlsx";
    const download = window.document.createElement("a");
    download.href = window.URL.createObjectURL(
      new Blob([buffer], { type: EXCEL_TYPE })
    );
    download.download = nombre + EXCEL_EXTENSION;
    document.body.appendChild(download);
    download.click();
    document.body.removeChild(download);
  }

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
        <Button
          text
          severity="help"
          tooltip="Exportar Participantes"
          icon="pi pi-file-export"
          rounded
          className="mx-2"
          onClick={() => downloadXlsx(rowData)}
        />
        {rowData.mostrar_foto_empresa === 1 ? (
          <Button
            text
            tooltip="Ocultar Foto de Empresa"
            tooltipOptions={{ position: "bottom" }}
            icon="pi pi-eye-slash"
            rounded
            severity="success"
            raised
            onClick={() =>
              updateShowImage(rowData.mostrar_foto_empresa, rowData.id)
            }
          />
        ) : (
          <Button
            text
            tooltip="Mostrar Foto de Empresa"
            tooltipOptions={{ position: "bottom" }}
            icon="pi pi-eye"
            rounded
            severity="danger"
            raised
            onClick={() =>
              updateShowImage(rowData.mostrar_foto_empresa, rowData.id)
            }
          />
        )}
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
      <div className="my-12 sm:mx-4 sm:my-12">
        <DataTable
          value={data}
          header={
            <Header
              setPrevData={setPrevData}
              setVisible={setVisible}
              visible={visible}
            />
          }
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
