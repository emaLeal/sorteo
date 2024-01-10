"use client";
import { PanelMenu } from "primereact/panelmenu";
import { useEffect, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import Image from "next/image";
import Link from "next/link";
import DetalleSorteoDialog from "../admin-hub/gestionarevento/sorteos/DetalleSorteoDialog";

const MenuSorteo = ({ data, configuraciones }) => {
  const [items, setItems] = useState([]);
  const [detalleVisible, setDetalleVisible] = useState(false);
  const [datosSorteo2, setDatosSorteo2] = useState({});

  const onHideDetalle = () => setDetalleVisible(!detalleVisible);

  useEffect(() => {
    const templateNoJugado = (sorteo) => {
      return (
        <>
          <div className="my-2 p-2 h-52 overflow-y-auto">
            <label>
              Premio del Sorteo: {sorteo.premio}{" "}
              <Button
                size="small"
                icon="pi pi-info"
                text
                raised
                onClick={() => {
                  setDetalleVisible(true);
                  setDatosSorteo2(sorteo);
                }}
                rounded
                severity="help"
                tooltip="Información sorteo"
                tooltipOptions={{ position: "right" }}
              />
            </label>
            <div className="flex justify-center my-2">
              <Image
                src={`/api/foto${sorteo.premio_foto}`}
                alt={sorteo.nombre}
                width={150}
                height={150}
              />
            </div>
            <div>
              <Link
                href={`/sorteo/${encodeURIComponent(
                  JSON.stringify({ ...configuraciones, sorteo_id: sorteo.id })
                )}`}
              >
                <Button
                  label="Jugar Sorteo"
                  text
                  raised
                  rounded
                  severity="help"
                  className="p-button w-full mb-2"
                />
              </Link>
              <Link
                href={`/sorteo/${encodeURIComponent(
                  JSON.stringify({
                    ...configuraciones,
                    sorteo_id: sorteo.id,
                    exclusivos: true,
                  })
                )}`}
              >
                <Button
                  label="Jugar Sorteo con Participantes Exclusivos"
                  text
                  raised
                  rounded
                  severity="success"
                  className="p-button w-full mb-2"
                />
              </Link>

              {sorteo.pregunta === 1 && (
                <Link href={`/sorteopregunta/${sorteo.id}`}>
                  <Button
                    text
                    raised
                    rounded
                    label="Jugar con Pregunta"
                    className="p-button p-button-primary p-button-rounded w-full"
                  />
                </Link>
              )}
            </div>
          </div>
        </>
      );
    };

    const templateJugado = (sorteo) => {
      return (
        <>
          <div className="my-2">
            <label>
              Premio del Sorteo: {sorteo.premio}{" "}
              <Button
                size="small"
                icon="pi pi-info"
                text
                raised
                onClick={() => {
                  setDetalleVisible(true);
                  setDatosSorteo2(sorteo);
                }}
                rounded
                severity="help"
                tooltip="Información sorteo"
                tooltipOptions={{ position: "right" }}
              />
            </label>
            <div className="flex justify-center my-2">
              <Image
                src={`/api/foto${sorteo.premio_foto}`}
                alt={sorteo.nombre}
                width={150}
                height={150}
              />
            </div>
          </div>
          <div>
            <label className="font-bold">
              Ganador del Sorteo: {sorteo.nombre_ganador}
            </label>
          </div>
        </>
      );
    };

    if (data !== undefined) {
      const sortItems = [];

      data.data.map((sorteo) => {
        const sorteoItem = {
          label: (
            <div className="flex justify-between ">
              <Checkbox checked={sorteo.jugado === 1} disabled />
              <span className="ml-4">{sorteo.nombre}</span>
            </div>
          ),
          items: [
            {
              label: "Opciones",
              template: () =>
                sorteo.jugado === 0
                  ? templateNoJugado(sorteo)
                  : templateJugado(sorteo),
            },
          ],
        };
        sortItems.push(sorteoItem);
      });
      setItems(sortItems);
    }
  }, [data]);

  return (
    <>
      <DetalleSorteoDialog
        visible={detalleVisible}
        onHide={onHideDetalle}
        rowData={datosSorteo2}
      />
      <div className="card flex justify-content-center my-2 overflow-y-auto">
        <PanelMenu model={items} className="w-full md:w-25rem" />
      </div>
    </>
  );
};

export default MenuSorteo;
