import { Button } from "primereact/button";

const Header = ({ setPrevData, setVisible, visible }) => {
  return (
    <div className="flex justify-between">
      <span className="font-bold self-center text-xl">Lista de Sorteos</span>
      <Button
        icon="pi pi-plus"
        className="p-button p-button-success p-button-text"
        tooltip="Crear Sorteo"
        tooltipOptions={{ position: "bottom" }}
        onClick={() => {
          setPrevData();
          setVisible(!visible);
        }}
      />
    </div>
  );
};

export default Header;
