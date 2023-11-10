import SubirFoto from "../subirfoto";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const CrearEventoForm = ({form, handleChange, data, setForm}) => {
  return (
    <>
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
    </>
  );
};

export default CrearEventoForm;
