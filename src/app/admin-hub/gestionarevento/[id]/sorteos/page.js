import ListaSorteos from "./ListaSorteos";

export async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/sorteos/${id}`, {
    cache: "no-store",
  });

  const json = await res.json();

  return json;
}

export async function getParticipantes(id) {
  const res = await fetch(`http://localhost:3000/api/participante/${id}`, {
    cache: "no-store",
  });

  const json = await res.json();

  return json;
}

export default async function SorteosPage({ params }) {
  const { id } = params;
  const data = await getData(id);
  const participantes = await getParticipantes(id);
  return (
    <>
      <ListaSorteos
        data={data.data}
        evento={id}
        participantes={participantes.data}
      />
    </>
  );
}
