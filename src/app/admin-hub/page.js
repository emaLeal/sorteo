import ListaEventos from "../components/admin-hub/lista_eventos";
import Menu from "../components/admin-hub/menu";

export default async function AdminHubPage() {

  return (
    <>
      <Menu />
      <div>
        <ListaEventos />
      </div>
    </>
  );
}
