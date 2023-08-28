export async function habilitar(id) {
  const url = `/api/habilitar/${id}`;

  const res = await fetch(url, { method: "PUT", next: { revalidate: 0 } });
  if (res.ok) {
    console.log("ok");
  }
}

export async function descalificar(id) {
  const url = `/api/descalificar/${id}`;

  const res = await fetch(url, { method: "PUT", next: { revalidate: 0 } });
  if (res.ok) {
    console.log("ok");
  }
}
