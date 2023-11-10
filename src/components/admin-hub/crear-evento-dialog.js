"use client";
import { Dialog } from "primereact/dialog";
import { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import CrearEventoForm from "./CrearEventoForm";

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
      if (res.status === 201) {
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
      if (res.status === 200) {
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
              <CrearEventoForm
                data={data}
                form={form}
                handleChange={handleChange}
                setForm={setForm}
              />
            </form>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CrearEventoDialog;
