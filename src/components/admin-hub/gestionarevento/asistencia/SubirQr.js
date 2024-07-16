import React, { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import ParticipanteDetalleDialog from "./ParticipanteDetalleDialog";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import jsQR from "jsqr";
import { pdfjs } from "react-pdf";
import "./CustomButton.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const atributos = [
  "id",
  "nombre",
  "correo",
  "cargo",
  "evento_id",
  "foto",
  "cedula",
  "participara",
  "acepta",
  "nombre_empresa",
  "nombre_evento",
];

const initialForm = {
  id: 0,
  nombre: "",
  cedula: "",
  cargo: "",
  correo: "",
  evento_id: "",
  foto: "",
  participara: "",
  acepta: "",
  nombre_empresa: "",
  nombre_evento: "",
};

const SubirQr = () => {
  const canvasRef = useRef(null);
  const errorRef = useRef(null);
  const [dataQr, setDataQr] = useState(initialForm);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  const onHide = () => {
    setVisible(!visible);
  };

  const habilitarParticipante = async () => {
    const url = `/api/participante/habilitar/${dataQr.id}`;
    const res = await fetch(url, {
      method: "PUT",
      next: { revalidate: 0 },
    });
    if (res.ok) {
      errorRef.current.show({
        severity: "success",
        summary: "El Participante fue Habilitado",
        detail: "El participante fue habilitado exitosamente",
        life: 3000,
      });
      setVisible(!visible);
    }
  };

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
              throw new Error("El QR no es valido");
            }
          } catch (e) {
            console.log(e);
            setError("El QR no es valido");
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
      <ParticipanteDetalleDialog
        visible={visible}
        onHide={onHide}
        participante={dataQr}
        habilitarParticipante={habilitarParticipante}
      />
      <div className="w-screen h-96 flex justify-around items-center">
        <Toast ref={errorRef} />
        <FileUpload
          name="demo[]"
          customUpload
          uploadLabel="Subir Documento PDF"
          uploadHandler={handleUpload}
          accept=".pdf,.jpg,.jpeg,.png"
          uploadOptions={{
            icon: "pi pi-file-import",
            label: "Subir Documento",
            className:
              "custom-choose-btn p-button-rounded p-button-raised p-button-text p-button-success",
          }}
          chooseOptions={{
            icon: "pi pi-file",
            label: "Elegir Documento",
            className:
              "custom-choose-btn p-button-rounded p-button-raised p-button-text p-button-info",
          }}
        />
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      </div>
    </>
  );
};

export default SubirQr;
