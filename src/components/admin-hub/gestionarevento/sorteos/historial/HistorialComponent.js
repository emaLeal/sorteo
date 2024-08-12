"use client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import Header from "./HistorialHeader";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const HistorialComponent = ({ data }) => {
  const router = useRouter();

  useEffect(() => {
    setInterval(() => {
      router.refresh();
    }, 12000);
  }, []);

  return (
    <DataTable value={data.data} header={<Header />}>
      <Column field="nombre" header="Nombre" />
      <Column field="cedula" header="Participante" />
      <Column field="sorteo_nombre" header="Nombre de Sorteo" />
      <Column field="nombre_evento" header="Nombre de Evento" />
    </DataTable>
  );
};

export default HistorialComponent;
