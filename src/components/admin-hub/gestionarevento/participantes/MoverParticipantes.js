import React, { useState } from "react";
import MoverParticipantesForm from "./MoverParticipantesForm";
import { Dialog } from "primereact/dialog";

const initialForm = {
  cargo: "",
  sorteos: [],
};

const MoverParticipantes = ({ visible, setVisible, cargos, sorteos }) => {
  const [form, setForm] = useState(initialForm);
  const listaCargos = cargos;
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
    const res = await fetch(``)
  }

  return (
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
            <form className="p-fluid" method="post">
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
  );
};

export default MoverParticipantes;
