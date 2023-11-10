import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import SubirFoto from "@/components/subirfoto";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const opcionesCorrectas = [
  { label: "Opcion 1", value: 1 },
  { label: "Opcion 2", value: 2 },
  { label: "Opcion 3", value: 3 },
  { label: "Opcion 4", value: 4 },
];

const CrearSorteoForm = ({
  form,
  handleChange,
  setForm,
  handleChangePregunta,
  pregunta,
  data,
  formPregunta
}) => {
  return (
    <>
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
                value={formPregunta.opcion_verdadera}
                onChange={handleChangePregunta}
                name="opcion_verdadera"
                id="opcion_verdadera"
                placeholder="Opcion Correcta"
                required
              />
              <label htmlFor="opcion_verdadera">Opcion Correcta</label>
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
    </>
  );
};

export default CrearSorteoForm;
