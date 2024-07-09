import AsistenciaComponent from "@/components/admin-hub/gestionarevento/asistencia/AsistenciaComponent";

export default async function AsistenciaPage({ params }) {
  const { id } = params;
  return (
    <>
      <AsistenciaComponent />
    </>
  );
}
