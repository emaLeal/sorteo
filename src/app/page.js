import { redirect } from "next/navigation"

export default async function RootPage() {
  redirect('/admin-hub')
  return <h1>Pagina Principal</h1>
}