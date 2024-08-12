import HistorialComponent from "@/components/admin-hub/gestionarevento/historial/HistorialComponent";

async function getData(id) {
  const url = `${process.env.COMPLETE_HOST}/api/historial/${id}`;
  const res = await fetch(url, { next: { revalidate: 12 } });
  if (res.ok) {
    const json = await res.json();
    return json;
  }
}

export default async function HistorialPage({ params }) {
  const { id } = params;
  const data = await getData(id);
  return <HistorialComponent data={data} evento_id={id} />;
}
