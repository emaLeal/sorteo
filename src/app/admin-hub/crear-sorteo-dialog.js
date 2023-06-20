"use client";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { useState } from "react";

const initialForm = {
  nombre: "",
  descripcion: "",
  fecha_sorteo: "",
};

const CrearSorteoDialog = ({ visible }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog visible={visible} onHide={() => (visible = false)}>
      <div className="form-demo">
        <div className="card text-center">
          <h2 className="font-bold mb-4">Inicio de Sesion</h2>
          <form className="p-fluid" method="post">
            <div className="field">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <InputText id={"nombre"} name="nombre" onChange={handleChange} />
                <label htmlFor="nombre">Nombre del Sorteo</label>
              </span>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default CrearSorteoDialog;
