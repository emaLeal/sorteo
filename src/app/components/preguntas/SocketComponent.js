/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { redirect, useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3060");

const SocketComponent = () => {
  const [lobby, setLobby] = useState(null);
  const [users, setusers] = useState([]);
  const router = useRouter();

  const crearLobby = () => {
    socket.emit("createLobby");
  };

  useEffect(() => {
    if (lobby !== null) {
      socket.emit("joinLobby", {
        lobbyId: lobby,
        nombre: "admin",
        rol: "admin",
      });
    }
  }, [lobby]);

  useEffect(() => {
    if (localStorage.getItem("socketUser")) {
      const user = JSON.parse(localStorage.getItem("socketUser"));
      socket.emit("leaveLobby", user);

      socket.emit("joinLobby", user);
    }

    socket.on("connect_error", () => {
      console.log("Error de conexión con el servidor.");

      router.push("/admin-hub");
    });
  }, []);

  socket.on("updateLobbyUsers", (users) => {
    console.log(users);
    setusers(users.players);
  });

  socket.on("lobbyCreated", (lobbyId) => {
    setLobby(lobbyId);
  });

  socket.on("joinedLobby", (user) => {
    if (user !== "No encontrado") {
      localStorage.setItem("socketUser", JSON.stringify(user));
    } else {
      if (localStorage.getItem("socketUser")) {
        localStorage.removeItem("socketUser");
      }
    }
  });

  const cerrarLobby = () => {
    if (localStorage.getItem("socketUser")) {
      localStorage.removeItem("socketUser");
    }
  };

  return (
    <>
      <Button label="Crear Lobby" onClick={crearLobby} />
      <Button label="Cerrar Lobby" onClick={cerrarLobby} />
      {lobby && <label>{lobby}</label>}

      <ul>
        {users.map((user, index) => {
          return <li key={index}>{user.nombre}</li>;
        })}
      </ul>
      <div className="absolute bottom-0 mx-2 my-2">
      <Button label="Empezar" />

      </div>
    </>
  );
};

export default SocketComponent;
