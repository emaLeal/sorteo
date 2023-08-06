import SocketComponent from "../../components/preguntas/SocketComponent";

export async function getData(id) {
  const url = `http://localhost:3000/api/sorteo/${id}`;

  const res = await fetch(url, { cache: "no-store" });

  const json = await res.json();

  return json;
}

export default async function SocketPage({ params }) {
  const { id } = params;

  const data = await getData(id);
  
  return <SocketComponent />;
}
