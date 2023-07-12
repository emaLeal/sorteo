import ListaEventos from "./lista_eventos";
import Menu from "./menu";



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
