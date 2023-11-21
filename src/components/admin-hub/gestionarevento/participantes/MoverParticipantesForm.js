import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";

const MoverParticipantesForm = ({
  form,
  cargos,
  setForm,
  handleChange,
  sorteos,
}) => {
  const [valid, setValid] = useState(false);
  const handleChangeSorteos = (e) => {
    const _sorteos = [...form.sorteos];

    if (e.checked) _sorteos.push(e.value);
    else _sorteos.splice(_sorteos.indexOf(e.value), 1);
    setForm({ ...form, sorteos: _sorteos });
  };

  React.useEffect(() => {
    if (form.cargo === "" || form.cargo === null || form.sorteos.length === 0) {
      setValid(false);
      return;
    }
    setValid(true);
  }, [form]);

  return (
    <>
      <div className="field mb-4">
        <span className="p-float-label p-input-icon-right">
          <Dropdown
            options={cargos}
            value={form.cargo}
            name="cargo"
            onChange={handleChange}
          />
          <label htmlFor="cargo">Cargo o Area de Participante</label>
        </span>
      </div>
      <div className="field mb-4">
        <span className="text-lg font-bold">Lista de Sorteos: </span>
        <br />
        {sorteos.map((sorteo, key) => {
          return (
            <div key={key}>
              <span className="font-bold text-xl">{sorteo.nombre}: </span>
              <Checkbox
                value={sorteo.id}
                name={sorteo.nombre}
                onChange={handleChangeSorteos}
                checked={form.sorteos.includes(sorteo.id)}
                disabled={form.cargo === "" || form.cargo === null}
              />
            </div>
          );
        })}
      </div>
      <div className="my-4">
        <Button
          type="submit"
          severity="warning"
          text
          raised
          rounded
          label="Mover participantes"
          disabled={!valid}
        />
      </div>
    </>
  );
};

export default MoverParticipantesForm;
