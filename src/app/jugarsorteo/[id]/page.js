import SorteoCarga from "./sorteoCarga";

export async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/participante/${id}`, {
    next: { revalidate: 10 },
  });

  const json = await res.json();

  return json;
}

export async function getEvento(id) {
  const res = await fetch(`http://localhost:3000/api/eventos/${id}`, {
    next: { revalidate: 10 },
  });

  const json = await res.json()

  return json
}

export default async function JugarSorteoPage({ params }) {
  const { id } = params;
  const data = await getData(id);
  const sort = await getEvento(id)
  return <SorteoCarga data={data} sort={sort}/>;
}
