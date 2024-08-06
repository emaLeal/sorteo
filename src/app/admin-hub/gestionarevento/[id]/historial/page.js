import HistorialComponent from "@/components/admin-hub/gestionarevento/historial/HistorialComponent";

async function getData(id) {
  const url = `${process.env.COMPLETE_HOST}/api/historial/${id}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (res.ok) {
    const json = await res.json();
    console.log(json);
  }
}

export default async function HistorialPage({ params }) {
  const { id } = params;
  getData(id);
  return <HistorialComponent />;
}
