"use client";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Skeleton } from "primereact/skeleton";

export default function loading() {
  const items = Array.from({ length: 2 }, (v, i) => i);

  const bodyTemplate = () => {
    return <Skeleton></Skeleton>;
  };
  return (
    <div className="my-12 sm:mx-0 sm:my-0">
      <DataTable value={items} header="Lista de Sorteos" body={bodyTemplate}>
        <Column
          field="nombre"
          header="Nombre Participante"
          body={bodyTemplate}
        />
        <Column
          field="cedula"
          header="Cedula de Participante"
          body={bodyTemplate}
        />
        <Column
          field="correo"
          header="Correo Participante"
          body={bodyTemplate}
        />
        <Column field="cargo" header="Cargo Participante" body={bodyTemplate} />
        <Column header="Foto del Participante" body={bodyTemplate} />
        <Column header="Acciones" body={bodyTemplate} />
      </DataTable>
    </div>
  );
}
