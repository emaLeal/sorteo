"use client";
import React from "react";
import { TabMenu } from "primereact/tabmenu";
import { useRouter } from "next/navigation";

const Menu = ({ id }) => {
  const router = useRouter();
  const items = [
    {
      label: "Sorteos",
      icon: "pi pi-palette",
      command: () => router.push(`/admin-hub/gestionarevento/${id}/sorteos`),
    },
    { label: "Participantes", icon: "pi pi-users", command: () => router.push(`/admin-hub/gestionarevento/${id}/participantes`) },
  ];

  return (
    <div className="flex justify-center">
      <TabMenu model={items} />
    </div>
  );
};

export default Menu;
