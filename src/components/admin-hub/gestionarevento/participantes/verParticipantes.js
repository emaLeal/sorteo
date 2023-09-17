"use client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FileUpload } from "primereact/fileupload";
import { read, utils } from "xlsx";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Toast } from "primereact/toast";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import CrearParticipantes from "./CrearParticipantes";
import HabilitarButton from "./HabilitarButton";
import { useRouter } from "next/navigation";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const VerParticipantes = ({ evento, data }) => {
  const router = useRouter();
  const toast = useRef(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: { value: null, matchMode: FilterMatchMode.CONTAINS },
    participara: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [participar, setParticipar] = useState("");
  const [visible, setVisible] = useState(false);

  const options = [
    { label: "Habilitado", value: "1" },
    { label: "No habilitado", value: "0" },
    { label: "Cancelar Filtro", value: null },
  ];

  const footer = () => {
    return (
      <>
        <div className="flex justify-around">
          <span>
            Participantes Registrados:{" "}
            {
              data.filter((participante) => participante.participara === 1)
                .length
            }
          </span>
          <span>
            Participantes faltantes por Registrar:{" "}
            {
              data.filter((participante) => participante.participara === 0)
                .length
            }
          </span>
        </div>
      </>
    );
  };

  const delParticipantes = async () => {
    try {
      const res = await fetch(`/api/participantes/${evento}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
        toast.current.show({
          severity: "error",
          summary: "Participantes eliminados",
          detail: "Se han eliminado todos los participantes",
          life: 3000,
        });
      }
    } catch (error) {
      console.log(error)
    }
  };

  const eliminarParticipantes = () => {
    confirmDialog({
      message:
        "Estas seguro de querer eliminar todos los participantes de este evento?",
      header: "Eliminar Todos",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Eliminar Todos",
      rejectLabel: "Cancelar",
      acceptIcon: "pi pi-trash",
      rejectIcon: "pi pi-check",
      acceptClassName: "p-button p-button-danger p-button-text p-button-raised",
      rejectClassName: "p-button p-button-text p-button-raised",
      accept: async () => delParticipantes(),
    });
  };

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
          router.refresh();
        }
      });
    };
    reader.readAsBinaryString(file);
  };

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

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters[e.target.name].value = value;

    setFilters(_filters);
    if (e.target.name === "participara") {
      setParticipar(value);
    } else if (e.target.name === "nombre") {
      setGlobalFilterValue(value);
    }
  };

  const header = () => {
    return (
      <div className="flex justify-between">
        <div>
          <InputText
            placeholder="Escribe un nombre"
            value={globalFilterValue}
            name="nombre"
            onChange={onGlobalFilterChange}
          />
          <Dropdown
            options={options}
            name="participara"
            value={participar}
            onChange={onGlobalFilterChange}
            placeholder="Estado de los participantes"
          />
        </div>
        <div className="flex ">
          <Button
            className="mx-2"
            label="Eliminar Participantes"
            severity="danger"
            text
            onClick={eliminarParticipantes}
            tooltip="Eliminar todos los participantes"
            tooltipOptions={{ position: "right" }}
            size="small"
            icon="pi pi-trash"
            raised
            rounded
          />
          <FileUpload
            mode="basic"
            name="demo[]"
            accept=".xlsx"
            customUpload={true}
            maxFileSize={1000000}
            uploadHandler={onUpload}
            auto
            chooseLabel="Subir Varios Participantes"
          />
          <Button
            severity="success"
            text
            raised
            tooltip="Crear Participante"
            onClick={() => setVisible(!visible)}
            icon="pi pi-plus"
            className="mx-2"
          />
        </div>
      </div>
    );
  };

  const Acciones = (rowData) => {
    return (
      <>
        <HabilitarButton rowData={rowData} />
        <Button
          className="p-button p-button-danger p-button-rounded"
          tooltip="Eliminar Participante"
          icon="pi pi-trash"
          text
          raised
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
        router.refresh();
      }
    });
  };

  return (
    <>
      <ConfirmDialog />
      <Toast ref={toast} />
      <CrearParticipantes
        visible={visible}
        evento={evento}
        onHide={() => setVisible(!visible)}
      />
      <div className="mx-28 my-4">
        <DataTable
          value={data}
          header={header}
          footer={footer}
          emptyMessage="No se encontraron participantes"
          rows={3}
          globalFilterFields={["nombre", "participara"]}
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Participantes"
          paginator
          filters={filters}
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
