import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "./CustomButton.css";

const SubirQr = () => {
  const [scanning, setScanning] = useState(false);

  const handleScan = (data) => {
    if (data) {
      console.log(data);
      setScanning(false);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <>
      <div className="w-screen h-96 flex justify-around items-center">
        <Button
          label="Escanear QR"
          icon="pi pi-camera"
          className="w-2 h-48 p-button-custom"
          rounded
          raised
          severity="help"
          onClick={() => setScanning(true)}
        />
      </div>

      <Dialog
        header="Escanear QR"
        visible={scanning}
        style={{ width: "50vw" }}
        onHide={() => setScanning(false)}
      >
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
          constraints={{ facingMode: "environment" }}
        />
      </Dialog>
    </>
  );
};

export default SubirQr;
