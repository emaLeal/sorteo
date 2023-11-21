"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AdminForm from "@/components/admin-log/adminform";

export default function AdminPage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({
          usuario: e.target.user.value,
          contrasena: e.target.password.value,
        }),
      });
      if (res.ok) {
        if (res.status === 200) {
          router.push("/admin-hub");
        }
        if (res.status === 400) {
          throw res;
        }
      }
    } catch (error) {
      setError("Credenciales Incorrectos");
    }
  };

  return (
    <main className="h-screen pt-10">
      <AdminForm onSubmit={onSubmit} error={error} />
    </main>
  );
}
