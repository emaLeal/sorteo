import Image from "next/image";
import { Button } from "primereact/button";
import React from "react";

const EmpezarSorteo = ({ setPagina, users, finalizarSorteo }) => {
  return (
    <>
      <h1 className="font-bold text-xl mb-4">Usuarios que han respondido</h1>
      <div className="grid-rows-3 w-1/3 gap-2 mx-2" style={{ display: "grid" }}>
        {users.map((user, index) => {
          if (user.respuesta !== null) {
            return (
              <div
                key={index}
                className="flex justify-between p-4 items-center bg-white rounded-full"
              >
                <Image
                  width={50}
                  height={50}
                  className="w-auto h-auto"
                  src={
                    user.foto === "/user.png"
                      ? user.foto
                      : `/api/foto${user.foto}`
                  }
                  alt="Foto de usuario"
                />
                <label className="text-black">{user.nombre}</label>
              </div>
            );
          }
        })}
      </div>
      <div className="fixed bottom-0 left-0 mx-2 my-2">
        <label className="font-bold text-xl">
          Usuarios Faltantes por responder:{" "}
          {
            users.filter(
              (user) => user.respuesta === null && user.nombre !== "admin"
            ).length
          }
        </label>
      </div>

      <div className="fixed bottom-0 right-0 mx-2 my-2">
        <Button
          icon="pi pi-fast-backward"
          tooltip="Volver"
          tooltipOptions={{ position: "top" }}
          onClick={() => setPagina("crear")}
          className="mx-2"
          severity="secondary"
          raised
          rounded
        />
        <Button
          icon="pi pi-stop-circle"
          tooltip="Finalizar Sorteo"
          tooltipOptions={{ position: "top" }}
          rounded
          raised
          severity="success"
          onClick={finalizarSorteo}
        />
      </div>
    </>
  );
};

export default EmpezarSorteo;
