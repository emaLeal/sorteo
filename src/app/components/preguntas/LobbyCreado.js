import Image from 'next/image'
import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'
import QrDialog from './QrDialog'
import Aos from 'aos'

const LobbyCreado = ({
  cerrarLobby,
  lobby,
  users,
  socket,
  setPagina,
  data
}) => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <QrDialog visible={visible} onHide={() => setVisible(!visible)} />
      {lobby && (
        <>
          <div>
            <label className='font-bold text-2xl'>
              El Pin del Lobby es:{' '}
              <span
                className='underline underline-offset-8 cursor-pointer'
                onClick={() => navigator.clipboard.writeText(lobby)}
              >
                {lobby}
              </span>
            </label>
            <Button
              severity='help'
              icon='pi pi-qrcode'
              raised
              rounded
              tooltip='Ver QR'
              onClick={() => setVisible(!visible)}
            />
          </div>
        </>
      )}
      <h1 className='text-center my-4 font-bold text-3xl'>Lista De Usuarios</h1>

      <div className='grid grid-cols-3 gap-2 mx-10'>
        {users.map((user, index) => {
          if (user.participa === true && user.nombre !== 'admin') {
            return (
              <div
                data-aos='fade-down'
                key={index}
                className='flex justify-between p-4 items-center bg-white rounded-full'
              >
                <Image
                  width={50}
                  height={50}
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

      <div className='fixed bottom-0 right-0 mx-2 my-2'>
        {lobby &&
          users.filter(
            user => user.participa === true && user.nombre !== 'admin'
          ).length > 1 && (
            <Button
              label='Empezar'
              severity='success'
              onClick={() => {
                socket.emit('startTournament', {
                  ...data.pregunta,
                  lobbyId: lobby
                })
                setPagina('empezar')
              }}
            />
          )}
        <Button
          label='Cerrar Lobby'
          onClick={cerrarLobby}
          severity='danger'
          className='mx-2'
          raised
        />
      </div>
    </>
  )
}

export default LobbyCreado
