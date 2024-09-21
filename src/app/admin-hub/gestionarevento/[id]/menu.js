"use client";
import React, { useState, useEffect } from "react";
import { TabMenu } from "primereact/tabmenu";
import { usePathname, useRouter } from "next/navigation";
import { Menubar } from "primereact/menubar";
import useMobile from "@/hooks/useMobile";

const Menu = ({ id }) => {
  const router = useRouter();
  const activeRoute = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useMobile();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(!isClient);
  }, []);
  const [items, setItems] = useState([
    {
      index: 0,
      label: "Volver",
      icon: "pi pi-arrow-left",
      route: "/admin-hub",
      command: () => router.push("/admin-hub"),
    },
    {
      index: 1,
      label: "Sorteos",
      icon: "pi pi-palette",
      route: `/admin-hub/gestionarevento/${id}/sorteos`,
      command: () => router.push(`/admin-hub/gestionarevento/${id}/sorteos`),
    },
    {
      index: 2,
      label: "Participantes",
      icon: "pi pi-users",
      route: `/admin-hub/gestionarevento/${id}/participantes`,
      command: () =>
        router.push(`/admin-hub/gestionarevento/${id}/participantes`),
    },
    {
      index: 3,
      label: "Asistencia",
      icon: "pi pi-users",
      route: `/admin-hub/gestionarevento/${id}/asistencia`,
      command: () => router.push(`/admin-hub/gestionarevento/${id}/asistencia`),
    },
    {
      index: 4,
      label: "Historial",
      icon: "pi pi-stopwatch",
      route: `/admin-hub/gestionarevento/${id}/historial`,
      command: () => router.push(`/admin-hub/gestionarevento/${id}/historial`),
    },
    {
      index: 5,
      label: "Certificados",
      icon: "pi pi-file",
      route: `/admin-hub/gestionarevento/${id}/certificados`,
      command: () =>
        router.push(`/admin-hub/gestionarevento/${id}/certificados`),
    },
    {
      index: 6,
      label: "",
      icon: "pi",
      route: `/admin-hub/gestionarevento/${id}`,
      command: () => router.push(`/admin-hub/gestionarevento/${id}/sorteos`),
    },
  ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const route = items.find((e) => e.route === activeRoute);
    if (route !== undefined) {
      setActiveIndex(route.index);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRoute]);

  return (
    <>
      {isMobile ? (
        <Menubar model={items} className="w-72" />
      ) : (
        <TabMenu
          model={items}
          activeIndex={activeIndex}
          onTabChange={(e) => {
            if (e.value.route === activeRoute) setActiveIndex(e.index);
          }}
        />
      )}
    </>
  );
};

export default Menu;
