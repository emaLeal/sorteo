import { redirect } from "next/navigation"

export default async function EventoPage({ params }) {
  const {id} = params
  redirect(`/admin-hub/gestionarevento/${id}/sorteos`)
}