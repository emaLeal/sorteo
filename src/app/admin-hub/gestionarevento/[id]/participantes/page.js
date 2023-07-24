import VerParticipantes from "@/app/components/admin-hub/gestionarevento/participantes/verParticipantes";

export default async function SorteoIdPage({ params }) {
  const { id } = params;

  return (
    <>
      <div>
        <VerParticipantes
          evento={id}
        />
      </div>
    </>
  );
}
