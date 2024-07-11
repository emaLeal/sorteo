import React, { useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { QrReader } from "react-qr-reader";
import { Button } from "primereact/button";
import { PDFDocument, PDFPage } from 'pdf-lib';
import { Dialog } from "primereact/dialog";
import jsQR from 'jsqr'
import "./CustomButton.css";

const SubirQr = () => {
  const [qrValue, setQrValue] = useState("");
  const [scanning, setScanning] = useState(false);
  const handleScan = (data) => {
    if (data) {
      setQrValue(data);
      setScanning(false);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  const handleUpload = async (event) => {
    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const pdfData = new Uint8Array(reader.result);
      const pdfDoc = await PDFDocument.load(pdfData);
      let qrFound = false;

      for (let i = 0; i < pdfDoc.getPageCount(); i++) {
        const pdfPage = pdfDoc.getPage(i);
        const { width, height } = pdfPage.getSize();
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        // Renderizar la página PDF en el canvas
        pdfPage.drawRectangle({
          x: 0,
          y: 0,
          width,
          height,
        });
        pdfPage.drawText('Hello world!', {
          x: 50,
          y: height - 100,
          size: 24,
        });

        // Obtener los datos de la imagen del canvas
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        // Analizar la imagen en busca de un código QR usando jsQR
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setQrValue(code.data);
          qrFound = true;
          break;
        }
      }

      if (!qrFound) {
        console.error('No QR code found.');
        setQrValue('No QR code found.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const convertPDFPageToPDFJSPage = async (pdfPage) => {
    const pdfPageData = await pdfPage.getData();
    const pdfjsPage = await PDFJS.getDocument(pdfPageData).promise;
    return pdfjsPage.getPage(1);
  };

  // Función para renderizar una página PDF.js en un canvas


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
        <FileUpload
          mode="basic"
          className="w-2"
          chooseLabel="Leer Foto"
          customUpload
          uploadHandler={handleUpload}
          accept="pdf/*"
          auto
          chooseOptions={{
            icon: "pi pi-file",
            className:
              "custom-choose-btn p-button-rounded p-button-raised p-button-success w-full h-48 p-button-custom",
          }}
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
        />
      </Dialog>
      {qrValue && (
        <div>
          <h3>Valor del QR escaneado:</h3>
          <p>{qrValue}</p>
        </div>
      )}
    </>
  );
};

export default SubirQr;
