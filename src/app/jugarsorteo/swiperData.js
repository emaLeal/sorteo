import Image from "next/image";

const SwiperData = ({ data }) => {
  return (
    <div className="flex items-center text-left p-10  rounded-full bg-white flex justify-between">
      <Image src={data.foto} width={150} height={100} alt={data.nombre} />
      <span className="text-black">{data.nombre}</span>
      <br />
    </div>
  );
};

export default SwiperData;
