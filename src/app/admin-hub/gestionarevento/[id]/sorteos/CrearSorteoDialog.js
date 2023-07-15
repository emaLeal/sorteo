/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { post } from "@/app/lib/fetchMethod";
import SubirFoto from "@/components/subirfoto";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";

const initialForm = {
  nombre: "",
  premio: "",
  premio_foto: "",
  evento_id: "",
};

const CrearSorteoDialog = ({ visible, onHide, data, evento }) => {
  const [form, setForm] = useState(initialForm);
  const toast = useRef(null);

  useEffect(() => {
    if (data === null || data === undefined) {
      setForm({ ...initialForm, evento_id: evento });
    } else {
      setForm({
        nombre: data.nombre,
        premio: data.premio,
        premio_foto: data.premio_foto,
        evento_id: evento,
      });
    }
  }, [data]);

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

  const updateSorteo = (e) => {
    e.preventDefault();
    fetch(`/api/sorteo/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    }).then((res) => {
      if (res.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Sorteo Editado",
          detail: "Se ha editado correctamente el sorteo",
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
      <Dialog
        header={header}
        visible={visible}
        onHide={onHide}
        modal
        className="w-1/2"
      >
        <div className="form-demo">
          <div className="card text-center">
            <h2 className="font-bold mb-4">Crear Sorteo</h2>
            <form
              onSubmit={
                data === undefined || data === null ? onSubmit : updateSorteo
              }
              className="p-fluid"
            >
              <div className="field mb-4">
                <span className="p-float-label p-input-icon-right">
                  <InputText
                    value={form.nombre}
                    name="nombre"
                    id="nombre"
                    onChange={handleChange}
                  />
                  <label htmlFor="nombre">Nombre del Sorteo</label>
                </span>
              </div>
              <div className="field mb-4">
                <span className="p-float-label p-input-icon-right">
                  <InputText
                    value={form.premio}
                    name="premio"
                    id="premio"
                    onChange={handleChange}
                  />
                  <label htmlFor="premio">Premio del Sorteo</label>
                </span>
              </div>
              <div className="field mb-4">
                <SubirFoto
                  form={form}
                  setForm={setForm}
                  title={"Imagen para Premio"}
                  field={"premio_foto"}
                />
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
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CrearSorteoDialog;
