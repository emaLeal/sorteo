"use client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import Header from "./HistorialHeader";
import React from "react";

const HistorialComponent = ({ data }) => {
  return (
    <DataTable value={data.data} header={<Header />}>
      <Column field="nombre" />
      <Column field="cedula" />
      <Column field="nombre_sorteo" />
      <Column field="nombre_evento" />
    </DataTable>
  );
};

export default HistorialComponent;
