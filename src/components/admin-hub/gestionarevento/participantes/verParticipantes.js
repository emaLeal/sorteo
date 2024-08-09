"use client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import HabilitarButton from "./HabilitarButton";
import { useRouter } from "next/navigation";
import Template from "@/lib/template";
import Header from "./HeaderParticipantes";
import Footer from "./FooterParticipantes";
import { PDFDownloadLink } from "@react-pdf/renderer";

const VerParticipantes = ({ evento, data, nombre_evento, nombre_empresa }) => {
  const router = useRouter();
  const toast = useRef(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [participar, setParticipar] = useState("");
  const [cargo, setCargo] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [selectedParticipantes, setSetlectedParticipantes] = useState([]);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: { value: null, matchMode: FilterMatchMode.CONTAINS },
    cargo: { value: null, matchMode: FilterMatchMode.EQUALS },
    participara: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  React.useEffect(() => {
    setIsClient(true);
  }, []);

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
        <Button
          rounded
          severity="danger"
          tooltip="Eliminar Participante"
          icon="pi pi-trash"
          text
          raised
          onClick={() => eliminarParticipante(rowData.id)}
          className="mr-2"
        />
        {isClient && (
          <>
            <PDFDownloadLink
              document={
                <Template
                  participante={rowData}
                  nombre_evento={nombre_evento}
                  nombre_empresa={nombre_empresa}
                />
              }
              fileName={rowData.cedula}
            >
              <Button
                tooltip="Descargar Qr"
                tooltipOptions={{ position: "left" }}
                icon="pi pi-qrcode"
                text
                raised
                rounded
                severity="help"
              />
            </PDFDownloadLink>
            <Button
              severity="primary"
              icon="pi pi-eye"
              text
              rounded
              raised
              className="sm:hidden mx-2"
            />
          </>
        )}
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
      <Toast ref={toast} />

      <DataTable
        value={data}
        header={
          <Header
            globalFilterValue={globalFilterValue}
            setGlobalFilterValue={setGlobalFilterValue}
            filters={filters}
            setFilters={setFilters}
            participar={participar}
            setParticipar={setParticipar}
            setCargo={setCargo}
            cargo={cargo}
            evento={evento}
            data={data}
            router={router}
            toast={toast}
            nombre_empresa={nombre_empresa}
            nombre_evento={nombre_evento}
            selectedParticipantes={selectedParticipantes}
          />
        }
        footer={<Footer data={data} router={router} evento={evento} />}
        emptyMessage="No se encontraron participantes"
        rows={3}
        selectionMode={"checkbox"}
        selection={selectedParticipantes}
        onSelectionChange={(e) => setSetlectedParticipantes(e.value)}
        globalFilterFields={["nombre", "participara"]}
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Participantes"
        paginator
        filters={filters}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column field="nombre" header="Nombre Participante" />
        <Column
          field="cedula"
          header="Cedula de Participante"
          className="max-sm:hidden"
        />
        <Column
          field="correo"
          header="Correo Participante"
          className="max-sm:hidden"
        />
        <Column
          field="cargo"
          header="Cargo Participante"
          className="max-sm:hidden"
        />
        <Column
          header="Foto del Participante"
          body={imgBody}
          className="max-sm:hidden"
        />
        <Column header="Acciones" body={Acciones} />
      </DataTable>
    </>
  );
};

export default VerParticipantes;
