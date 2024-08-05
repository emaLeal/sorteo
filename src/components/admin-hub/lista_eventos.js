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
import QrCode from "./QrCode";
import ConfiguracionEvento from "./ConfiguracionEvento";

const ListaEventos = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [visibleQr, setVisibleQr] = useState(false);
  const [eventoData, setEventoData] = useState(undefined);
  const [prevData, setPrevData] = useState(null);
  const [configEventoVisible, setConfigEventoVisible] = useState(false);
  const [invitacionVisible, setInvitacionVisible] = useState(false);
  const [idEvento, setIdEvento] = useState(0);
  const toast = useRef(null);
  const router = useRouter();

  const dialog = (id) => {
    confirmDialog({
      header: "Configurar Evento?",
      message:
        "¿Quiere configurar el evento para que cada sorteo muestre una caracteristica predeterminada?",
      acceptLabel: "Configurar Evento",
      acceptIcon: "pi pi-wrench",
      acceptClassName:
        "p-button p-button-help p-button-raised p-button-rounded p-button-text",
      accept: () => {
        setIdEvento(id);
        setConfigEventoVisible(!configEventoVisible);
      },
      rejectLabel: "Configurar Cada sorteo Individualmente",
      rejectClassName:
        "p-button p-button-warning p-button-raised p-button-rounded p-button-text",
      rejectIcon: "pi pi-cog",
      reject: () => router.push(`/jugarevento/${id}`),
    });
  };

  const getParticipantesExclusivos = async (sorteo) => {
    const url = `/api/sorteos_ex/${sorteo}`;
    const res = await fetch(url);
    if (res.ok) {
      const json = await res.json();
      const data = json.data.map((participante) => {
        delete participante.evento_id;
        delete participante.sorteo_id;
        delete participante.foto;
        delete participante.id;
        participante.asistencia = participante.habilitado === 1 ? "SÍ" : "NO";
        delete participante.habilitado;
        return participante;
      });
      return data;
    }
  };

  const getAllSorteos = async (id) => {
    const url = `/api/sorteos/${id}`;
    const res = await fetch(url);
    if (res.ok) {
      const json = await res.json();
      return json;
    }
  };

  const getAllParticipantes = async (id) => {
    const url = `/api/participante/${id}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Error fetching participantes");
    }
    const json = await res.json();

    const allData = json.data.map((part) => {
      part.asistencia = part.participara === 1 ? "SÍ" : "NO";
      delete part.participara;
      part.acepta_terminos = part.acepta === 1 ? "SÍ" : "NO";
      delete part.acepta;
      delete part.id;
      delete part.evento_id;
      delete part.foto;
      return part;
    });

    return allData;
  };

  const downloadXlsx = async (rowData) => {
    try {
      const idEvento = rowData.id;
      const nombreEvento = rowData.nombre_evento;
      const work = utils.book_new();

      // Participantes
      const transformedData = await getAllParticipantes(idEvento);
      const workSheetParticipantes = utils.json_to_sheet(transformedData);
      utils.book_append_sheet(work, workSheetParticipantes, "Participantes");

      // Sorteos Exclusivos
      const allSorteos = await getAllSorteos(idEvento);

      const exclusivos = allSorteos.data.map(async (sorteo) => {
        let participantesExclusivosSorteo = await getParticipantesExclusivos(
          sorteo.id
        );

        const workSheetParticipantesExclusivos = utils.json_to_sheet(
          participantesExclusivosSorteo
        );

        return {
          ...workSheetParticipantesExclusivos,
          nombre_sorteo: sorteo.nombre,
        };
      });

      const allExclusivos = await Promise.all(exclusivos);
      allExclusivos.forEach((el) => {
        utils.book_append_sheet(work, el, el.nombre_sorteo);
      });

      const buffer = write(work, { type: "array", bookType: "xlsx" });
      saveAsExcel(buffer, `Participantes de evento ${nombreEvento}`);
    } catch (error) {
      console.error(error);
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
        <Link href={`/admin-hub/gestionarevento/${rowData.id}`}>
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
        <Button
          text
          rounded
          raised
          onClick={() => dialog(rowData.id)}
          severity="success"
          icon="pi pi-step-forward"
          tooltip="Jugar evento"
          className="max-sm:hidden hover:scale-110 transition-transform"
        />
        <Button
          text
          rounded
          raised
          severity="secondary"
          icon="pi pi-qrcode"
          tooltip="Qr para Registro"
          className="max-sm:hidden hover:scale-110 transition-transform"
          onClick={() => onHideQr(rowData)}
        />
        <Button
          text
          severity="help"
          tooltip="Exportar Participantes"
          icon="pi pi-file-export"
          rounded
          raised
          className="max-sm:hidden hover:scale-110 transition-transform mx-2"
          onClick={() => downloadXlsx(rowData)}
        />
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

  const onHideQr = (data) => {
    if (data !== undefined) {
      setEventoData(data);
    }
    setVisibleQr(!visibleQr);
  };

  const onHide = () => {
    setVisible(!visible);
  };

  return (
    <>
      <ConfiguracionEvento
        visible={configEventoVisible}
        onHide={() => setConfigEventoVisible(!configEventoVisible)}
        id={idEvento}
      />
      <ConfirmDialog />
      <QrCode onHide={onHideQr} visible={visibleQr} evento_data={eventoData} />
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
