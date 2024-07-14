import React, { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import jsQR from "jsqr";
import { pdfjs } from "react-pdf";
import "./CustomButton.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const SubirQr = () => {
  const canvasRef = useRef(null);
  const errorRef = useRef(null);
  const [dataQr, setDataQr] = useState(null);
  const [error, setError] = useState("");

  const handleUpload = (event) => {
    const file = event.files[0];
    if (!file) return;

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
            console.log(data)
            setDataQr(data);
          } catch (e) {
            console.log(e);
            setError("El QR no es valido")
          }
        } else {
          setError("El QR no existe o no se pudo identificar")
        }
      }
    };

    fileReader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    if (error !== '') {
      errorRef.current.show({
        severity: "error",
        summary: "Error",
        detail: error,
        life: 3000,
      });
    }
  }, [error])

  return (
    <>
      <div className="w-screen h-96 flex justify-around items-center">
        <Toast ref={errorRef} />
        <FileUpload
          name="demo[]"
          customUpload
          auto
          mode="basic"
          uploadHandler={handleUpload}
          accept="application/pdf"
        />
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      </div>
    </>
  );
};

export default SubirQr;
