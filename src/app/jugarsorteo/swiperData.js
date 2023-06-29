import Image from "next/image";

const SwiperData = ({ data }) => {
  return (
    <div className="bg-white rounded-full flex justify-between p-6 items-center">
      <Image src={data.foto} width={150} height={100} alt={data.nombre} />
      <span className="text-black">{data.nombre}</span>
      <br />
    </div>
  );
};

export default SwiperData;
