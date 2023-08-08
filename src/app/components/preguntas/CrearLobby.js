import { Button } from 'primereact/button';
import React from 'react'

const CrearLobby = ({cerrarLobby, crearLobby, users, lobby, setPagina}) => {
  return (
    <>
    <Button label="Crear Lobby" onClick={crearLobby} />
    <Button label="Cerrar Lobby" onClick={cerrarLobby} />
    {lobby && <label>{lobby}</label>}

    <ul>
      {users.map((user, index) => {
        if (user.participa === true && user.nombre !== "admin") {
          return <li key={index}>{user.nombre}</li>;
        }
      })}
    </ul>
    <div className="absolute bottom-0 mx-2 my-2">
      <Button label="Empezar" onClick={() => 
        setPagina("empezar")
        
        } />
    </div>
  </>
  )
}

export default CrearLobby