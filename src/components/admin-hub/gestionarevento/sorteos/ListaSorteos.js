"use client";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import CrearSorteoDialog from "./CrearSorteoDialog";
import Image from "next/image";
import Header from "./HeaderSorteos";
import DetalleSorteoDialog from "./DetalleSorteoDialog";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useMobile from "@/hooks/useMobile";

const ListaSorteos = ({ evento, data }) => {
  const [visible, setVisible] = useState(false);
  const [visibleDetalle, setVisibleDetalle] = useState(false);
  const [prevData, setPrevData] = useState(null);
  const [sorteoData, setSorteoData] = useState(null);
  const toast = useRef(null);
  const router = useRouter();
  const isMobile = useMobile();

  const onHideDetalle = () => {
    setVisibleDetalle(!visibleDetalle);
  };

  const showDetalle = (data) => {
    setVisibleDetalle(!visibleDetalle);
    setSorteoData(data);
    console.log(data);
  };

  const Acciones = (rowData) => {
    return (
      <div>
        {!isMobile && rowData.jugado === 0 && (
          <Button
            icon="pi pi-pencil"
            tooltip="Editar Sorteo"
            tooltipOptions={{ position: "bottom" }}
            className="mx-2"
            rounded
            raised
            severity="warning"
            text
            onClick={() => edit(rowData)}
          />
        )}
        {!isMobile && (
          <>
            <Button
              rounded
              text
              raised
              severity="danger"
              icon="pi pi-trash"
              tooltip="Eliminar Sorteo"
              tooltipOptions={{ position: "bottom" }}
              className="mx-2"
              onClick={() => del(rowData.id)}
            />
            <Button
              text
              raised
              rounded
              tooltip="Copiar invitacion de descarga de qr"
              icon="pi pi-qrcode"
              className="mx-2 hover:scale-110 transition-transform"
              tooltipOptions={{ position: "left" }}
              onClick={() =>
                navigator.clipboard.writeText(
                  `eventos.smartie.com.co/certificados/${rowData.evento_id}/${rowData.id}`
                )
              }
            />
            <Link
              href={`https://eventos.smartie.com.co/certificados/${rowData.evento_id}/${rowData.id}`}
              target="_blank"
            >
              <Button
                text
                raised
                rounded
                severity="help"
                tooltip="Ir al link de invitacion de descarga de qr"
                icon="pi pi-qrcode"
                className="mx-2 hover:scale-110 transition-transform"
                tooltipOptions={{ position: "left" }}
              />
            </Link>
          </>
        )}
        <Button
          text
          rounded
          raised
          severity="secondary"
          className="mx-2"
          icon="pi pi-eye"
          tooltipOptions={{ position: "bottom" }}
          tooltip={"Ver Datos Sorteo"}
          onClick={() => showDetalle(rowData)}
        />
        <Link
          href={`/admin-hub/gestionarevento/${rowData.evento_id}/sorteos/exclusividad_sorteo/${rowData.id}`}
        >
          <Button
            text
            rounded
            raised
            severity="help"
            tooltip="Gestionar Participantes exlusivos del sorteo"
            tooltipOptions={{ position: "bottom" }}
            icon="pi pi-users"
            className="mx-2"
          />
        </Link>
      </div>
    );
  };

  const del = (id) => {
    confirmDialog({
      header: "Eliminar Evento",
      message: "Estas seguro que quieres eliminar este evento?",
      acceptLabel: "Eliminar",
      rejectLabel: "No",
      accept: () => {
        fetch(`/api/sorteo/${id}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.status === 200) {
            toast.current.show({
              severity: "error",
              summary: "Sorteo Eliminado",
              detail: "Se ha eliminado el sorteo",
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

  const sorteoJugado = (rowData) => {
    return <Checkbox checked={rowData.jugado === 1} disabled />;
  };

  const onHide = () => {
    setVisible(!visible);
  };

  const imgPremio = (rowData) => {
    return (
      <Image
        width={100}
        height={100}
        alt={rowData.premio}
        src={`/api/foto${rowData.premio_foto}`}
      />
    );
  };

  return (
    <>
      <ConfirmDialog />
      <Toast ref={toast} />
      <DetalleSorteoDialog
        visible={visibleDetalle}
        onHide={onHideDetalle}
        rowData={sorteoData}
      />
      <CrearSorteoDialog
        evento={evento}
        visible={visible}
        onHide={onHide}
        data={prevData}
      />
      <div className="mt-6 sm:mx-0 sm:mt-0">
        <DataTable
          value={data}
          header={
            <Header
              visible={visible}
              setPrevData={setPrevData}
              setVisible={setVisible}
            />
          }
          paginator
          rows={2}
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Sorteos"
          emptyMessage="No se encontraron sorteos"
        >
          <Column field="nombre" header="Nombre Sorteo" />
          <Column
            field="jugado"
            header="Sorteo Jugado"
            body={sorteoJugado}
            className="max-sm:hidden"
          />
          <Column
            field="premio"
            header="Premio del Sorteo"
            className="max-sm:hidden"
          />
          <Column header="Imagen del Premio" body={imgPremio} />
          <Column body={Acciones} header="Acciones" />
        </DataTable>
      </div>
    </>
  );
};

export default ListaSorteos;
