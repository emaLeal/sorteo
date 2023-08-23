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

import DetalleSorteoDialog from "./DetalleSorteoDialog";
import { useRouter } from "next/navigation";

const ListaSorteos = ({ evento, data }) => {
  const [visible, setVisible] = useState(false);
  const [visibleDetalle, setVisibleDetalle] = useState(false);
  const [prevData, setPrevData] = useState(null);
  const [sorteoData, setSorteoData] = useState(null);
  const toast = useRef(null);
  const router = useRouter()

  const header = () => {
    return (
      <div className="flex justify-between">
        <span className="font-bold self-center text-xl">Lista de Sorteos</span>
        <Button
          icon="pi pi-plus"
          className="p-button p-button-success p-button-text"
          tooltip="Crear Sorteo"
          tooltipOptions={{ position: "bottom" }}
          onClick={() => {
            setPrevData();
            setVisible(!visible);
          }}
        />
      </div>
    );
  };

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
        {rowData.jugado === 0 && (
          <Button
            icon="pi pi-pencil"
            tooltip="Editar Sorteo"
            tooltipOptions={{ position: "bottom" }}
            className="mr-2"
            rounded
            raised
            severity="warning"
            text
            onClick={() => edit(rowData)}
          />
        )}
        <Button
          rounded
          text
          raised
          severity="danger"
          icon="pi pi-trash"
          tooltip="Eliminar Sorteo"
          tooltipOptions={{ position: "bottom" }}
          className="mr-2"
          onClick={() => del(rowData.id)}
        />
        <Button
          text
          rounded
          raised
          severity="secondary"
          icon="pi pi-eye"
          tooltipOptions={{ position: "bottom" }}
          tooltip={"Ver Datos Sorteo"}
          onClick={() => showDetalle(rowData)}
        />
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
            router.refresh()
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
      <div className="mt-6 sm:mx-28 sm:my-12">
        <DataTable
          value={data}
          header={header}
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
