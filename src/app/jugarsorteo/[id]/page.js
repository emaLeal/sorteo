import SorteoCarga from "./sorteoCarga";
import "./style.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/participante/${id}`, {
    next: {
      revalidate: 10,
    },
  });

  const json = await res.json();

  return json;
}

export async function getSorteo(id) {
  const res = await fetch(`http://localhost:3000/api/eventos/${id}`, {
    next: {
      revalidate: 10,
    },
  });

  const json = await res.json();

  return json;
} 

export default async function SorteoPage({ params }) {
  const { id } = params;
  const data = await getData(id);
  const sort = await getSorteo(id)

  return <SorteoCarga data={data} sort={sort} />;
}
