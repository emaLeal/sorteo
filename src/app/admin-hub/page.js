import ListaEventos from "@/components/admin-hub/lista_eventos";
import Menu from "@/components/admin-hub/menu";

async function getData() {
  const url = `${process.env.COMPLETE_HOST}/api/eventos`;

  const res = await fetch(url, { next: { revalidate: 60 } });

  if (res.ok) {
    const json = await res.json();

    return json;
  }
  return res
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
