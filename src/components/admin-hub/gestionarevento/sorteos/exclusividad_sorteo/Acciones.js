export async function habilitar(data) {
  const url = `/api/sorteos_ex/habilitar/${data.id}`;
  const res = await fetch(url, { method: "PUT" });
  if (res.ok) {
    console.log(":D");
  }
}

export async function descalificar(data) {
  const url = `/api/sorteos_ex/inhabilitar/${data.id}`;
  const res = await fetch(url, { method: "PUT" });
  if (res.ok) {
    console.log(":D");
  }
}
