import ListaSorteos from "./ListaSorteos";

export default async function SorteosPage({ params }) {
  const { id } = params;
  return (
    <>
      <ListaSorteos evento={id} />
    </>
  );
}
