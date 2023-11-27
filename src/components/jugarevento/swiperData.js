import Image from "next/image";
import "./ganador.css";
import { useEffect, useRef } from "react";

const SwiperData = ({ data, noImagen, setRef }) => {
  const swiperDataRef = useRef(null);

  useEffect(() => {
    // Establecer la referencia al componente SwiperData en el estado padre
    setRef(swiperDataRef);
  }, [setRef]);

  return !noImagen ? (
    <div
      ref={swiperDataRef}
      className="flex h-full justify-center flex-column items-center content-center pt-4"
    >
      <Image
        src={data.foto === "/user.png" ? data.foto : `/api/foto${data.foto}`}
        className="rounded-full"
        height={400}
        width={400}
        alt={"Nombre de Usuario"}
      />
      <span className="font-bold text-5xl text-black mt-2 text-start">
        {data.nombre}
      </span>
      <span className="font-bold text-xl text-black mt-2 text-start">
        {data.cargo}
      </span>
    </div>
  ) : (
    <div
      ref={swiperDataRef}
      className="flex justify-center items-center h-full"
    >
      <div className="p-5">
        <span className="block font-bold text-7xl text-black align-middle text-center">
          {data.nombre}
        </span>
        <span className="block font-bold text-xl text-black mt-4 text-start align-middle text-center">
          {data.cargo}
        </span>
      </div>
    </div>
  );
};

export default SwiperData;
