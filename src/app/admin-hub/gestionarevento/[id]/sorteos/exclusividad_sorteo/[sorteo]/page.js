import ParticipantesExclusivos from "@/components/admin-hub/gestionarevento/sorteos/exclusividad_sorteo/ParticipantesExclusivos";

async function getData(sorteo, id) {
  const url = `${process.env.COMPLETE_HOST}/api/sorteos_ex/${sorteo}`;
  const url2 = `${process.env.COMPLETE_HOST}/api/eventos/${id}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  const res2 = await fetch(url2, { next: { revalidate: 60 } });

  if (res.ok && res2.ok) {
    let json = await res.json();
    const comp = await res2.json();
    json = { ...json, comp };
    return json;
  }
}

export default async function ExclusividadPage({ params }) {
  const { id, sorteo } = params;
  const data = await getData(sorteo, id);
  return (
    <ParticipantesExclusivos
      data={data.data}
      evento_id={id}
      sorteo_id={sorteo}
      nombre_evento={data.comp.data.nombre_evento}
      nombre_empresa={data.comp.data.empresa}
    />
  );
}
