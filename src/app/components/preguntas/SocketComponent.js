/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { redirect, useRouter } from 'next/navigation'
import { Button } from 'primereact/button'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3060')

const SocketComponent = ({ data }) => {
  const [lobby, setLobby] = useState(null)
  const [users, setusers] = useState([])
  const router = useRouter()
  const [pagina, setPagina] = useState('crear')

  const crearLobby = () => {
    const participantes = data.participantes
    const admin = {
      nombre: 'admin',
      cedula: 1000,
      participa: false
    }
    participantes.push(admin)
    socket.emit('createLobby', participantes)
  }

  const finalizarSorteo = () => {
    setPagina('terminar')
    socket.emit('finishTournament', lobby)
  }

  useEffect(() => {
    if (lobby !== null) {
      socket.emit('joinLobby', {
        lobbyId: lobby,
        cedula: 1000
      })
    }
  }, [lobby])

  useEffect(() => {
    console.log(data)
    if (localStorage.getItem('socketUser')) {
      const user = JSON.parse(localStorage.getItem('socketUser'))
      socket.emit('leaveLobby', user)

      socket.emit('joinLobby', user)
    }

    socket.on('connect_error', () => {
      console.log('Error de conexión con el servidor.')

      router.push('/admin-hub')
    })
  }, [])

  useEffect(() => {
    if (pagina === 'crear') {
      console.log('Crear Page')
    } else if (pagina === 'empezar') {
      console.log('Empezar Page')
    }
  }, [pagina])

  socket.on('updateLobbyUsers', users => {
    console.log(users)
    setusers(users.players)
  })

  socket.on('lobbyCreated', lobbyId => {
    setLobby(lobbyId)
  })

  socket.on('joinedLobby', user => {
    if (user !== 'No encontrado') {
      localStorage.setItem('socketUser', JSON.stringify(user))
    } else {
      if (localStorage.getItem('socketUser')) {
        localStorage.removeItem('socketUser')
      }
    }
  })


  const cerrarLobby = () => {
    if (localStorage.getItem('socketUser')) {
      localStorage.removeItem('socketUser')
      setLobby(null)
      setusers([])
    }
  }

  return (
    <>
      {pagina === 'crear' && (
        <>
          <Button label='Crear Lobby' onClick={crearLobby} />
          <Button label='Cerrar Lobby' onClick={cerrarLobby} />
          {lobby && <label>{lobby}</label>}

          <ul>
            {users.map((user, index) => {
              if (user.participa === true && user.nombre !== 'admin') {
                return <li key={index}>{user.nombre}</li>
              }
            })}
          </ul>
          <div className='absolute bottom-0 mx-2 my-2'>
            {lobby &&
              users.filter(
                user => user.participa === true && user.nombre !== 'admin'
              ).length > 0 && (
                <Button
                  label='Empezar'
                  onClick={() => {
                    socket.emit('startTournament', {
                      ...data.pregunta,
                      lobbyId: lobby
                    })
                    setPagina('empezar')
                  }}
                />
              )}
          </div>
        </>
      )}

      {pagina === 'empezar' && (
        <>
          <label>Pagina Empezar</label>
          <Button label='Volver' onClick={() => setPagina('crear')} />
          <ul>
            {users.map((user, index) => {
              if (user.respuesta !== null) {
                return <li key={index}>{user.nombre} ha respondido</li>
              }
            })}
          </ul>
          <Button label='Finalizar Sorteo' onClick={finalizarSorteo} />
        </>
      )}

      {pagina === 'terminar' && (
        <>
          <label>Torneo Finalizado</label>
          
        </>
      )}
    </>
  )
}

export default SocketComponent
