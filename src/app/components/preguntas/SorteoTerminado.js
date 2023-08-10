import { Button } from 'primereact/button'
import React from 'react'

const SorteoTerminado = ({
  users,
  declararGanador,
  data,
  visible,
  setVisible
}) => {
  return (
    <>
      <label>Torneo Finalizado</label>
      {users.filter(user => user.acertado === true && user.nombre !== 'admin')
        .length === 1 && (
        <>
          <label>
            El ganador del Sorteo es:{' '}
            {
              users.find(
                user => user.acertado === true && user.nombre !== 'admin'
              ).nombre
            }
          </label>
          <Button
            label='Declarar Ganador'
            onClick={() =>
              declararGanador(
                users.find(
                  user => user.acertado === true && user.nombre !== 'admin'
                )
              )
            }
          />
        </>
      )}
      {users.filter(user => user.acertado === true && user.nombre !== 'admin')
        .length > 1 && (
        <>
          <label>Los ganadores del sorteo son:</label>
          <ul>
            {users.map((user, index) => {
              if (user.acertado === true && user.nombre !== 'admin') {
                return <li key={index}>{user.nombre}</li>
              }
            })}
          </ul>
        </>
      )}
      <label>Que Respondieron: </label>
      <div className='flex flex-column'>
        <div>
          <label
            className={`${
              data.pregunta.opcion_verdadera === 1 && 'text-green-500'
            }`}
          >
            {data.pregunta.opcion1}
          </label>
          <label
            className={`${
              data.pregunta.opcion_verdadera === 1 && 'text-green-500'
            }`}
          >
            {users.filter(user => user.respuesta === 1).length}
          </label>
        </div>
        <div>
          <label
            className={`${
              data.pregunta.opcion_verdadera === 2 && 'text-green-500'
            }`}
          >
            {data.pregunta.opcion2}
          </label>
          <label
            className={`${
              data.pregunta.opcion_verdadera === 2 && 'text-green-500'
            }`}
          >
            {users.filter(user => user.respuesta === 2).length}
          </label>
        </div>
        <div>
          <label
            className={`${
              data.pregunta.opcion_verdadera === 3 && 'text-green-500'
            }`}
          >
            {data.pregunta.opcion3}
          </label>
          <label
            className={`${
              data.pregunta.opcion_verdadera === 3 && 'text-green-500'
            }`}
          >
            {users.filter(user => user.respuesta === 3).length}
          </label>
        </div>
        <div>
          <label
            className={`${
              data.pregunta.opcion_verdadera === 4 && 'text-green-500'
            }`}
          >
            {data.pregunta.opcion4}
          </label>
          <label
            className={`${
              data.pregunta.opcion_verdadera === 4 && 'text-green-500'
            }`}
          >
            {users.filter(user => user.respuesta === 4).length}
          </label>
        </div>
      </div>
      <Button
        onClick={() => setVisible(!visible)}
        label='Empezar Sorteo Aleatorio'
      />
    </>
  )
}

export default SorteoTerminado
