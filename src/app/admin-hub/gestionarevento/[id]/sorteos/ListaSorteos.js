"use client";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import CrearSorteoDialog from "./CrearSorteoDialog";

const ListaSorteos = ({ data, evento }) => {
  const [visible, setVisible] = useState(false);
  const [sorteos, setSorteos] = useState(data);
  const [visibleS, setVisibleS] = useState(false);
  const [prevData, setPrevData] = useState(null);
  const toast = useRef(null);

  const onHideS = () => {
    setVisibleS(!visibleS)
  };

  const header = () => {
    return (
      <div className="flex justify-between">
        <span className="font-bold self-center text-xl">Lista de Sorteos</span>
        <Button
          icon="pi pi-plus"
          className="p-button p-button-success p-button-text"
          tooltip="Crear Sorteo"
          onClick={() => {
            setPrevData(null);
            setVisible(!visible);
          }}
        />
      </div>
    );
  };

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
          onClick={(rowData) => del(rowData.id)}
        />
        <Button
          className="p-button p-button-secondary p-button-rounded"
          icon="pi pi-right-arrow"
          tooltip="Jugar Sorteo"
          onClick={() => setVisibleS(!visibleS)}
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
              severity: "danger",
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
    return <Checkbox checked={rowData.jugado} disabled />;
  };

  const onHide = () => setVisible(!visible);

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
          value={sorteos}
          header={header}
          emptyMessage="No se encontraron sorteos"
        >
          <Column field="nombre" header="Nombre Evento" />
          <Column field="jugado" header="Sorteo Jugado" body={sorteoJugado} />
          <Column body={Acciones} header="Acciones" />
        </DataTable>
      </div>
    </>
  );
};

export default ListaSorteos;
