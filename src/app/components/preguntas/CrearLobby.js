import { Button } from "primereact/button";
import React from "react";

const CrearLobby = ({ crearLobby }) => {
  return (
    <>
      <div className="flex justify-center items-center h-96">
        <div>
          <Button
            label="Crear Lobby"
            onClick={crearLobby}
            severity="secondary"
            rounded
            className="hover:scale-110 transition-transform"
            raised
            size="large"
          />
        </div>
      </div>
    </>
  );
};

export default CrearLobby;
