/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Header from "./Header";
import { useRouter } from "next/navigation";

const HistorialComponent = ({ data, evento_id }) => {
  const router = useRouter();
  useEffect(() => {
    setInterval(() => {
      router.refresh();
    }, 12000);
  }, []);

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
