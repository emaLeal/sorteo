import React, { useState, useRef } from "react";
import MoverParticipantesForm from "./MoverParticipantesForm";
import { Dialog } from "primereact/dialog";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";

const initialForm = {
  cargo: "",
  sorteos: [],
};

const MoverParticipantes = ({
  visible,
  setVisible,
  cargos,
  sorteos,
  evento,
}) => {
  const [form, setForm] = useState(initialForm);
  const router = useRouter();
  const listaCargos = cargos;
  const toast = useRef(null);
  const header = () => {
    return (
      <div className="text-blue-500">
        <span>Mover Participantes</span>
      </div>
    );
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/sorteos_ex`, {
      method: "POST",
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setVisible(!visible);
      router.refresh();
      toast.current.show({
        severity: "success",
        summary: "Participantes Trasladados",
        detail: "Se han trasladado los participantes correctamente",
        life: 3000,
      });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={visible}
        onHide={() => setVisible(!visible)}
        header={header}
        className="w-1/3"
        modal
      >
        <div className="form-demo">
          <div>
            <div>
              <h2 className="font-bold mb-4">Mover Participantes</h2>
              <form className="p-fluid" onSubmit={handleSubmit} method="post">
                <MoverParticipantesForm
                  form={form}
                  setForm={setForm}
                  handleChange={handleChange}
                  cargos={listaCargos}
                  sorteos={sorteos}
                />
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default MoverParticipantes;
