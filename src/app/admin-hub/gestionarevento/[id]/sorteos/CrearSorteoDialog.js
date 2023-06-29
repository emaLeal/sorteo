/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { post } from "@/app/lib/fetchMethod";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";

const initialForm = {
  nombre: "",
  evento_id: "",
};

const CrearSorteoDialog = ({ visible, onHide, data, evento }) => {
  const [form, setForm] = useState(initialForm);
  const toast = useRef(null);

  useEffect(() => {
    if (data === null || data === undefined) {
      setForm({ ...form, evento_id: evento });
    } else {
      setForm({
        nombre: data.nombre,
        evento_id: evento,
      });
    }
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const res = post("/api/sorteo", form);
    res.then((m) => {
      if (m.status === 201) {
        toast.current.show({
          severity: "success",
          summary: "Sorteo Creado",
          detail: "Se ha creado correctamente el sorteo",
          life: 3000,
        });
        onHide();
      }
    });
  };

  const header = () => {
    return (
      <div className="text-blue-500">
        <span>Crear Sorteo</span>
      </div>
    );
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog header={header} visible={visible} onHide={onHide} modal>
        <form onSubmit={onSubmit}>
          <div className="field mb-4">
            <span className="p-float-label p-input-icon-right">
              <InputText
                value={form.nombre}
                name="nombre"
                id="nombre"
                onChange={handleChange}
              />
              <label htmlFor="nombre">Nombre del Evento</label>
            </span>
          </div>
          {data === undefined || data === null ? (
            <Button
              label="Crear Sorteo"
              icon="pi pi-plus"
              type="submit"
              className="p-button p-button-success p-button-rounded"
            />
          ) : (
            <Button
              type="submit"
              icon="pi pi-pencil"
              label="Editar Sorteo"
              className="p-button p-button-warning p-button-rounded"
            />
          )}
        </form>
      </Dialog>
    </>
  );
};

export default CrearSorteoDialog;
