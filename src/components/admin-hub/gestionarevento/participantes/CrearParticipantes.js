import { useRouter } from "next/navigation";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import ParticipanteForm from "./ParticipanteForm";
import React, { useEffect, useRef, useState } from "react";

const initialForm = {
  nombre: "",
  cargo: "",
  correo: "",
  cedula: "",
};

const CrearParticipantes = ({ visible, onHide, evento }) => {
  const [form, setForm] = useState({ ...initialForm, evento_id: evento });
  const toast = useRef(null);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setForm({ ...initialForm, evento_id: evento });
  }, [visible, evento]);

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
      onHide();
      router.refresh();
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
              <ParticipanteForm form={form} handleChange={handleChange} />
            </form>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CrearParticipantes;
