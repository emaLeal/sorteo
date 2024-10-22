"use client";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import { pdf, PDFDownloadLink } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import Template from "@/lib/template";

const CertificadosComponent = ({
  participantes,
  nombre_empresa,
  nombre_evento,
  foto_empresa,
  fondo_color,
  fuente_color,
  borde_color,
  fondo_campos,
}) => {
  const [participante, setParticipante] = useState(null);
  const [cedula, setCedula] = useState();
  const [error, setError] = useState(false);
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  const buscarParticipante = () => {
    const buscar = participantes.find(
      (participant) => participant.cedula === cedula
    );
    if (buscar === undefined) {
      console.log("Participante no encontrado");
      setError(true);
      setParticipante(null);
      return;
    }
    setParticipante(buscar);
    setError(false);
  };

  const imprimirCertificado = async () => {
    const blob = await pdf(
      <Template
        participante={participante}
        nombre_evento={nombre_evento}
        nombre_empresa={nombre_empresa}
        foto_empresa={foto_empresa}
        fondo_color={fondo_color}
        fuente_color={fuente_color}
        borde_color={borde_color}
        fondo_campos={fondo_campos}
      />
    ).toBlob();
    const formData = new FormData();
    formData.append("file", blob, "certificado.pdf");
    fetch("https://socket.smartie.com.co/api/imprimir", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <>
      <section className="flex justify-center my-24">
        <InputText
          placeholder="Cedula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          className="sm:w-96"
        />
        <Button
          onClick={() => buscarParticipante()}
          label="Buscar"
          icon="pi pi-search"
          raised
          severity="secondary"
          className="mx-2"
          size="small"
          iconPos="right"
        />
      </section>
      <Panel header="Participante Encontrado" className="my-12 mx-4">
        {participante !== null && (
          <section className="flex justify-between">
            <div>
              <span className="pi pi-user mx-2" />
              <label className="text-lg">{participante.nombre}</label>
            </div>
            <div>
              {client && (
                <>
                  <PDFDownloadLink
                    document={
                      <Template
                        participante={participante}
                        nombre_evento={nombre_evento}
                        nombre_empresa={nombre_empresa}
                        foto_empresa={foto_empresa}
                        fondo_color={fondo_color}
                        fuente_color={fuente_color}
                        borde_color={borde_color}
                        fondo_campos={fondo_campos}
                      />
                    }
                    fileName={`${participante.cedula}`}
                  >
                    <Button
                      icon="pi pi-download"
                      raised
                      rounded
                      text
                      size="small"
                      tooltip={"Descargar Certificado"}
                      tooltipOptions={{ position: "left" }}
                    />
                  </PDFDownloadLink>
                  <Button
                    icon="pi pi-print"
                    severity="success"
                    text
                    raised
                    rounded
                    tooltip="Imprimir"
                    onClick={() => imprimirCertificado()}
                    tooltipOptions={{ position: "left" }}
                  />
                </>
              )}
            </div>
          </section>
        )}
        {error && <label>No se encontró esta cedula</label>}
      </Panel>
    </>
  );
};

export default CertificadosComponent;
