import VerParticipantes from "./verParticipantes";

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
