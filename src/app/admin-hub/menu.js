"use client";
import { Menu } from 'primereact/menu'

const items = [
  {
    label: "Sorteo",
    icon: "pi pi-qrcode",
  },
  {
    label: "Usuarios",
    icon: "pi pi-users",
  },
];

const MenuAdmin = () => {
  return <Menu model={items}></Menu>;
}

export default MenuAdmin
