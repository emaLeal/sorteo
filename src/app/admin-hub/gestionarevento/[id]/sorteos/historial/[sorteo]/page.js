import HistorialComponent from "@/components/admin-hub/gestionarevento/sorteos/historial/HistorialComponent";

async function getData(id, sorteo) {
  const url = `${process.env.COMPLETE_HOST}/api/sorteos_ex/historial/${sorteo}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (res.ok) {
    const json = await res.json();
    return json;
  }
}

export default async function HistorialSorteoPage({ params }) {
  const { id, sorteo } = params;
  const data = await getData(id, sorteo);
  return <HistorialComponent data={data}/>;
}
