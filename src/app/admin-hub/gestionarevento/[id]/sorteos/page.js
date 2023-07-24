import ListaSorteos from "../../../../components/admin-hub/gestionarevento/sorteos/ListaSorteos";

export default async function SorteosPage({ params }) {
  const { id } = params;
  return (
    <>
      <ListaSorteos evento={id} />
    </>
  );
}
