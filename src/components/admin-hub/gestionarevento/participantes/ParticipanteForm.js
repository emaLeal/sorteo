import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const ParticipanteForm = ({ form, handleChange }) => {
  return (
    <>
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
    </>
  );
};

export default ParticipanteForm;
