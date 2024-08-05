/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import ParticipanteDetalleDialog from "./ParticipanteDetalleDialog";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import jsQR from "jsqr";
import { pdfjs } from "react-pdf";
import "./CustomButton.css";
import { Tooltip } from "primereact/tooltip";
import useMobile from "@/hooks/useMobile";
import Image from "next/image";
import { Scanner } from "@yudiel/react-qr-scanner";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const SubirQr = ({
  atributos,
  habilitarParticipante,
  canvasRef,
  errorRef,
  dataQr,
  setDataQr,
  error,
  setError,
  visible,
  setVisible,
}) => {
  const isMobile = useMobile();
  const onHide = () => {
    setVisible(!visible);
  };
  const [result, setResult] = useState(null);

  const handleUploadPdf = (file) => {
    const fileReader = new FileReader();
    fileReader.onload = async function () {
      const typedArray = new Uint8Array(this.result);
      const pdf = await pdfjs.getDocument(typedArray).promise;

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          try {
            const data = JSON.parse(decodeURIComponent(code.data));
            if (verificarEstructuraParticipante(data, atributos)) {
              setDataQr(data);
              setVisible(!visible);
            } else {
              throw new Error("El QR no tiene buena estructura");
            }
          } catch (e) {
            console.log(e);
            setError("El QR no tiene buena estructura");
          }
        } else {
          setError("El QR no existe o no se pudo identificar");
        }
      }
    };

    fileReader.readAsArrayBuffer(file);
  };

  const handleUploadImage = (file) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        context.drawImage(img, 0, 0, img.width, img.height);

        const imageData = context.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          try {
            const data = JSON.parse(decodeURIComponent(code.data));
            if (verificarEstructuraParticipante(data, atributos)) {
              setDataQr(data);
              setVisible(!visible);
            } else {
              throw new Error("El QR no es valido");
            }
          } catch (e) {
            console.log(e);
            setError("El QR no es valido");
          }
        } else {
          setError("El QR no existe o no se pudo identificar");
        }
      };
      img.src = fileReader.result;
    };
    fileReader.readAsDataURL(file);
  };

  const handleUpload = (event) => {
    const file = event.files[0];
    if (!file) return;
    const fileType = file.type;
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (fileType === "application/pdf" || fileExtension === "pdf") {
      handleUploadPdf(file);
    } else if (
      fileType.startsWith("image/") &&
      (fileExtension === "jpg" ||
        fileExtension === "jpeg" ||
        fileExtension === "png")
    ) {
      handleUploadImage(file);
    } else {
      setError("El archivo solo acepta imagenes o pdf");
    }
  };

  const verificarEstructuraParticipante = (participante, atributos) => {
    let tmp = participante;
    atributos.forEach((atributo) => {
      if (tmp[atributo] === undefined) return false;
      tmp = tmp[atributo];
    });
    return true;
  };

  useEffect(() => {
    if (error !== "") {
      errorRef.current.show({
        severity: "error",
        summary: "Error",
        detail: error,
        life: 3000,
      });
    }
  }, [error]);

  return (
    <>
      <Tooltip
        target=".button-upload"
        content="Subir Documento"
        position="bottom"
      />
      <Tooltip
        target=".button-choose"
        content="Elegir Documento"
        position="bottom"
      />
      <Tooltip target=".button-cancell" content="Cancelar" position="bottom" />
      <ParticipanteDetalleDialog
        visible={visible}
        onHide={onHide}
        participante={dataQr}
        habilitarParticipante={habilitarParticipante}
      />
      <div className="hidden sm:flex w-screen h-96  justify-around items-center ">
        <Toast ref={errorRef} />
        <FileUpload
          name="demo[]"
          customUpload
          uploadHandler={handleUpload}
          accept=".pdf,.jpg,.jpeg,.png"
          uploadOptions={{
            icon: "pi pi-file-import",
            label: "Subir Documento",
            iconOnly: isMobile ? true : false,
            className:
              " p-button-rounded p-button-raised p-button-text p-button-success button-upload",
          }}
          chooseOptions={{
            icon: "pi pi-file",
            label: "Elegir Documento",
            iconOnly: isMobile ? true : false,
            className:
              " p-button-rounded p-button-raised p-button-text p-button-info button-choose",
          }}
          cancelOptions={{
            icon: "pi pi-times",
            label: "Cancelar",
            iconOnly: isMobile ? true : false,
            className:
              "custom-choose-btn p-button-rounded p-button-raised p-button-text p-button-danger button-cancell",
          }}
        />

        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      </div>
      <div className="sm:hidden w-48  flex flex-column">
        <Scanner classNames={'w-1/2'} onScan={(result) => setResult(result)} />

        {result && <label>Resultado: {result}</label>}
      </div>
    </>
  );
};

export default SubirQr;
