import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { read, utils } from "xlsx";

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
  visible,
  setVisible,
  router,
  evento,
  toast
}) => {
  const options = [
    { label: "Habilitado", value: "1" },
    { label: "No habilitado", value: "0" },
    { label: "Cancelar Filtro", value: null },
  ]; //  Opciones de Estados

  const cargos = [...new Set(data.map((dato) => dato.cargo))]; // Creando los cargos posibles

  const optionsCargo = [
    ...cargos.map((cargos) => ({
      label: cargos,
      value: cargos,
    })),
    { label: "Cancelar Filtro", value: null },
  ]; // Creando seleccion de cargos

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
        console.log(res.status)
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
      <ConfirmDialog />

      <div className="flex justify-between">
        <div>
          <InputText
            placeholder="Escribe un nombre"
            value={globalFilterValue}
            name="nombre"
            onChange={onGlobalFilterChange}
          />
          <Dropdown
            options={optionsCargo}
            name="cargo"
            value={cargo}
            onChange={onGlobalFilterChange}
            placeholder="Filtrar por cargo"
          />
          <Dropdown
            options={options}
            name="participara"
            value={participar}
            onChange={onGlobalFilterChange}
            placeholder="Estado de los participantes"
          />
        </div>
        <div className="flex ">
          <Button
            className="my-2"
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
            chooseLabel="Subir Varios Participantes"
          />
          <Button
            severity="success"
            text
            raised
            tooltip="Crear Participante"
            tooltipOptions={{ position: "left" }}
            onClick={() => setVisible(!visible)}
            icon="pi pi-plus"
            className="mx-2"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
