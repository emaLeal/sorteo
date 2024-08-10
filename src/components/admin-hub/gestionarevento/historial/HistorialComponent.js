"use client";
import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Header from "./Header";

const HistorialComponent = ({ data, evento_id }) => {
  return (
    <DataTable
      value={data.data}
      header={<Header data={data} evento_id={evento_id} />}
    >
      <Column field="nombre" header="Nombre" />
      <Column field="cedula" header="Nombre" />
      <Column field="nombre_evento" header="Nombre del Evento" />
    </DataTable>
  );
};

export default HistorialComponent;
