export function get() {}

export async function post(url, body) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return res;
}

export async function edit(url, body) {
  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  return res;
}

export async function delOne(url) {
  const res = await fetch(url, {
    method: "DELETE",
  });

  return res;
}
