"use client";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { SlideMenu } from "primereact/slidemenu";
import React, { useRef } from "react";
import logo from "/public/logo.png";
import Image from "next/image";

const Menu = () => {
  const menu = useRef(null);
  const router = useRouter();
  const items = [
    {
      label: "Cerrar Sesion",
      icon: "pi pi-sign-out",
      command: () =>
        fetch("/api/logout").then((res) => {
          if (res.ok) router.push("/admin-log");
        }),
    },
  ];
  return (
    <div
      className="flex justify-between w-full"
      style={{ background: "#071426" }}
    >
      <div>
        <Image src={logo} width={75} alt="Logo Smartie" />
      </div>
      <div>
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
    </div>
  );
};

export default Menu;
