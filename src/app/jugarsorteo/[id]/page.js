import { redirect } from "next/navigation";
import SorteoCarga from "./sorteoCarga";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/sorteo/${id}`, {
    next: { revalidate: 10 },
  });

  const json = await res.json();

  return json;
}

export default async function JugarSorteoPage({ params }) {
  const { id } = params;
  const data = await getData(id);
  const cookieStore = cookies().get("miToken");
  try {
    const payload = await jwtVerify(
      new TextEncoder().encode(cookieStore.value),
      new TextEncoder().encode(process.env.SECRET)
    );
  } catch (error) {
    return redirect("/");
  }
  if (data.data.jugado === 1) {
    redirect("/");
  }
  return <SorteoCarga data={data} sorteoId={id} />;
}
