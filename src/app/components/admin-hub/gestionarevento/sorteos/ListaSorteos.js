"use client";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import CrearSorteoDialog from "./CrearSorteoDialog";
import Image from "next/image";
import useSWR from "swr";
import { fetcher } from "@/app/lib/fetcher";
import { MoonLoader } from "react-spinners";

const ListaSorteos = ({ evento }) => {
  const [visible, setVisible] = useState(false);
  const [visibleS, setVisibleS] = useState(false);
  const [prevData, setPrevData] = useState(null);
  const { data, error, mutate, isLoading } = useSWR(
    `/api/sorteos/${evento}`,
    fetcher
  );
  const toast = useRef(null);
  const onHideS = () => {
    setVisibleS(!visibleS);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      mutate();
    }, 1000);

    return () => clearInterval(interval);
  }, [mutate]);

  if (isLoading) {
    return (
      <>
        <div className="flex justify-center">
          <MoonLoader color="#fff" loading={isLoading} size={500} />;
        </div>
      </>
    );
  }

  const header = () => {
    return (
      <div className="flex justify-between">
        <span className="font-bold self-center text-xl">Lista de Sorteos</span>
        <Button
          icon="pi pi-plus"
          className="p-button p-button-success p-button-text"
          tooltip="Crear Sorteo"
          onClick={() => {
            setPrevData();
            setVisible(!visible);
          }}
        />
      </div>
    );
  };

  const detallesSorteo = (d) => console.log(d);

  const Acciones = (rowData) => {
    return (
      <div>
        <Button
          icon="pi pi-pencil"
          tooltip="Editar Sorteo"
          className="p-button mr-2 p-button-warning p-button-rounded"
          onClick={() => edit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          tooltip="Eliminar Sorteo"
          className="p-button mr-2 p-button-danger p-button-rounded"
          onClick={() => del(rowData.id)}
        />
        <Button
          className="p-button p-button-secondary p-button-rounded"
          icon="pi  pi-eye"
          tooltip={"Ver Datos Sorteo"}
          onClick={() => detallesSorteo(rowData)}
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
      <CrearSorteoDialog
        evento={evento}
        visible={visible}
        onHide={onHide}
        data={prevData}
      />
      <div className="mx-28 my-12">
        <DataTable
          value={data === undefined ? [] : data.data}
          header={header}
          paginator
          rows={2}
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Sorteos"
          emptyMessage="No se encontraron sorteos"
        >
          <Column field="nombre" header="Nombre Evento" />
          <Column field="jugado" header="Sorteo Jugado" body={sorteoJugado} />
          <Column field="premio" header="Premio del Sorteo" />
          <Column header="Imagen del Premio" body={imgPremio} />
          <Column body={Acciones} header="Acciones" />
        </DataTable>
      </div>
    </>
  );
};

export default ListaSorteos;
