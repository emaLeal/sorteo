"use client";
import React, { useRef, useEffect, useState } from "react";
import { Button } from "primereact/button";

const ImprimirPDF = ({ pdfBlob }) => {
  const iframeRef = useRef(null);
  const [pdfUrl, setPdfUrl] = useState();

  // Función para imprimir el PDF
  const imprimir = () => {
    const iframe = iframeRef.current;

    // Verifica que el iframe esté cargado antes de intentar imprimir
    if (iframe) {
      iframe.onload = () => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      };
    }
  };

  // Pre-cargar el Blob al montar el componente
  useEffect(() => {
    if (pdfBlob) {
      // Crear una URL a partir del Blob
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);

      // Limpiar la URL cuando el componente se desmonte
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [pdfBlob]);

  return (
    <div>
      {pdfUrl && (
        <iframe
          ref={iframeRef}
          src={pdfUrl}
          style={{ display: "none" }}
          title="PDF to print"
        ></iframe>
      )}
      <Button
        text
        raised
        rounded
        severity="success"
        icon="pi pi-print"
        tooltip="Imprimir Certificado"
        onClick={() => imprimir()}
        tooltipOptions={{ position: "left" }}
      />
    </div>
  );
};

export default ImprimirPDF;
