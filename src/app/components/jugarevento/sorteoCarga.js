/* eslint-disable react-hooks/exhaustive-deps */
"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay } from "swiper";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SwiperData from "./swiperData";

const SorteoCarga = ({ data, estilo, duracion, audio }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [swiper, SetSwiper] = useState(null);
  const [ganador, setGanador] = useState(null);
  const [animationFrame, setAnimationFrame] = useState(null);
  const [playing, setPlaying] = useState(false);
  const canvaRef = useRef(null);
  const maxConfettis = 150;
  const possibleColors = [
    "DodgerBlue",
    "OliveDrab",
    "Gold",
    "Pink",
    "SlateBlue",
    "LightBlue",
    "Gold",
    "Violet",
    "PaleGreen",
    "SteelBlue",
    "SandyBrown",
    "Chocolate",
    "Crimson",
  ];

  const router = useRouter();
  const changeSpeed = (speed) => {
    swiper.params.autoplay.delay = speed;
  };

  const shuffle = (array) => {
    let shuffled = array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    return shuffled;
  };

  useEffect(() => {
    const part = shuffle(data.participantes);
    const sort = part.filter((par) => {
      if (par !== null) return par;
    });
    setUsuarios(sort);
  }, []);

  class ConfettiParticle {
    constructor(W, H) {
      this.x = Math.random() * W; // x
      this.y = Math.random() * H - H; // y
      this.r = randomFromTo(11, 33); // radius
      this.d = Math.random() * maxConfettis + 11;
      this.color =
        possibleColors[Math.floor(Math.random() * possibleColors.length)];
      this.tilt = Math.floor(Math.random() * 33) - 11;
      this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
      this.tiltAngle = 0;
    }
    draw(context) {
      context.beginPath();
      context.lineWidth = this.r / 2;
      context.strokeStyle = this.color;
      context.moveTo(this.x + this.tilt + this.r / 3, this.y);
      context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
      return context.stroke();
    }
  }

  function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }

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

  const start = () => {
    const rouletteAudio = new Audio(audio);
    setPlaying(true);
    stopConfetti();
    setGanador(null);
    swiper.autoplay.start();
    swiper.params.autoplay.disableOnInteraction = false;
    changeSpeed(1);

    setTimeout(() => {
      swiper.autoplay.stop();
      setGanador(usuarios[swiper.realIndex]);
    }, duracion * 1000);

    setTimeout(() => {
      initializeConfetti();
      setPlaying(false);
      rouletteAudio.play();
    }, (duracion + 1) * 1000);
  };

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
            router.push(`/jugarevento/${data.data.evento_id}`);
          }
        });
      },
      reject: () => {},
    });
  };

  return (
    <>
      <ConfirmDialog />

      <div className="z-1">
        <Swiper
          direction={estilo}
          loop
          spaceBetween={100}
          onSwiper={SetSwiper}
          autoplay={false}
          allowTouchMove={false}
          modules={[Autoplay]}
          className={`absolute mySwiper w-full h-5/6 overflow-y-hidden`}
        >
          {usuarios.map((data, index) => {
            return (
              <SwiperSlide key={index}>
                <SwiperData data={data} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        {!playing && (
          <div className="absolute z-2">
            <Button
              className="p-button p-button-primary mb-2 p-button-rounded w-full"
              label={ganador ? "Reiniciar" : "Iniciar Sorteo"}
              onClick={start}
            />
            {ganador && (
              <Button
                className="p-button p-button-primary mb-2 p-button-rounded w-full"
                label="Declarar Ganador"
                onClick={declararGanador}
              />
            )}
            <Link href={`/jugarevento/${data.data.evento_id}`}>
              <Button
                className="p-button p-button-primary p-button-rounded w-full"
                label="Volver"
              />
            </Link>
          </div>
        )}
      </div>
      <canvas id="canvas" ref={canvaRef}></canvas>
    </>
  );
};

export default SorteoCarga;