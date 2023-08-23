"use client";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Skeleton } from "primereact/skeleton";

export default async function loading() {
  const items = Array.from({ length: 2 }, (v, i) => i);

  const bodyTemplate = () => {
    return <Skeleton></Skeleton>;
  };
  return (
    <div className="my-12 sm:mx-28 sm:my-12">
      <DataTable value={items} header="Lista de Sorteos">
        <Column field="code" header="Nombre Sorteo" body={bodyTemplate} />
        <Column field="name" header="Sorteo Jugado" body={bodyTemplate} />
        <Column
          field="category"
          header="Premio del Sorteo"
          body={bodyTemplate}
        />
        <Column
          field="quantity"
          header="Imagen del Premio"
          body={bodyTemplate}
        />
        <Column field="quantity" header="Acciones" body={bodyTemplate} />
      </DataTable>
    </div>
  );
}
