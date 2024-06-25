"use client";
import React, { useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import { usePathname, useRouter } from "next/navigation";

const Menu = ({ id }) => {
  const router = useRouter();
  const activeRoute = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  

  const items = [
   
    {
      index: 0,
      label: "Sorteos",
      icon: "pi pi-palette",
      route: `/admin-hub/gestionarevento/${id}/sorteos`,
      command: () => router.push(`/admin-hub/gestionarevento/${id}/sorteos`),
    },
    {
      index: 1,
      label: "Participantes",
      icon: "pi pi-users",
      route: `/admin-hub/gestionarevento/${id}/participantes`,
      command: () =>
        router.push(`/admin-hub/gestionarevento/${id}/participantes`),
    },
    {
      index: 2,
      label: "Asistencia",
      icon: "pi pi-users",
      route: `/admin-hub/gestionarevento/${id}/asistencia`,
      command: () => router.push(`/admin-hub/gestionarevento/${id}/asistencia`),
    },
    {
      index: 3,
      label: '',
      icon: 'pi',
      route: `/admin-hub/gestionarevento/${id}`,
      command: () => router.push(`/admin-hub/gestionarevento/${id}/sorteos`),

    }
  ];

  React.useEffect(() => {
    const { index } = items.find((e) => e.route === activeRoute);
    setActiveIndex(index)
  }, [activeRoute]);

  return (
    <div className="flex justify-center">
      <TabMenu
        model={items}
        activeIndex={activeIndex}
        onTabChange={(e) => {
          console.log(e.index);
          if (e.value.route === activeRoute) setActiveIndex(e.index);
        }}
      />
    </div>
  );
};

export default Menu;
