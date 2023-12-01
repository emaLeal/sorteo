"use server"
import executeQuery from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateShowImage(state, evento_id) {
  const toggle = state === 1 ? false : true;

  const update = await executeQuery({
    query: "update evento set mostrar_foto_empresa=? where id=?",
    values: [toggle, evento_id],
  });
  revalidatePath("/admin-hub");
}
