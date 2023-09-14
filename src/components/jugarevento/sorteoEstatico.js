'use client'
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useFullScreen from "@/hooks/useFullScreen";
import shuffle from "@/lib/shuffle";
import SwiperData from "./swiperData";

const SorteoEstatico = ({ data, duracion, audio, noImagen, participantes }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [ganador, setGanador] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [actualUsuario, setActualUsuario] = useState([])
    const router = useRouter();
    const { isFullscreen, toggleFullscreen } = useFullScreen();

    const declararGanador = () => {
        confirmDialog({
            header: "Declarar Ganador?",
            message: `Quieres declarar a ${ganador.nombre} como el ganador del sorteo?`,
            acceptLabel: "Declarar Ganador",
            rejectLabel: "Cancelar",
            accept: () => {
                fetch("/api/declararganador", {
                    method: "PUT",
                    body: JSON.stringify({
                        ganador: ganador.id,
                        ganador_nombre: ganador.nombre,
                        id: data.data.id,
                    }),
                }).then((res) => {
                    if (res.ok) {
                        console.log(data);
                        router.refresh();
                        router.push(`/jugarevento/${data.data.evento_id}`);
                    }
                });
            },
            reject: () => { },
        });
    };

    useEffect(() => {
        const part = shuffle(participantes);
        const sort = part.filter((par) => {
            if (par !== null) return par;
        });
        setUsuarios(sort);
    }, []);

    useEffect(() => {
        let interval;

        if (isRunning) {
            interval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * participantes.length);
                setActualUsuario(usuarios[randomIndex]);
            }, 1); // Cambia rápidamente cada 100 ms
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning, usuarios]);

    const start = () => {
        setGanador(null);
        setIsRunning(true);
    };

    const stopLottery = () => {
        setGanador(actualUsuario)
        setIsRunning(false);
    };

    return (
        <>
            <div>
                <h1>Sorteo</h1>
                <button onClick={start} disabled={isRunning}>
                    Iniciar Sorteo
                </button>
                <button onClick={stopLottery} disabled={!isRunning}>
                    Detener Sorteo
                </button>
                {actualUsuario && <SwiperData data={actualUsuario} noImagen={true} />}
            </div>
            {!isRunning && (
                <div className="absolute z-2 bottom-0 right-0">
                    <Button
                        className="p-button p-button-primary mb-2 p-button-rounded mr-2"
                        icon={`pi ${isFullscreen ? "pi-window-minimize" : "pi-window-maximize"
                            }`}
                        onClick={toggleFullscreen}
                        tooltip={
                            isFullscreen ? "Quitar Pantalla Completa" : "Pantalla Completa"
                        }
                        tooltipOptions={{ position: "left" }}
                    />
                    <Button
                        className="p-button p-button-primary mb-2 p-button-rounded mr-2"
                        icon={ganador ? "pi pi-replay" : "pi pi-play"}
                        onClick={start}
                        tooltip={ganador ? "Repetir Sorteo" : "Iniciar Sorteo"}
                        tooltipOptions={{ position: "left" }}
                    />
                    {ganador && (
                        <Button
                            className="p-button p-button-primary mb-2 p-button-rounded mr-2"
                            icon="pi pi-user-plus"
                            onClick={declararGanador}
                            tooltip="Declarar Ganador"
                            tooltipOptions={{ position: "left" }}
                        />
                    )}
                    {/* <Link href={`/jugarevento/${data.data.evento_id}`}>
                        <Button
                            className="p-button p-button-primary p-button-rounded mb-2 mr-2"
                            icon="pi pi-step-backward"
                            tooltip="Regresar"
                            tooltipOptions={{ position: "left" }}
                        />
                    </Link> */}
                </div>
            )}
        </>
    );
};

export default SorteoEstatico



