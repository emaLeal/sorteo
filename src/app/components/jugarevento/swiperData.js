import Image from "next/image";
import './ganador.css'

const SwiperData = ({ data }) => {
  return (
    <div className="flex justify-center flex-column items-center">
      <Image
        src={data.foto}
        className="rounded-full"
        height={200}
        width={250}
        alt={data.nombre}
      />
      <span className="font-bold text-2xl text-black mt-2 text-start">
        {data.nombre}
      </span>
     
    </div>
  );
};

export default SwiperData;