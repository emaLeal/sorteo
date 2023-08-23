import ListaEventos from "../components/admin-hub/lista_eventos";
import Menu from "../components/admin-hub/menu";

export async function getData() {
  const url = "http://localhost:3000/api/eventos";

  const res = await fetch(url, { next: { revalidate: 60 } });

  if (res.ok) {
    const json = await res.json();

    return json;
  }
}

export default async function AdminHubPage() {
  const data = await getData()
  return (
    <>
      <Menu />
      <div>
        <ListaEventos data={data.data}/>
      </div>
    </>
  );
}
