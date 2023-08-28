import Image from "next/image";
import "./ganador.css";

const SwiperData = ({ data, noImagen }) => {
  return !noImagen ? (
    <div className="flex justify-center flex-column items-center pt-4">
      <Image
        src={data.foto === "/user.png" ? data.foto : `/api/foto${data.foto}`}
        className="rounded-full"
        height={300}
        width={300}
        alt={data.nombre}
      />
      <span className="font-bold text-2xl text-black mt-2 text-start">
        {data.nombre}
      </span>
    </div>
  ) : (
    <div className="flex justify-center items-center h-full">
      <div className="p-5">
      <span className="block font-bold text-7xl text-black align-middle text-center">
        {data.nombre}
      </span>
      </div>
   
    </div>
  );
};

export default SwiperData;
