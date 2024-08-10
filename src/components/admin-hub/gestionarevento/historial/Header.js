import { Button } from "primereact/button";
import React from "react";
import { write, utils } from "xlsx";

const Header = ({ evento_id, data }) => {
  const downloadXlsx = async (rowData) => {
    try {
      const idEvento = rowData.id;
      const nombreEvento = rowData.nombre_evento;
      const work = utils.book_new();

      // Participantes
      const transformedData = await getAllParticipantes(idEvento);
      const workSheetParticipantes = utils.json_to_sheet(transformedData);
      utils.book_append_sheet(work, workSheetParticipantes, "Participantes");

      // Sorteos Exclusivos
      const allSorteos = await getAllSorteos(idEvento);

      const exclusivos = allSorteos.data.map(async (sorteo) => {
        let participantesExclusivosSorteo = await getParticipantesExclusivos(
          sorteo.id
        );

        const workSheetParticipantesExclusivos = utils.json_to_sheet(
          participantesExclusivosSorteo
        );

        return {
          ...workSheetParticipantesExclusivos,
          nombre_sorteo: sorteo.nombre,
        };
      });

      const allExclusivos = await Promise.all(exclusivos);
      allExclusivos.forEach((el) => {
        utils.book_append_sheet(work, el, el.nombre_sorteo);
      });

      const buffer = write(work, { type: "array", bookType: "xlsx" });
      saveAsExcel(buffer, `Participantes de evento ${nombreEvento}`);
    } catch (error) {
      console.error(error);
    }
  };

  function saveAsExcel(buffer, nombre) {
    const EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const EXCEL_EXTENSION = ".xlsx";
    const download = window.document.createElement("a");
    download.href = window.URL.createObjectURL(
      new Blob([buffer], { type: EXCEL_TYPE })
    );
    download.download = nombre + EXCEL_EXTENSION;
    document.body.appendChild(download);
    download.click();
    document.body.removeChild(download);
  }

  const getParticipantesExclusivos = async (sorteo) => {
    const url = `/api/sorteos_ex/${sorteo}`;
    const res = await fetch(url);
    if (res.ok) {
      const json = await res.json();
      const data = json.data.map((participante) => {
        delete participante.evento_id;
        delete participante.sorteo_id;
        delete participante.foto;
        delete participante.id;
        participante.asistencia = participante.habilitado === 1 ? "SÍ" : "NO";
        delete participante.habilitado;
        return participante;
      });
      return data;
    }
  };

  const getAllSorteos = async (id) => {
    const url = `/api/sorteos/${id}`;
    const res = await fetch(url);
    if (res.ok) {
      const json = await res.json();
      return json;
    }
  };

  const getAllParticipantes = async (id) => {
    const url = `/api/participante/${id}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Error fetching participantes");
    }
    const json = await res.json();

    const allData = json.data.map((part) => {
      part.asistencia = part.participara === 1 ? "SÍ" : "NO";
      delete part.participara;
      part.acepta_terminos = part.acepta === 1 ? "SÍ" : "NO";
      delete part.acepta;
      delete part.id;
      delete part.evento_id;
      delete part.foto;
      return part;
    });

    return allData;
  };
  return (
    <div className="flex justify-between">
      <h1>Historial de Participantes</h1>
      <Button
        icon="pi pi-file-export"
        rounded
        text
        raised
        severity="success"
        onClick={() =>
          downloadXlsx({
            ...data,
            id: evento_id,
            nombre_evento: data.data[0].nombre_evento,
          })
        }
      />
    </div>
  );
};

export default Header;
