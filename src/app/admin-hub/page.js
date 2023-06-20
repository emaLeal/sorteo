import { cookies } from "next/headers";
import ListaSorteo from "./lista_sorteo";

export async function getData(cookie) {
  const headers = new Headers({
    "Content-type": "application/json",
  });
  headers.append("Set-Cookie", `${cookie.value}`);
  const res = await fetch("http://localhost:3000/api/sorteo", {
    headers,
    cache: "no-store",
  });
  const json = await res.json();
  return json;
}

export async function postSorteo(data) {
  
}

export default async function AdminHubPage() {
  const cookieStore = cookies().get("miToken");
  const data = await getData(cookieStore);

  return (
    <div>
      <ListaSorteo data={data.data} />
    </div>
  );
}
