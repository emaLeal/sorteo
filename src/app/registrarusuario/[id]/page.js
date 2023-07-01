import FormRegistro from "./FormRegistro";

export async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/eventos/${id}`, {
    cache: "no-store",
  });

  const json = await res.json();

  return json;
}

export async function getParticipantes(id) {
  const res = await fetch(`http://localhost:3000/api/participante/${id}`, {
    cache: "no-store",
  });

  const json = await res.json();

  return json;
}

export default async function RegistrarUsuarioPage({ params }) {
  const { id } = params;
  const data = await getData(id);
  const participantes = await getParticipantes(id);

  return (
    <>
      <div className="text-center my-4 text-4xl font-bold">
        <h1>{data.data.nombre_evento}</h1>
      </div>
      <div className="text-center my-4">
        <span>
          Bienvenido, en este espacio puedes registrarte en el evento
          <br />
        </span>
        <span>
          Aqui abajo, tendras que ingresar tu cedula para que puedas terminar tu
          registro correctamente
        </span>
      </div>
      <div className="flex justify-center">
        <FormRegistro participantes={participantes.data} />
      </div>
    </>
  );
}
