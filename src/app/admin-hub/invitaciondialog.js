import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

const InvitacionDialog = ({ visible, onHide, evento_data }) => {
  const [eventoData, setEventoData] = useState({
    id: "",
    nombre_evento: "",
  });
  useEffect(() => {
    if (evento_data === undefined) {
      setEventoData({
        id: "",
        nombre_evento: "",
      });
    } else {
      setEventoData(evento_data);
    }
  }, [evento_data]);

  const footer = () => {
    return <h1>Hola</h1>;
  };

  const header = () => {
    return <h1>Invitacion de {evento_data.nombre_evento}</h1>;
  };

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={header}
      footer={footer}
      modal
    >
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={`http://localhost:3000/registrarusuario/${eventoData.id}`}
        viewBox={`0 0 256 256`}
      />
    </Dialog>
  );
};

export default InvitacionDialog;
