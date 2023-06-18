'use client'
import { InputText } from "primereact/inputtext";
import { Calendar } from 'primereact/calendar'

export default async function CrearSorteoPage() {
  return (

    <form>
      <div className="form-demo my-12">
        <div className="field">
          <span className="p-float-label">
            <InputText id='nombre' name="nombre" />
            <label htmlFor="nombre">Nombre del Sorteo</label>
          </span>
        </div>
        <div className="field">
          <span className="p-float-label">
            <InputText id='descripcion' name="descripcion" />
            <label htmlFor="descripcion">Descripción del Sorteo</label>
          </span>
        </div>
        <div className="field">
          <span>
            <Calendar name="fecha_sorteo" id="fecha" placeholder="Fecha del sorteo" />
          </span>
        </div>
      </div>
    </form>
  )
}