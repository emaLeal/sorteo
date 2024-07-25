import AsistenciaSorteoComponent from "@/components/admin-hub/gestionarevento/sorteos/asistencia/AsistenciaSorteoComponent";

export default async function AsistenciaSorteoPage({ params }) {
  const { id, sorteo } = params;
  return <AsistenciaSorteoComponent />;
}
