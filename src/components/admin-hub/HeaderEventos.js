import { Button } from "primereact/button";

const Header = ({ setPrevData, setVisible, visible }) => {
  return (
    <div className="flex justify-between">
      <span className="font-bold self-center text-xl">Lista de Eventos</span>
      <div>
        <Button
          icon="pi pi-plus"
          text
          severity="success"
          className="hover:scale-110 transition-transform"
          tooltip="Crear Evento"
          onClick={() => {
            setPrevData(null);
            setVisible(!visible);
          }}
        />
      </div>
    </div>
  );
};

export default Header;
