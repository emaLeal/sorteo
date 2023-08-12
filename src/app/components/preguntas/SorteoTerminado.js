import Aos from 'aos'
import Image from 'next/image'
import { Button } from 'primereact/button'
import { ProgressBar } from 'primereact/progressbar'
import React, { useEffect } from 'react'

const SorteoTerminado = ({
  users,
  declararGanador,
  data,
  visible,
  setVisible
}) => {
  const getPorcentaje = opcion => {
    if (opcion === 1) {
      return (
        (users.filter(user => user.respuesta === 1).length * 100) /
        users.filter(user => user.nombre !== 'admin').length
      )
    }
    if (opcion === 2) {
      return (
        (users.filter(user => user.respuesta === 2).length * 100) /
        users.filter(user => user.nombre !== 'admin').length
      )
    }
    if (opcion === 3) {
      return (
        (users.filter(user => user.respuesta === 3).length * 100) /
        users.filter(user => user.nombre !== 'admin').length
      )
    }
    if (opcion === 4) {
      return (
        (users.filter(user => user.respuesta === 4).length * 100) /
        users.filter(user => user.nombre !== 'admin').length
      )
    }
  }

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
          <div className='flex mx-8 my-4'>
            <Button
              onClick={() => setVisible(!visible)}
              label='Empezar Sorteo Aleatorio'
              rounded
              raised
              severity='success'
            />
          </div>
          <h1 className='text-center font-bold text-2xl'>
            Los ganadores del sorteo son:
          </h1>
          <div className='mx-10 h-5/6 grid grid-cols-2 gap-4 my-4'>
            {users.map((user, index) => {
              if (user.acertado === true && user.nombre !== 'admin') {
                return (
                  <div
                  data-aos='fade-down'
                    key={index}
                    className='flex flex-column justify-center h-72 items-center bg-white rounded-full'
                  >
                    <div>
                      <Image
                        width={125}
                        height={125}
                        className='w-auto h-auto'
                        src={
                          user.foto === '/user.png'
                            ? user.foto
                            : `/api/foto${user.foto}`
                        }
                        alt='Foto de usuario'
                      />
                    </div>
                    <div className='mt-10'>
                      <label className='text-black font-bold text-lg'>
                        {user.nombre}
                      </label>
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </>
      )}

      <div className='my-8 mx-10 bg-slate-700 p-2'>
        <h2 className='text-center my-2 font-bold text-lg'>
          Respuestas de Usuarios{' '}
        </h2>

        <div>
          <div className='py-2'>
            <div className='flex justify-between mb-2'>
              <span>{data.pregunta.opcion1}:</span>
              <span>{users.filter(user => user.respuesta === 1).length}</span>
            </div>
            <ProgressBar
              value={getPorcentaje(1)}
              showValue={false}
              className={
                data.pregunta.opcion_verdadera === 1
                  ? 'bg-green-700'
                  : 'bg-red-700'
              }
              color={data.pregunta.opcion_verdadera === 1 ? 'green' : 'red'}
            />
          </div>
          <div className=' py-2'>
            <div className='flex justify-between mb-2'>
              <span>{data.pregunta.opcion2}:</span>
              <span>{users.filter(user => user.respuesta === 2).length}</span>
            </div>
            <ProgressBar
              value={getPorcentaje(2)}
              showValue={false}
              className={
                data.pregunta.opcion_verdadera === 2
                  ? 'bg-green-700'
                  : 'bg-red-700'
              }
              color={data.pregunta.opcion_verdadera === 2 ? 'green' : 'red'}
            />
          </div>
          <div className='py-2'>
            <div className='flex justify-between mb-2'>
              <span>{data.pregunta.opcion3}:</span>
              <span>{users.filter(user => user.respuesta === 3).length}</span>
            </div>
            <ProgressBar
              value={getPorcentaje(3)}
              showValue={false}
              className={
                data.pregunta.opcion_verdadera === 3
                  ? 'bg-green-700'
                  : 'bg-red-700'
              }
              color={data.pregunta.opcion_verdadera === 3 ? 'green' : 'red'}
            />
          </div>
          <div className='py-2'>
            <div className='flex justify-between mb-2'>
              <span>{data.pregunta.opcion4}:</span>
              <span>{users.filter(user => user.respuesta === 4).length}</span>
            </div>
            <ProgressBar
              value={getPorcentaje(4)}
              showValue={false}
              className={
                data.pregunta.opcion_verdadera === 4
                  ? 'bg-green-700'
                  : 'bg-red-700'
              }
              color={data.pregunta.opcion_verdadera === 4 ? 'green' : 'red'}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default SorteoTerminado
