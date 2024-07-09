import ParticipantesExclusivos from "@/components/admin-hub/gestionarevento/sorteos/exclusividad_sorteo/ParticipantesExclusivos";

async function getData(sorteo) {
  const url = `${process.env.COMPLETE_HOST}/api/sorteos_ex/${sorteo}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (res.ok) {
    const json = await res.json();
    return json;
  }
}

export default async function ExclusividadPage({ params }) {
  const { id, sorteo } = params;
  const data = await getData(sorteo);
  console.log(data)
  return (
    <ParticipantesExclusivos
      data={data.data}
      evento_id={id}
      sorteo_id={sorteo}
    />
  );
}
