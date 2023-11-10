/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import CrearSorteoForm from "./CrearSorteoForm";

const initialForm = {
  nombre: "",
  premio: "",
  premio_foto: "",
  evento_id: "",
  pregunta: false,
};

const initialFormPregunta = {
  preguntalabel: "",
  opcion1: "",
  opcion2: "",
  opcion3: "",
  opcion4: "",
  opcion_verdadera: 0,
};

const CrearSorteoDialog = ({ visible, onHide, data, evento }) => {
  const [form, setForm] = useState(initialForm);
  const [formPregunta, setFormPregunta] = useState(initialFormPregunta);
  const [pregunta, setPregunta] = useState(false);
  const toast = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (data === null || data === undefined) {
      setForm({ ...initialForm, evento_id: evento });
      setFormPregunta(initialFormPregunta);
      setPregunta(false);
    } else {
      if (data.pregunta === 1) {
        setForm({
          nombre: data.nombre,
          premio: data.premio,
          premio_foto: data.premio_foto,
          evento_id: evento,
          pregunta: true,
        });
        setPregunta(true);
        setFormPregunta({
          ...data.dataPreguntas,
        });
      } else if (data.pregunta === 0) {
        setForm({
          nombre: data.nombre,
          premio: data.premio,
          premio_foto: data.premio_foto,
          evento_id: evento,
          pregunta: false,
        });
      }

      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    setForm({
      ...form,
      pregunta,
    });
  }, [pregunta]);

  const handleChange = (e) => {
    if (e.target.name === "pregunta") {
      setPregunta(!pregunta);
    }
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePregunta = (e) => {
    setFormPregunta({
      ...formPregunta,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let body = {};
    if (form.pregunta === true) {
      body = JSON.stringify({ ...form, ...formPregunta });
    } else {
      body = JSON.stringify(form);
    }
    const res = await fetch("/api/sorteo", {
      method: "POST",
      body,
    });

    if (res.status === 201) {
      toast.current.show({
        severity: "success",
        summary: "Sorteo Creado",
        detail: "Se ha creado correctamente el sorteo",
        life: 3000,
      });
      onHide();
      router.refresh();
    }
  };

  const updateSorteo = async (e) => {
    e.preventDefault();
    let body = {};
    if (form.pregunta === true) {
      body = JSON.stringify({ ...form, ...formPregunta });
    } else {
      body = JSON.stringify(form);
    }
    console.log(body);
    const res = await fetch(`/api/sorteo/${data.id}`, {
      method: "PUT",
      body,
    });

    if (res.status === 200) {
      toast.current.show({
        severity: "success",
        summary: "Sorteo Editado",
        detail: "Se ha editado correctamente el sorteo",
        life: 3000,
      });
      onHide();
      router.refresh();
    }
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
              <CrearSorteoForm
                form={form}
                handleChange={handleChange}
                setForm={setForm}
                handleChangePregunta={handleChangePregunta}
                pregunta={pregunta}
                data={data}
                formPregunta={formPregunta}
              />
            </form>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CrearSorteoDialog;
