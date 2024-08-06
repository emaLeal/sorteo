/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import ParticipanteDetalleDialog from "./ParticipanteDetalleDialog";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import jsQR from "jsqr";
import { pdfjs } from "react-pdf";
import "./CustomButton.css";
import { Tooltip } from "primereact/tooltip";
import useMobile from "@/hooks/useMobile";
import Image from "next/image";
import QrScanner from "qr-scanner";
import "./qr.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const SubirQr = ({
  atributos,
  habilitarParticipante,
  canvasRef,
  errorRef,
  setDataQr,
  error,
  setError,
}) => {
  const isMobile = useMobile();
  // QR States
  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  const [scannedResult, setScannedResult] = useState("");

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
              habilitarParticipante(data.id, data.nombre);
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
              habilitarParticipante(data.id, data.nombre);
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

  // Success
  const onScanSuccess = (result) => {
    // 🖨 Print the "result" to browser console.
    console.log("Exito", result);

    // ✅ Handle success.
    // 😎 You can do whatever you want with the scanned result.
    const { id, nombre } = JSON.parse(decodeURIComponent(result.data));
    console.log(id, nombre);
    habilitarParticipante(id, nombre);
  };

  // Fail
  const onScanFail = (err) => {
    // 🖨 Print the "err" to browser console.
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: "environment",
        // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: true,
        // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
        // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxEl.current || undefined,
      });

      // 🚀 Start QR Scanner
      scanner.current
        .start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // 🧹 Clean up on unmount.
    // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  // ❌ If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

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

      <div className="hidden sm:flex w-screen h-96  justify-around items-center ">
        <Toast ref={errorRef} position="bottom-left"/>
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
      <div className="qr-reader sm:hidden">
        {/* QR */}
        <video ref={videoEl}></video>
        <div ref={qrBoxEl} className="qr-box">
          <Image
            src={"/qr-frame.svg"}
            alt="Qr Frame"
            width={256}
            height={256}
            className="qr-frame"
          />
        </div>

        {/* Show Data Result if scan is success */}
        {scannedResult && (
          <p
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 99999,
              color: "white",
            }}
          >
            Scanned Result: {scannedResult}
          </p>
        )}
      </div>
    </>
  );
};

export default SubirQr;
