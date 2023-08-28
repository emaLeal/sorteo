export async function habilitar(data) {
  const url = `/api/habilitar/${data.id}`;

  const res = await fetch(url, { method: "PUT", next: { revalidate: 0 } });
  if (res.ok) {
    console.log("ok");
  }
}

export async function descalificar(data) {
  const url = `/api/descalificar/${data.id}`;

  const res = await fetch(url, { method: "PUT", next: { revalidate: 0 } });
  if (res.ok) {
    console.log("ok");
  }
}
