"use client";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FileUpload } from "primereact/fileupload";
import { read, utils } from "xlsx";
import React, { useRef } from "react";
import Image from "next/image";
import { Toast } from "primereact/toast";

const VerParticipantes = ({ participantData, evento }) => {
  const toast = useRef(null)

  const onUpload = ({ files }) => {
    const [file] = files;
    console.log(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const bsrt = e.target.result;
      const wb = read(bsrt, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = utils.sheet_to_json(ws);
      const participantes = [];
      /* Update state */
      data.forEach((row) => {
        const dataEl = {
          nombre: row.nombre,
          cargo: row.cargo,
          evento_id: evento,
          correo: row.correo,
          cedula: row.cedula
        };
        participantes.push(dataEl);
      });
      console.log(participantes);

      fetch("http://localhost:3000/api/participantes", {
        method: "POST",
        body: JSON.stringify(participantes),
        headers: {
          "Content-type": "application/json",
        },
      }).then((res) => {
        if (res.status === 201) {
          toast.current.show({
            severity: "success",
            summary: "Participantes Creados",
            detail: "Se han subido correctamente los participantes",
            life: 3000,
          });
        }
      });
    };
    reader.readAsBinaryString(file);
  };

  const imgBody = (rowData) => {
    return (
      <Image src={rowData.foto} alt={rowData.nombre} width={75} height={75} />
    );
  };

  const header = () => {
    return (
      <div className="flex justify-between">
        <span className="font-bold self-center text-xl">
          Lista de Participantes
        </span>
        <div className="flex ">
          <FileUpload
            mode="basic"
            name="demo[]"
            accept="xlsx/*"
            customUpload={true}
            maxFileSize={1000000}
            uploadHandler={onUpload}
            auto
            chooseLabel="Subir Varios Participantes"
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="mx-28 my-4">
        <DataTable
          value={participantData}
          header={header}
          emptyMessage="No se encontraron participantes"
          rows={3}
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Roles"
          paginator
        >
          <Column field="nombre" header="Nombre Participante" />
          <Column field="cedula" header='Cedula de Participante' />
          <Column field="correo" header="Correo Participante" />
          <Column field="cargo" header="Cargo Participante" />
          <Column header="Foto del Participante" body={imgBody} />
        </DataTable>
      </div>
    </>
  );
};

export default VerParticipantes;
