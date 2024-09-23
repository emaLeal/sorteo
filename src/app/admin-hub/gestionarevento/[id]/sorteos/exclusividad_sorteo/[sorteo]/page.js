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

async function getSorteo(sorteo) {
  const url = `${process.env.COMPLETE_HOST}/api/sorteo/${sorteo}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (res.ok) {
    const json = await res.json();
    return json.data;
  }
}

export default async function ExclusividadPage({ params }) {
  const { id, sorteo } = params;
  const data = await getData(sorteo, id);
  const sorteo_data = await getSorteo(sorteo);
  return (
    <ParticipantesExclusivos
      data={data.data}
      evento_id={id}
      sorteo_id={sorteo}
      fondo_color={data.comp.data.fondo_color}
      fuente_color={data.comp.data.fuente_color}
      borde_color={data.comp.data.borde_color}
      fondo_campos={data.comp.data.fondo_campos}
      nombre_sorteo={sorteo_data.nombre}
      nombre_evento={data.comp.data.nombre_evento}
      foto_empresa={data.comp.data.foto_empresa}
      nombre_empresa={data.comp.data.empresa}
    />
  );
}
