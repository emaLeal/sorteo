import { Button } from "primereact/button";

const Footer = ({data, router, evento}) => {

  const habilitarTodos = async () => {
    const res = await fetch(`/api/toggleparticipante/${1}/${evento}`);

    if (res.ok) {
      router.refresh();
    }
  };

  const inhabilitarTodos = async () => {
    const res = await fetch(`/api/toggleparticipante/${0}/${evento}`);

    if (res.ok) {
      router.refresh();
      console.log("exito");
    }
  };

  return (
    <>
      <div className="flex justify-around">
        <div className="flex flex-col">
          <span>
            Participantes Registrados:{" "}
            {
              data.filter((participante) => participante.participara === 1)
                .length
            }
          </span>
          <Button
            severity="success"
            text
            onClick={habilitarTodos}
            label="Habilitar Todos"
            rounded
          />
        </div>
        <div className="flex flex-col">
          <span>
            Participantes faltantes por Registrar:{" "}
            {
              data.filter((participante) => participante.participara === 0)
                .length
            }
          </span>
          <Button
            severity="danger"
            text
            rounded
            label="Inhabilitar Todos"
            onClick={inhabilitarTodos}
          />
        </div>
      </div>
    </>
  );
};

export default Footer