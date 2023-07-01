import Link from "next/link";
import VerParticipantes from "./verParticipantes";

export async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/eventos/${id}`, {
    cache: 'no-store'
  });

  const json = await res.json();

  return json;
}

export async function getParticipant(id) {
  const res = await fetch(`http://localhost:3000/api/participante/${id}`, {
    cache: 'no-store'
  });

  const json = await res.json();

  return json;
}

export default async function SorteoIdPage({ params }) {
  const { id } = params;
  const data = await getData(id);
  const partData = await getParticipant(id);
  return (
    <>
      <div>
        <VerParticipantes
          participantData={partData.data}
          evento={data.data.id}
        />
      </div>
    </>
  );
}
