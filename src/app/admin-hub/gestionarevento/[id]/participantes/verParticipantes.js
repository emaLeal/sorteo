"use client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FileUpload } from "primereact/fileupload";
import { read, utils } from "xlsx";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Toast } from "primereact/toast";
import useSWR from "swr";
import { fetcher } from "@/app/lib/fetcher";
import { Button } from "primereact/button";
import { MoonLoader } from "react-spinners";

const VerParticipantes = ({ evento }) => {
  const toast = useRef(null);
  const { data, error, mutate, isLoading } = useSWR(
    `/api/participante/${evento}`,
    fetcher
  );

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
          cedula: row.cedula,
        };
        participantes.push(dataEl);
      });
      console.log(participantes);

      fetch("/api/participantes", {
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

  const descalificar = (id) => {
    fetch(`/api/descalificar/${id}`, { method: "PUT" }).then((res) => {});
  };

  const habilitar = (id) => {
    fetch(`/api/habilitar/${id}`, { method: "PUT" }).then((res) => {});
  };

  const Acciones = (rowData) => {
    return (
      <>
        <Button
          className="p-button p-button-primary p-button-rounded mr-2"
          tooltip={
            rowData.participara === 1 ? "Descalificar" : "Habilitar usuario"
          }
          icon={`pi ${
            rowData.participara === 1 ? "pi-circle-fill" : "pi-circle"
          }`}
          onClick={() =>
            rowData.participara === 1
              ? descalificar(rowData.id)
              : habilitar(rowData.id)
          }
        />
        <Button
          className="p-button p-button-danger p-button-rounded"
          tooltip="Eliminar Participante"
          icon="pi pi-trash"
          onClick={() => eliminarParticipante(rowData.id)}
        />
      </>
    );
  };

  const eliminarParticipante = (id) => {
    fetch(`/api/participante/${id}`, { method: "DELETE" }).then((res) => {
      if (res.status === 200) {
        toast.current.show({
          severity: "error",
          summary: "Participante eliminado",
          detail: "Se ha eliminado el participante",
          life: 3000,
        });
      }
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="mx-28 my-4">
        <DataTable
          value={data === undefined ? [] : data.data}
          header={header}
          emptyMessage="No se encontraron participantes"
          rows={3}
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Participantes"
          paginator
        >
          <Column field="nombre" header="Nombre Participante" />
          <Column field="cedula" header="Cedula de Participante" />
          <Column field="correo" header="Correo Participante" />
          <Column field="cargo" header="Cargo Participante" />
          <Column header="Foto del Participante" body={imgBody} />
          <Column header="Acciones" body={Acciones} />
        </DataTable>
      </div>
    </>
  );
};

export default VerParticipantes;
