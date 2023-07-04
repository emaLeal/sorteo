/* eslint-disable react-hooks/exhaustive-deps */
"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay } from "swiper";
import { useEffect, useState } from "react";
import SwiperData from "./swiperData";
import { Pagination } from "swiper";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useRouter } from "next/navigation";

const SorteoCarga = ({ data }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [swiper, SetSwiper] = useState(null);
  const [ganador, setGanador] = useState(null);
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

  const m = () => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    let W = window.innerWidth;
    let H = window.innerHeight;

    const maxConfettis = 150;
    const particles = [];

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

    function randomFromTo(from, to) {
      return Math.floor(Math.random() * (to - from + 1) + from);
    }

    class confettiParticle {
      constructor() {
        this.x = Math.random() * W; // x
        this.y = Math.random() * H - H; // y
        this.r = randomFromTo(11, 33); // radius
        this.d = Math.random() * maxConfettis + 11;
        this.color =
          possibleColors[Math.floor(Math.random() * possibleColors.length)];
        this.tilt = Math.floor(Math.random() * 33) - 11;
        this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
        this.tiltAngle = 0;

        this.draw = function () {
          context.beginPath();
          context.lineWidth = this.r / 2;
          context.strokeStyle = this.color;
          context.moveTo(this.x + this.tilt + this.r / 3, this.y);
          context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
          return context.stroke();
        };
      }
    }

    function Draw() {
      const results = [];

      // Magical recursive functional love
      requestAnimationFrame(Draw);

      context.clearRect(0, 0, W, window.innerHeight);

      for (var i = 0; i < maxConfettis; i++) {
        results.push(particles[i].draw());
      }

      let particle = {};
      let remainingFlakes = 0;
      for (var i = 0; i < maxConfettis; i++) {
        particle = particles[i];

        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
        particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

        if (particle.y <= H) remainingFlakes++;

        // If a confetti has fluttered out of view,
        // bring it back to above the viewport and let if re-fall.
        if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
          particle.x = Math.random() * W;
          particle.y = -30;
          particle.tilt = Math.floor(Math.random() * 10) - 20;
        }
      }

      return results;
    }

    window.addEventListener(
      "resize",
      function () {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      },
      false
    );

    // Push new confetti objects to `particles[]`
    for (var i = 0; i < maxConfettis; i++) {
      particles.push(new confettiParticle());
    }

    // Initialize
    canvas.width = W;
    canvas.height = H;
    Draw();
  };

  const start = () => {
    setGanador(null);
    swiper.autoplay.start();
    swiper.params.autoplay.disableOnInteraction = false;
    setTimeout(() => {
      changeSpeed(400);
    }, 2000);

    setTimeout(() => {
      changeSpeed(200);
    }, 4000);

    setTimeout(() => {
      changeSpeed(100);
    }, 6000);

    setTimeout(() => {
      changeSpeed(10);
    }, 7000);

    setTimeout(() => {
      changeSpeed(500);
    }, 12000);

    setTimeout(() => {
      changeSpeed(1500);
    }, 14000);

    setTimeout(() => {
      setGanador(usuarios[swiper.realIndex]);
      swiper.autoplay.stop();
      m();
    }, 16000);
  };

  const declararGanador = () => {
    confirmDialog({
      header: "Declarar Ganador?",
      message: `Quieres declarar a ${ganador.nombre} como el ganador del sorteo?`,
      acceptLabel: "Declarar Ganador",
      rejectLabel: "Cancelar",
      accept: () => {
        fetch("http://localhost:3000/api/declararganador", {
          method: "PUT",
          body: JSON.stringify({
            ganador: ganador.id,
            id: data.data.id,
          }),
        }).then((res) => {
          if (res.ok) {
            router.push(
              `/admin-hub/gestionarevento/${data.data.evento_id}/sorteos`
            );
          }
        });
      },
      reject: () => {},
    });
  };

  return (
    <>
      <ConfirmDialog />
      <Swiper
        direction={"vertical"}
        loop
        spaceBetween={100}
        onSwiper={SetSwiper}
        autoplay={false}
        allowTouchMove={false}
        modules={[Autoplay, Pagination]}
        className="absolute mySwiper overflow-y-hidden h-full w-1/2 my-20 mx-80"
      >
        {usuarios.map((data, index) => {
          return (
            <SwiperSlide key={index}>
              <SwiperData data={data} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="absolute mt-96 left-0 right-0 flex justify-center">
        <Button
          className="p-button p-button-primary mr-2"
          label={ganador ? "Reiniciar" : "Iniciar Sorteo"}
          onClick={start}
        />
        {ganador && (
          <Button
            className="p-button p-button-primary"
            label="Declarar Ganador"
            onClick={declararGanador}
          />
        )}
        <Button
          className="fixed p-button p-button-primary p-button-rounded top-1 left-1"
          icon="pi pi-angle-left"
          tooltip="Regresar"
          onClick={() =>
            router.push(
              `/admin-hub/gestionarevento/${data.data.evento_id}/sorteos`
            )
          }
        />
      </div>
      <canvas id="canvas"></canvas>
    </>
  );
};

export default SorteoCarga;
