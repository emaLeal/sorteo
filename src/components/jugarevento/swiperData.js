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
      className="flex justify-center flex-column items-center pt-4"
    >
      <Image
        src={data.foto === "/user.png" ? data.foto : `/api/foto${data.foto}`}
        className="rounded-full"
        height={300}
        width={300}
        alt={"Nombre de Usuario"}
      />
      <span className="font-bold text-2xl text-black mt-2 text-start">
        {data.nombre}
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
      </div>
    </div>
  );
};

export default SwiperData;
