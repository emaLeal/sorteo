import ListaEventos from "./lista_eventos";
import Menu from "./menu";


export async function getData() {
  const headers = new Headers({
    "Content-type": "application/json",
  });
  const res = await fetch("http://localhost:3000/api/eventos", {
    headers,
    next: {
      revalidate: 1,
    },
  });
  const json = await res.json();
  return json;
}

export default async function AdminHubPage() {
  const data = await getData();

  return (
    <>
      <Menu />
      <div>
        <ListaEventos data={data.data} />
      </div>
    </>
  );
}
