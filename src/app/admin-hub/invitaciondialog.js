import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";

const InvitacionDialog = ({ visible, onHide, evento_data }) => {
  const [eventoData, setEventoData] = useState({
    id: "",
    nombre_evento: "",
  });
  const qrCodeRef = useRef(null);
  const invitacionLink = `/registrarusuario/${eventoData.id}`;
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

  const handleDownload = () => {
    if (qrCodeRef.current) {
      html2canvas(qrCodeRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "qr_code.png";
        link.click();
      });
    }
  };

  const footer = () => {
    return (
      <>
        <Button
          className="p-button p-button-warning p-button-rounded w-2"
          icon="pi pi-file-export"
          tooltip="Descargar QR"
          onClick={handleDownload}
        />
        <Button
          className="p-button p-button-info p-button-rounded w-2"
          icon="pi pi-paperclip"
          tooltip="Copiar Link de Invitación"
        />
      </>
    );
  };

  const header = () => {
    return <h1>Invitacion de {evento_data.nombre_evento}</h1>;
  };

  return (
    <Dialog
      className="w-1/4"
      visible={visible}
      onHide={onHide}
      header={header}
      footer={footer}
      modal
    >
      <div ref={qrCodeRef}>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={invitacionLink}
          viewBox={`0 0 256 256`}
        />
      </div>
    </Dialog>
  );
};

export default InvitacionDialog;
