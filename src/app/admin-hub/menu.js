"use client";
import { Button } from "primereact/button";
import { SlideMenu } from "primereact/slidemenu";
import React, { useRef } from "react";

const Menu = () => {
  const menu = useRef(null);
  const items = [
    {
      label: "Cerrar Sesion",
      icon: "pi pi-sign-out",
    },
  ];
  return (
    <div className="card flex justify-end">
      <SlideMenu
        ref={menu}
        model={items}
        popup
        viewportHeight={50}
        menuWidth={175}
      ></SlideMenu>
      <Button
        icon="pi pi-bars"
        className="p-button p-button-primary p-button-rounded"
        onClick={(event) => menu.current.toggle(event)}
      ></Button>
    </div>
  );
};

export default Menu;
