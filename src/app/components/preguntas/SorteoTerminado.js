import Image from 'next/image'
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
      {users.filter(user => user.acertado === true && user.nombre !== 'admin')
        .length === 1 && (
        <>
          <h1 className='text-center font-bold text-xl'>
            El ganador del Sorteo es:
          </h1>
          <div className='flex justify-center'>
            <div className='my-4 flex justify-between items-center bg-white w-4 rounded-full p-4'>
              <Image
                width={75}
                height={75}
                className='w-auto h-auto'
                src={
                  users.find(
                    user => user.acertado === true && user.nombre !== 'admin'
                  ).foto === '/user.png'
                    ? users.find(
                        user =>
                          user.acertado === true && user.nombre !== 'admin'
                      ).foto
                    : `/api/foto${
                        users.find(
                          user =>
                            user.acertado === true && user.nombre !== 'admin'
                        ).foto
                      }`
                }
                alt='Foto de usuario'
              />
              <label className='font-bold text-lg text-center text-black'>
                {
                  users.find(
                    user => user.acertado === true && user.nombre !== 'admin'
                  ).nombre
                }
              </label>
            </div>
          </div>
          <Button
            className='mx-4'
            raised
            rounded
            severity='success'
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
          <h1 className='text-center font-bold text-2xl'>
            Los ganadores del sorteo son:
          </h1>
          <div className='mx-8 grid grid-cols-2 gap-4 my-4'>
            {users.map((user, index) => {
              if (user.acertado === true && user.nombre !== 'admin') {
                return (
                  <div
                    key={index}
                    className='flex justify-between p-4 items-center bg-white rounded-full'
                  >
                    <Image
                      width={30}
                      height={30}
                      className='w-auto h-auto'
                      src={
                        user.foto === '/user.png'
                          ? user.foto
                          : `/api/foto${user.foto}`
                      }
                      alt='Foto de usuario'
                    />
                    <label className='text-black'>{user.nombre}</label>
                  </div>
                )
              }
            })}
          </div>

          <div className='flex justify-end mx-8'>
            <Button
              onClick={() => setVisible(!visible)}
              label='Empezar Sorteo Aleatorio'
              rounded
              raised
              severity='success'
            />
          </div>
        </>
      )}

      <div className='mx-4 my-8'>
        <h2 className='text-center my-2 font-bold text-lg'>
          Respuestas de Usuarios{' '}
        </h2>

        <table className='w-full table-auto border-collapse'>
          <thead>
            <tr>
              <th
                className={`p-2 border border-black ${
                  data.pregunta.opcion_verdadera === 1
                    ? 'bg-emerald-600'
                    : 'bg-red-700'
                }`}
              >
                {data.pregunta.opcion1}
              </th>
              <th
                className={`p-2 border border-black ${
                  data.pregunta.opcion_verdadera === 2
                    ? 'bg-emerald-600'
                    : 'bg-red-700'
                }`}
              >
                {data.pregunta.opcion2}
              </th>
              <th
                className={`p-2 border border-black ${
                  data.pregunta.opcion_verdadera === 3
                    ? 'bg-emerald-600'
                    : 'bg-red-700'
                }`}
              >
                {data.pregunta.opcion3}
              </th>
              <th
                className={`p-2 border border-black ${
                  data.pregunta.opcion_verdadera === 4
                    ? 'bg-emerald-600'
                    : 'bg-red-700'
                }`}
              >
                {data.pregunta.opcion4}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                className={`p-2 text-center border border-black ${
                  data.pregunta.opcion_verdadera === 1
                    ? 'bg-emerald-500'
                    : 'bg-red-500'
                }`}
              >
                {users.filter(user => user.respuesta === 1).length}
              </td>
              <td
                className={`p-2 text-center border border-black ${
                  data.pregunta.opcion_verdadera === 2
                    ? 'bg-emerald-500'
                    : 'bg-red-500'
                }`}
              >
                {users.filter(user => user.respuesta === 2).length}
              </td>
              <td
                className={`p-2 text-center border border-black ${
                  data.pregunta.opcion_verdadera === 3
                    ? 'bg-emerald-500'
                    : 'bg-red-500'
                }`}
              >
                {users.filter(user => user.respuesta === 3).length}
              </td>
              <td
                className={`p-2 text-center border border-black ${
                  data.pregunta.opcion_verdadera === 4
                    ? 'bg-emerald-500'
                    : 'bg-red-500'
                }`}
              >
                {users.filter(user => user.respuesta === 4).length}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default SorteoTerminado
