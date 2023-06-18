import executeQuery from "@/app/lib/db";
import { jwtVerify } from "jose";

export default function sorteoHandler(req, res) {
  switch (req.method) {
    case "POST":
      return post();
    case "GET":
      return get();
    default:
      return res.status(405).end(`Metodo ${req.method} No admitido`);
  }

  async function post() {
    const body = JSON.parse(req.body);
    const result = await executeQuery({
      query:
        "INSERT INTO sorteos (adminid, nombre, descripcion, fecha_sorteo, img) values (?, ?, ?, ?, ?)",
    });
  }

  async function get() {
    try {
      const autenticado = req.headers['set-cookie'][0]
      const { payload } = await jwtVerify(
        new TextEncoder().encode(autenticado),
        new TextEncoder().encode(process.env.SECRET)
      )
      const result = await executeQuery({
        query: "SELECT * FROM sorteos WHERE adminid=?",
        values: [payload.id],
      });

      return res.status(200).json({ data: result });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ e });
    }
  }

  async function getOne(id) {}
}
