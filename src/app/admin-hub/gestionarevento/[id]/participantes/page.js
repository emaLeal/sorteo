import VerParticipantes from "@/components/admin-hub/gestionarevento/participantes/verParticipantes";

async function getData(id) {
  const url = `${process.env.COMPLETE_HOST}/api/participante/${id}`;
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

export default async function SorteoIdPage({ params }) {
  const { id } = params;
  const data = await getData(id);
  return (
    <>
      <VerParticipantes
        evento={id}
        data={data.data}
        nombre_evento={data.comp.data.nombre_evento}
        nombre_empresa={data.comp.data.empresa}
        foto_empresa={data.comp.data.foto_empresa}
        fondo_color={data.comp.data.fondo_color}
        fuente_color={data.comp.data.fuente_color}
        borde_color={data.comp.data.borde_color}
        fondo_campos={data.comp.data.fondo_campos}
      />
    </>
  );
}
