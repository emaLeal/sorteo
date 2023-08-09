/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { redirect, useRouter } from 'next/navigation'
import { Button } from 'primereact/button'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import SorteoDialog from './SorteoDialog'
import SorteoCarga from '../jugarevento/sorteoCarga'

const socket = io('http://localhost:3060')

const SocketComponent = ({ data }) => {
  const [lobby, setLobby] = useState(null)
  const [users, setusers] = useState([])
  const router = useRouter()
  const [pagina, setPagina] = useState('crear')
  // variables de Dialogo

  const [estilo, setEstilo] = useState(null)
  const [duracion, setDuracion] = useState(18)
  const [noImagen, setNoImagen] = useState(false)
  const [audio, setAudio] = useState('/audio-1.mp3')
  const [visible, setVisible] = useState(false)

  const crearLobby = () => {
    const participantes = data.participantes
    const admin = {
      nombre: 'admin',
      cedula: 1000,
      participa: false
    }
    participantes.push(admin)
    socket.emit('createLobby', participantes)
    setPagina('creado')
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
      setPagina('creado')
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
    socket.emit('deleteLobby', lobby)
    if (localStorage.getItem('socketUser')) {
      localStorage.removeItem('socketUser')
      setLobby(null)
      setusers([])
    }
    setPagina('crear')
  }

  const declararGanador = async ganador => {
    const body = {
      id: data.data.id,
      ganador: ganador.id,
      ganador_nombre: ganador.nombre
    }

    const res = await fetch('/api/declararganador', {
      method: 'PUT',
      body: JSON.stringify(body)
    })
    if (res.ok) {
      socket.emit('deleteLobby', lobby)
      localStorage.removeItem('socketUser')
      router.push(`/jugarevento/${data.data.evento_id}`)
    }
  }

  const onHide = () => {
    setVisible(!visible)
  }

  return (
    <>
      <SorteoDialog
        audio={audio}
        setAudio={setAudio}
        estilo={estilo}
        setEstilo={setEstilo}
        duracion={duracion}
        setDuracion={setDuracion}
        noImagen={noImagen}
        setNoImagen={setNoImagen}
        id={data.data.id}
        datosSorteo={data.data}
        visible={visible}
        setPagina={setPagina}
        onHide={onHide}
      />
      {pagina === 'crear' && (
        <>
          <Button label='Crear Lobby' onClick={crearLobby} />
        </>
      )}

      {pagina === 'creado' && (
        <>
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
            <label>
              Usuarios Faltantes por responder:{' '}
              {
                users.filter(
                  user => user.respuesta === null && user.nombre !== 'admin'
                ).length
              }
            </label>
          </ul>
          <Button label='Finalizar Sorteo' onClick={finalizarSorteo} />
        </>
      )}

      {pagina === 'terminar' && (
        <>
          <label>Torneo Finalizado</label>
          {users.filter(
            user => user.acertado === true && user.nombre !== 'admin'
          ).length === 1 && (
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
          {users.filter(
            user => user.acertado === true && user.nombre !== 'admin'
          ).length > 1 && (
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
      )}
      {pagina === 'aleatorio' && (
        <SorteoCarga
          data={data}
          audio={audio}
          noImagen={noImagen}
          participantes={users.filter(
            user => user.acertado === true && user.nombre !== 'admin'
          )}
          estilo={estilo}
          duracion={duracion}
        />
      )}
    </>
  )
}

export default SocketComponent
