"use client";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import SubirFoto from "../subirfoto";
import { useRouter } from "next/navigation";

const initialForm = {
  nombre_evento: "",
  foto_evento: "",
  empresa: "",
  foto_empresa: "",
};

const CrearEventoDialog = ({ visible, onHide, data }) => {
  const [form, setForm] = useState(initialForm);
  const router = useRouter();
  const toast = useRef(null);

  useEffect(() => {
    if (data === null || data === undefined) {
      setForm(initialForm);
    } else {
      setForm({
        id: data.id,
        nombre_evento: data.nombre_evento,
        foto_evento: data.foto_evento,
        empresa: data.empresa,
        foto_empresa: data.foto_empresa,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const header = () => {
    return (
      <div className="text-blue-500">
        <span>Crear Evento</span>
      </div>
    );
  };

  const postEvent = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/eventos`, {
      method: "POST",
      body: JSON.stringify(form),
    });
    if (res.ok) {
      if (m.status === 201) {
        toast.current.show({
          severity: "success",
          summary: "Evento Creado",
          detail: "Se ha creado correctamente el evento",
          life: 3000,
        });
        onHide();
        router.refresh();
      }
    }
  };

  const updateEvent = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/eventos/${form.id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
    if (res.ok) {
      if (m.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Evento Editado",
          detail: "Se ha editado correctamente el evento",
          life: 3000,
        });
        onHide();
        router.refresh();
      }
    }
  };

  return (
    <>
      <Toast ref={toast} />

      <Dialog
        header={header}
        visible={visible}
        className="w-1/2"
        onHide={onHide}
        modal
      >
        <div className="form-demo">
          <div className="card text-center">
            <h2 className="font-bold mb-4">Crear Evento</h2>
            <form
              className="p-fluid"
              method="post"
              onSubmit={
                data === null || data === undefined ? postEvent : updateEvent
              }
            >
              <div className="field mb-4">
                <span className="p-float-label p-input-icon-right">
                  <InputText
                    id={"nombre_evento"}
                    value={form.nombre_evento}
                    name="nombre_evento"
                    onChange={handleChange}
                  />
                  <label htmlFor="nombre_evento">Nombre del Evento</label>
                </span>
              </div>
              <div className="field mb-4">
                <span className="p-float-label p-input-icon-right">
                  <InputText
                    value={form.empresa}
                    name="empresa"
                    id="empresa"
                    onChange={handleChange}
                  />
                  <label htmlFor="empresa">Empresa</label>
                </span>
              </div>
              <div className="field mb-4">
                <SubirFoto
                  setForm={setForm}
                  form={form}
                  field={"foto_evento"}
                  title={"Foto para Evento"}
                />
              </div>
              <div className="field mb-4">
                <SubirFoto
                  setForm={setForm}
                  form={form}
                  field={"foto_empresa"}
                  title={"Foto para Empresa"}
                />
              </div>
              {data === null || data === undefined ? (
                <Button
                  label="Crear Evento"
                  className="p-button p-button-success p-button-rounded"
                  type="submit"
                />
              ) : (
                <Button
                  label="Editar Evento"
                  className="p-button p-button-warning p-button-rounded"
                  type="submit"
                />
              )}
            </form>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CrearEventoDialog;
