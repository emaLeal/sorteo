import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { SketchPicker } from "react-color";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

const CambiarColorDialog = ({ visible, onHide, datosEvento }) => {
  // Estado para los colores de los campos
  const [form, setForm] = useState({});
  // Estado para el campo seleccionado actualmente
  const [selectedField, setSelectedField] = useState(null);
  // Estado para el color actual
  const [color, setColor] = useState("#fff");
  const toast = useRef(null);

  useEffect(() => {
    setForm({
      fondo_color: datosEvento[0].fondo_color,
      fuente_color: datosEvento[0].fuente_color,
      borde_color: datosEvento[0].borde_color,
      fondo_campos: datosEvento[0].fondo_campos,
    });
  }, [datosEvento]);

  // Maneja el cambio de color
  const handleColorChange = (color) => {
    setColor(color.hex);

    if (selectedField) {
      setForm((prevForm) => ({
        ...prevForm,
        [selectedField]: color.hex,
      }));
    }
  };

  // Maneja la selección de un campo
  const handleFieldClick = (field) => {
    setSelectedField(field);
    setColor(form[field] || "#fff"); // Establece el color actual en el picker al del campo seleccionado
  };

  const cambiarColor = async (e) => {
    e.preventDefault();
    const url = `/api/cambiocolor/${datosEvento[0].id}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.current.show({
        severity: "success",
        summary: "Colores cambiados",
        detail: "Los colores de la plantilla han cambiado correctamente",
        life: 3000,
      });
      onHide();
    }
  };

  return (
    <Dialog visible={visible} onHide={onHide} header={"Escoger Colores"} modal>
      <Toast ref={toast} />
      <div className="flex justify-center mb-4">
        <SketchPicker color={color} onChangeComplete={handleColorChange} />
      </div>
      <form onSubmit={cambiarColor}>
        <span className="p-float-label p-input-icon-right mx-4">
          <InputText
            className="p-float-label p-input-icon-right"
            placeholder="Fondo Color"
            id="fondo_color"
            name="fondo_color"
            value={form.fondo_color || ""}
            style={{ backgroundColor: form.fondo_color }}
            onClick={() => handleFieldClick("fondo_color")}
            readOnly
          />
          <label htmlFor="fondo_color">Color de Fondo</label>
        </span>
        <span className="p-float-label p-input-icon-right mx-4">
          <InputText
            placeholder="Fuente Color"
            id="fuente_color"
            name="fuente_color"
            value={form.fuente_color || ""}
            style={{ backgroundColor: form.fuente_color }}
            onClick={() => handleFieldClick("fuente_color")}
            className="p-float-label p-input-icon-right"
            readOnly
          />
          <label htmlFor="fuente_color">Color de Fuente</label>
        </span>
        <span className="p-float-label p-input-icon-right mx-4">
          <InputText
            placeholder="Borde Color"
            value={form.borde_color || ""}
            name="borde_color"
            id="borde_color"
            style={{ backgroundColor: form.borde_color }}
            onClick={() => handleFieldClick("borde_color")}
            readOnly
          />
          <label htmlFor="borde_color">Color de Borde</label>
        </span>

        <span className="p-float-label p-input-icon-right mx-4">
          <InputText
            placeholder="Fondo Campos"
            id="fondo_campos"
            name="fondo_campos"
            value={form.fondo_campos || ""}
            style={{ backgroundColor: form.fondo_campos }}
            className="p-float-label p-input-icon-right"
            onClick={() => handleFieldClick("fondo_campos")}
            readOnly
          />
          <label htmlFor="fondo_campos">Color de Campos</label>
        </span>

        <Button
          type="submit"
          value={"Editar Colores"}
          severity="warning"
          icon="pi pi-pencil"
          text
          className="mx-2"
          tooltip="Cambiar Colores"
          tooltipOptions={{ position: "left" }}
          raised
          rounded
        />
      </form>
    </Dialog>
  );
};

export default CambiarColorDialog;
