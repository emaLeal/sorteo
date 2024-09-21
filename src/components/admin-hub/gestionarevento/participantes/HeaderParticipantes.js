import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { read, utils } from "xlsx";
import { Tooltip } from "primereact/tooltip";
import CrearParticipantes from "./CrearParticipantes";
import MoverParticipantes from "./MoverParticipantes";
import { useState, useEffect } from "react";

const Header = ({
  globalFilterValue,
  setGlobalFilterValue,
  filters,
  setFilters,
  participar,
  setParticipar,
  cargo,
  setCargo,
  data,
  router,
  evento,
  toast,
  selectedParticipantes,
}) => {
  const [visible, setVisible] = useState(false);
  const [mostrarVisible, setMostrarVisible] = useState(false);
  const [sorteos, setSorteos] = useState([]);

  const options = [
    { label: "Habilitado", value: "1" },
    { label: "No habilitado", value: "0" },
    { label: "Cancelar Filtro", value: null },
  ]; //  Opciones de Estados
  const cargos = [...new Set(data.map((dato) => dato.cargo))]; // Creando los cargos posibles

  const optionsCargo = [
    ...cargos.map((cargo) => ({
      label: cargo,
      value: cargo,
    })),
    { label: "Cancelar Filtro", value: null },
  ]; // Creando seleccion de cargos

  useEffect(() => {
    fetch(`/api/sorteos/${evento}`)
      .then((res) => res.json())
      .then((json) => {
        setSorteos(json.data);
      });
  }, [evento]);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters[e.target.name].value = value;

    setFilters(_filters);
    if (e.target.name === "participara") {
      setParticipar(value);
    } else if (e.target.name === "nombre") {
      setGlobalFilterValue(value);
    } else if (e.target.name === "cargo") {
      setCargo(value);
    }
  };

  const onUpload = ({ files }) => {
    const [file] = files;
    console.log(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const bsrt = e.target.result;
      const wb = read(bsrt, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = utils.sheet_to_json(ws);
      const participantes = [];
      console.log(data)
      /* Update state */
      data.forEach((row) => {
        const dataEl = {
          nombre: row.nombre,
          cargo: row.cargo,
          evento_id: evento,
          correo: row.correo,
          cedula: row.cedula,
        };
        participantes.push(dataEl);
      });
      console.log(participantes);

      fetch("/api/participantes", {
        method: "POST",
        body: JSON.stringify(participantes),
        headers: {
          "Content-type": "application/json",
        },
      }).then((res) => {
        if (res.status === 201) {
          toast.current.show({
            severity: "success",
            summary: "Participantes Creados",
            detail: "Se han subido correctamente los participantes",
            life: 3000,
          });
          router.refresh();
        }
      });
    };
    reader.readAsBinaryString(file);
  };

  const eliminarParticipantes = () => {
    confirmDialog({
      message:
        "Estas seguro de querer eliminar todos los participantes de este evento?",
      header: "Eliminar Todos",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Eliminar Todos",
      rejectLabel: "Cancelar",
      acceptIcon: "pi pi-trash",
      rejectIcon: "pi pi-check",
      acceptClassName: "p-button p-button-danger p-button-text p-button-raised",
      rejectClassName: "p-button p-button-text p-button-raised",
      accept: async () => delParticipantes(),
    });
  };

  const delParticipantes = async () => {
    try {
      const res = await fetch(`/api/participantes/${evento}`, {
        method: "DELETE",
      });
      if (res.ok) {
        console.log(res.status);
        router.refresh();
        toast.current.show({
          severity: "error",
          summary: "Participantes eliminados",
          detail: "Se han eliminado todos los participantes",
          life: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Tooltip
        target=".custom-choose-btn"
        content="Subir varios participantes"
        position="bottom"
      />
      <ConfirmDialog />
      <CrearParticipantes
        visible={visible}
        router={router}
        evento={evento}
        onHide={() => setVisible(!visible)}
      />
      <MoverParticipantes
        visible={mostrarVisible}
        setVisible={setMostrarVisible}
        cargos={optionsCargo}
        sorteos={sorteos}
        selectedParticipantes={selectedParticipantes}
        evento={evento}
      />
      <div className="flex justify-between">
        <div>
          <InputText
            placeholder="Escribe un nombre"
            value={globalFilterValue}
            name="nombre"
            onChange={onGlobalFilterChange}
            className="max-sm:hidden"
          />
          <Dropdown
            options={optionsCargo}
            name="cargo"
            value={cargo}
            className="max-sm:hidden"
            onChange={onGlobalFilterChange}
            placeholder="Filtrar por cargo"
          />
          <Dropdown
            className="max-sm:hidden w-4"
            options={options}
            name="participara"
            value={participar}
            onChange={onGlobalFilterChange}
            placeholder="Estado de los participantes"
          />
        </div>
        <div className="flex ">
          <Button
            label="Mover a sorteos especificos"
            severity="warning"
            rounded
            raised
            tooltip="Mover a sorteos especificos"
            tooltipOptions={{ position: "bottom" }}
            text
            disabled={selectedParticipantes.length === 0}
            size="small"
            className="max-sm:hidden my-2 mx-2"
            onClick={() => setMostrarVisible(!visible)}
          />
          <Button
            className="max-sm:hidden my-2"
            label="Eliminar Participantes"
            severity="danger"
            text
            onClick={eliminarParticipantes}
            tooltip="Eliminar todos los participantes"
            tooltipOptions={{ position: "right" }}
            size="small"
            icon="pi pi-trash"
            raised
            rounded
          />

          <FileUpload
            mode="basic"
            name="demo[]"
            accept=".xlsx"
            customUpload={true}
            maxFileSize={1000000}
            uploadHandler={onUpload}
            auto
            chooseOptions={{
              icon: "pi pi-file-excel",
              iconOnly: true,
              className:
                "custom-choose-btn p-button-rounded p-button-raised p-button-text p-button-success",
              size: "small",
            }}
            className="max-sm:hidden my-2 ml-2"
          />
          <Button
            severity="success"
            text
            raised
            rounded
            size="small"
            tooltip="Crear Participante"
            tooltipOptions={{ position: "left" }}
            onClick={() => setVisible(!visible)}
            icon="pi pi-plus"
            className="max-sm:hidden ml-2 my-2"
          />
         
        </div>
      </div>
    </>
  );
};

export default Header;
