/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { post } from "@/app/lib/fetchMethod";
import SubirFoto from "@/app/components/subirfoto";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";

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
  opcionCorrecta: 0,
};

const opcionesCorrectas = [
  { label: "Opcion 1", value: 1 },
  { label: "Opcion 2", value: 2 },
  { label: "Opcion 3", value: 3 },
  { label: "Opcion 4", value: 4 },
];

const CrearSorteoDialog = ({ visible, onHide, data, evento }) => {
  const [form, setForm] = useState(initialForm);
  const [formPregunta, setFormPregunta] = useState(initialFormPregunta);
  const [pregunta, setPregunta] = useState(false);
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
    }
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
              <div className="field mb-4">
                <span className="p-float-label p-input-icon-right">
                  <Checkbox
                    name="pregunta"
                    id="pregunta"
                    value={pregunta}
                    onChange={handleChange}
                    checked={pregunta}
                  />
                  <label htmlFor="pregunta">Incluir Pregunta rapida?</label>
                </span>
              </div>
              {pregunta && (
                <>
                  <div className="field mb-4">
                    <span className="p-float-label p-input-icon-right">
                      <InputText
                        value={formPregunta.preguntalabel}
                        onChange={handleChangePregunta}
                        name="preguntalabel"
                        id="preguntalabel"
                        placeholder="Escribe tu pregunta"
                      />
                      <label htmlFor="preguntalabel">Pregunta</label>
                    </span>
                  </div>
                  <div className="field mb-4">
                    <span className="p-float-label p-input-icon-right">
                      <InputText
                        value={formPregunta.opcion1}
                        onChange={handleChangePregunta}
                        name="opcion1"
                        id="opcion1"
                        placeholder="Opcion 1"
                        required
                      />
                      <label htmlFor="opcion1">Opcion 1</label>
                    </span>
                  </div>
                  <div className="field mb-4">
                    <span className="p-float-label p-input-icon-right">
                      <InputText
                        value={formPregunta.opcion2}
                        onChange={handleChangePregunta}
                        name="opcion2"
                        id="opcion2"
                        placeholder="Opcion 2"
                        required
                      />
                      <label htmlFor="opcion2">Opcion 2</label>
                    </span>
                  </div>
                  <div className="field mb-4">
                    <span className="p-float-label p-input-icon-right">
                      <InputText
                        value={formPregunta.opcion3}
                        onChange={handleChangePregunta}
                        name="opcion3"
                        id="opcion3"
                        placeholder="Opcion 3"
                        required
                      />
                      <label htmlFor="opcion3">Opcion 3</label>
                    </span>
                  </div>
                  <div className="field mb-4">
                    <span className="p-float-label p-input-icon-right">
                      <InputText
                        value={formPregunta.opcion4}
                        onChange={handleChangePregunta}
                        name="opcion4"
                        id="opcion4"
                        placeholder="Opcion 4"
                        required
                      />
                      <label htmlFor="opcion4">Opcion 4</label>
                    </span>
                  </div>
                  <div className="field mb-4">
                    <span className="p-float-label p-input-icon-right">
                      <Dropdown
                        options={opcionesCorrectas}
                        value={formPregunta.opcionCorrecta}
                        onChange={handleChangePregunta}
                        name="opcionCorrecta"
                        id="opcioncorrecta"
                        placeholder="Opcion Correcta"
                        required
                      />
                      <label htmlFor="opcioncorrecta">Opcion Correcta</label>
                    </span>
                  </div>
                </>
              )}
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
