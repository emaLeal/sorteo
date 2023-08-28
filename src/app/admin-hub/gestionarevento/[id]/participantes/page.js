import VerParticipantes from "@/components/admin-hub/gestionarevento/participantes/verParticipantes";

async function getData(id) {
  const url = `http://localhost:3000/api/participante/${id}`;

  const res = await fetch(url, { next: { revalidate: 60 } });

  if (res.ok) {
    const json = await res.json();

    return json;
  }
}

export default async function SorteoIdPage({ params }) {
  const { id } = params;
  const data = await getData(id);

  return (
    <>
      <div>
        <VerParticipantes evento={id} data={data.data} />
      </div>
    </>
  );
}
