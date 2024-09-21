import CertificadosComponent from "@/components/admin-hub/gestionarevento/certificados/CertificadosComponent";

async function getParticipantesData(id) {
  const url = `${process.env.COMPLETE_HOST}/api/participante/${id}`;
  const res = await fetch(url, { next: { revalidate: 15 } });
  if (res.ok) {
    const json = await res.json();

    return json;
  }
}

async function getEventoData(id) {
  const url = `${process.env.COMPLETE_HOST}/api/eventos/${id}`;
  const res = await fetch(url, { next: { revalidate: 15 } });
  if (res.ok) {
    const json = await res.json();

    return json.data;
  }
}

export default async function CertificadosPage({ params }) {
  const { id } = params;
  const data = await getParticipantesData(id);
  const {
    nombre_evento,
    empresa,
    foto_evento,
    foto_empresa,
    fondo_color,
    fuente_color,
    borde_color,
    fondo_campos,
  } = await getEventoData(id);
  return (
    <>
      <h1 className="text-center text-3xl font-bold">Modulo de Certificados</h1>
      <CertificadosComponent
        participantes={data.data}
        nombre_empresa={empresa}
        nombre_evento={nombre_evento}
        foto_empresa={foto_empresa}
        fondo_color={fondo_color}
        fuente_color={fuente_color}
        borde_color={borde_color}
        fondo_campos={fondo_campos}
      />
    </>
  );
}
