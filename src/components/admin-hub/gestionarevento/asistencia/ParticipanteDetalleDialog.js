import Image from "next/image";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React from "react";

const ParticipanteDetalleDialog = ({
  visible,
  onHide,
  participante,
  habilitarParticipante,
}) => {
  return (
    <Dialog visible={visible} onHide={onHide} header={"Participante"} modal>
      <div>
        <div className="">
          <div className="flex flex-column my-4">
            <label htmlFor="nombre" className="font-bold">
              Nombre:
            </label>

            <InputText
              name="nombre"
              value={participante.nombre}
              className="p-inputtext-lg"
              readOnly
            />
          </div>
          <div className="flex flex-column my-4">
            <label htmlFor="cedula" className="font-bold">
              Cedula:
            </label>
            <InputText
              name="cedula"
              value={participante.cedula}
              className="p-inputtext-lg"
              readOnly
            />
          </div>
        </div>
        <div className="">
          <div className="flex flex-column my-4">
            <label htmlFor="cargo" className="font-bold">
              Cargo:
            </label>
            <InputText
              name="cargo"
              className="p-inputtext-lg"
              value={participante.cargo}
              readOnly
            />
          </div>
          <div className="flex flex-column my-4">
            <label htmlFor="correo" className="font-bold">
              Correo:
            </label>
            <InputText
              name="correo"
              className="p-inputtext-lg w-96"
              value={participante.correo}
              readOnly
            />
          </div>
        </div>
        <div className="flex justify-center my-4">
          <Image
            src={participante.foto}
            alt="Foto de participante"
            width={250}
            height={300}
          />
        </div>
        <div>
          <Button
            severity="success"
            label="Habilitar Participante"
            text
            rounded
            raised
            icon="pi pi-check"
            onClick={() => habilitarParticipante()}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default ParticipanteDetalleDialog;
