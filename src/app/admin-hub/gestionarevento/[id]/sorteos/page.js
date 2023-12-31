import ListaSorteos from "@/components/admin-hub/gestionarevento/sorteos/ListaSorteos";

async function getData(id) {
  const url = `${process.env.COMPLETE_HOST}/api/sorteos/${id}`;

  const res = await fetch(url, { next: { revalidate: 60 } });

  if (res.ok) {
    const json = await res.json();

    return json;
  }
}

export default async function SorteosPage({ params }) {
  const { id } = params;
  const data = await getData(id);

  return <ListaSorteos evento={id} data={data.data} />;
}
