import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";

const initialForm = {
  nombre: "",
  cargo: "",
  correo: "",
  cedula: "",
};

const CrearParticipantes = ({ visible, onHide, evento }) => {
  const [form, setForm] = useState({ ...initialForm, evento_id: evento });
  const toast = useRef(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const header = () => {
    return (
      <div className="text-blue-500">
        <span>Crear Participante</span>
      </div>
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/participante", {
      method: "POST",
      body: JSON.stringify(form),
    });
    if (res.status === 201) {
      toast.current.show({
        severity: "success",
        summary: "Participante Creado",
        detail: "Se ha creado el participante correctamente",
        life: 3000,
      });
      console.log(res)
      onHide();
    }
  };

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={header}
      className="w-1/2"
      modal
    >
      <Toast ref={toast} />
      <div className="form-demo">
        <div>
          <div>
            <h2 className="font-bold mb-4">Crear Participante</h2>
            <form className="p-fluid" onSubmit={onSubmit} method="post">
              <div className="field mb-4">
                <span className="p-float-label p-input-icon-right">
                  <InputText
                    id="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    name="nombre"
                    placeholder="Nombre del Participante"
                    required
                  />
                  <label htmlFor="nombre">Nombre del Participante</label>
                </span>
              </div>
              <div className="field mb-4">
                <span className="p-float-label p-input-icon-right">
                  <InputText
                    id="cedula"
                    value={form.cedula}
                    onChange={handleChange}
                    name="cedula"
                    placeholder="Cedula del Participante"
                    required
                  />
                  <label htmlFor="cedula">Cedula del Participante</label>
                </span>
              </div>
              <div className="field mb-4">
                <span className="p-float-label p-input-icon-right">
                  <InputText
                    id="cargo"
                    value={form.cargo}
                    onChange={handleChange}
                    name="cargo"
                    placeholder="Cargo del Participante"
                    required
                  />
                  <label htmlFor="cargo">Cargo del Participante</label>
                </span>
              </div>
              <div className="field mb-4">
                <span className="p-float-label p-input-icon-right">
                  <InputText
                    id="correo"
                    value={form.correo}
                    onChange={handleChange}
                    name="correo"
                    placeholder="Correo del Participante"
                    required
                  />
                  <label htmlFor="correo">Correo del Participante</label>
                </span>
              </div>
              <Button
                type="submit"
                raised
                rounded
                severity="success"
                label="Crear Participante"
              />
            </form>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CrearParticipantes;
