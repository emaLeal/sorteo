"use client";
import Image from "next/image";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import Header from "./HeaderParticipantesExclusivos";
import Footer from "./FooterParticipantesExclusivos";
import HabilitarButton from "./HabilitarButton";

const ParticipantesExclusivos = ({ data, evento_id, sorteo_id }) => {
  const imgBody = (rowData) => {
    return (
      <Image
        src={
          rowData.foto === "/user.png"
            ? rowData.foto
            : `/api/foto${rowData.foto}`
        }
        alt={rowData.nombre}
        width={75}
        height={75}
      />
    );
  };

  const Acciones = (rowData) => {
    return (
      <>
        <HabilitarButton rowData={rowData} />
      </>
    );
  };
  return (
    <>
      <DataTable
        value={data}
        emptyMessage="No se encontraron Participantes"
        header={<Header evento_id={evento_id} sorteo_id={sorteo_id} />}
        footer={<Footer data={data} evento={evento_id} sorteo_id={sorteo_id} />}
        paginator
        rows={3}
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Sorteos"
      >
        <Column field="nombre" header="Nombre Participante" />
        <Column field="cedula" header="Cedula de Participante" />
        <Column field="correo" header="Correo Participante" />
        <Column field="cargo" header="Cargo Participante" />
        <Column header="Foto del Participante" body={imgBody} />
        <Column body={Acciones} header="Acciones" />
      </DataTable>
    </>
  );
};

export default ParticipantesExclusivos;
