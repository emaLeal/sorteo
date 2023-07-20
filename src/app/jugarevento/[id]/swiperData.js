import Image from "next/image";

const SwiperData = ({ data }) => {
  return (
    <div className="flex flex-column">
      <Image
        src={data.foto}
        className="rounded-full "
        height={200}
        width={250}
        alt={data.nombre}
      />
      <span className="font-bold text-2xl text-black mt-2">
        {data.nombre}
      </span>
    </div>
  );
};

export default SwiperData;
