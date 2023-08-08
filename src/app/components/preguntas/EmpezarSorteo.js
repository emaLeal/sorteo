import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'

const EmpezarSorteo = ({ setPagina, data }) => {
  const [opciones, setOpciones] = useState([])
  const [opcion, setOpcion] = useState(0)

  useEffect(() => {
    setOpciones([
      {
        label: data.pregunta.opcion1,
        value: 1
      },
      {
        label: data.pregunta.opcion2,
        value: 2
      },
      {
        label: data.pregunta.opcion3,
        value: 3
      },
      {
        label: data.pregunta.opcion4,
        value: 4
      }
    ])
  }, [])

  useEffect(() => {
    console.log(opcion)
  }, [opcion])

  return (
    <>
      <h1>Pagina Empezar</h1>
      <Button label='Volver' onClick={() => setPagina('crear')} />
      <div>
        <label>¿{data.pregunta.pregunta}?</label>
        {opciones.map((opcion, index) => {
          return (
            <>
              <div className='block'>
                <Button
                  onClick={() => setOpcion(opcion.value)}
                  label={opcion.label}
                />
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}

export default EmpezarSorteo
