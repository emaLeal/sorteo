"use client";
import "../globals.css";
import { useRouter } from "next/navigation";
import AdminForm from "./adminform";

export default async function AdminPage() {
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({
        usuario: e.target.user.value,
        contrasena: e.target.password.value,
      }),
    }).then((res) => {
      if (res.status === 200) {
        router.push("/admin-hub");
      }
    });
  };

  return (
    <main className="h-screen pt-10">
      <AdminForm onSubmit={onSubmit} />
    </main>
  );
}
