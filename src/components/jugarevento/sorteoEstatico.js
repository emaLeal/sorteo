"use client";
import { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useFullScreen from "@/hooks/useFullScreen";
import shuffle from "@/lib/shuffle";
import SwiperData from "./swiperData";
import ConfettiParticle from "@/lib/ConfettiParticle";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const SorteoEstatico = ({
  data,
  duracion,
  audio,
  noImagen,
  participantes,
  velocidad,
}) => {
  const [usuarios, setUsuarios] = useState([]);
  const [ganador, setGanador] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [primeraVez, setPrimeraVez] = useState(true);
  const [actualUsuario, setActualUsuario] = useState({});
  const [swiperDataRef, setSwiperDataRef] = useState(null);
  const router = useRouter();
  const [animationFrame, setAnimationFrame] = useState(null);
  const { isFullscreen, toggleFullscreen } = useFullScreen();
  const canvaRef = useRef(null);
  const maxConfettis = 150;

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
      reject: () => {},
    });
  };

  useEffect(() => {
    const part = shuffle(participantes);
    const sort = part.filter((par) => {
      if (par !== null) return par;
    });
    setUsuarios(sort);
  }, []);

  function Draw(canvas, context, W, H, particles) {
    const results = [];
    // Magical recursive functional love
    setAnimationFrame(
      requestAnimationFrame(() => Draw(canvas, context, W, H, particles))
    );

    context.clearRect(0, 0, W, H);

    for (let i = 0; i < maxConfettis; i++) {
      results.push(particles[i].draw(context));
    }

    let particle;
    let remainingFlakes = 0;
    for (let i = 0; i < maxConfettis; i++) {
      particle = particles[i];

      particle.tiltAngle += particle.tiltAngleIncremental;
      particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
      particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

      if (particle.y <= H) remainingFlakes++;

      // If a confetti has fluttered out of view,
      // bring it back to above the viewport and let it re-fall.
      if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
        particle.x = Math.random() * W;
        particle.y = -30;
        particle.tilt = Math.floor(Math.random() * 10) - 20;
      }
    }

    return results;
  }

  function initializeConfetti() {
    const canvas = canvaRef.current;
    const context = canvas.getContext("2d");
    const W = window.innerWidth;
    const H = window.innerHeight;

    const particles = [];
    for (let i = 0; i < maxConfettis; i++) {
      particles.push(new ConfettiParticle(W, H));
    }

    canvas.width = W;
    canvas.height = H;

    Draw(canvas, context, W, H, particles);
  }

  function stopConfetti() {
    if (animationFrame) {
      // Cancelar la animación si existe un identificador de animación
      cancelAnimationFrame(animationFrame);
      setAnimationFrame(null);

      const canvas = canvaRef.current;
      const context = canvas.getContext("2d");
      const W = window.innerWidth;
      const H = window.innerHeight;
      context.clearRect(0, 0, W, H); // Limpiar el contenido del canvas
    }
  }

  useEffect(() => {
    let interval;

    if (isRunning) {
      const rouletteAudio = new Audio(audio);
      const sorteoA = new Audio("/RULETA-TABLERO-FINAL-MP4.mp3");
      sorteoA.loop = true;
      sorteoA.play();
      stopConfetti();
      swiperDataRef.current.classList.remove("ganador");

      interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * participantes.length);
        setActualUsuario(usuarios[randomIndex]);
      }, velocidad);

      setTimeout(() => {
        swiperDataRef.current.classList.add("ganador");
      }, (duracion - 1) * 1000);

      setTimeout(() => {
        setPrimeraVez(false);
        sorteoA.pause();
        sorteoA.currentTime = 0;
        setIsRunning(false);
        rouletteAudio.play();
        initializeConfetti();
      }, duracion * 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, usuarios]);

  useEffect(() => {
    let interval;

    if (!primeraVez) {
      clearInterval(interval);
      if (!isRunning) {
        setGanador(actualUsuario);
      }
    } else {
      interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * participantes.length);
        setActualUsuario(usuarios[randomIndex]);
      }, 300);
    }
    return () => clearInterval(interval);
  }, [actualUsuario, primeraVez]);

  const start = () => {
    setPrimeraVez(true);
    setGanador(null);
    setIsRunning(true);
  };

  return (
    <>
      <ConfirmDialog />
      <div className="absolute w-screen h-5/6 overflow-y-hidden">
        {actualUsuario && (
          <SwiperData
            data={actualUsuario}
            noImagen={noImagen}
            setRef={setSwiperDataRef}
          />
        )}
      </div>
      {!isRunning && (
        <div className="absolute z-2 bottom-0 right-0">
          <Button
            className="p-button p-button-primary mb-2 p-button-rounded mr-2"
            icon={`pi ${
              isFullscreen ? "pi-window-minimize" : "pi-window-maximize"
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
          <Link href={`/jugarevento/${data.data.evento_id}`}>
            <Button
              className="p-button p-button-primary p-button-rounded mb-2 mr-2"
              icon="pi pi-step-backward"
              tooltip="Regresar"
              tooltipOptions={{ position: "left" }}
            />
          </Link>
        </div>
      )}
      <canvas id="canvas" ref={canvaRef}></canvas>
    </>
  );
};

export default SorteoEstatico;
