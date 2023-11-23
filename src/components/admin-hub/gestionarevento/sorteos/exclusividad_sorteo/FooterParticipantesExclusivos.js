import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import React from "react";

const Footer = ({ data, evento, sorteo_id }) => {
  const router = useRouter();
  const habilitarTodos = async () => {
    const res = await fetch(`/api/toggleexclusivos/${1}/${sorteo_id}`);

    if (res.ok) {
      router.refresh();
    }
  };

  const inhabilitarTodos = async () => {
    const res = await fetch(`/api/toggleexclusivos/${0}/${sorteo_id}`);

    if (res.ok) {
      router.refresh();
      console.log("exito");
    }
  };
  return (
    <div className="flex justify-around">
      <div className="flex flex-col">
        <span>
          Participantes Registrados:{" "}
          {data.filter((participante) => participante.habilitado === 1).length}
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
          {data.filter((participante) => participante.habilitado === 0).length}
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
  );
};

export default Footer;
