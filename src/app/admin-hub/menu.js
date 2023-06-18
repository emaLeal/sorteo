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

export default function MenuAdmin() {
  return <Menu model={items}></Menu>;
}
