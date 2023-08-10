/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import SorteoDialog from './SorteoDialog'
import SorteoCarga from '../jugarevento/sorteoCarga'
import CrearLobby from './CrearLobby'
import LobbyCreado from './LobbyCreado'
import EmpezarSorteo from './EmpezarSorteo'
import SorteoTerminado from './SorteoTerminado'

const socket = io('http://localhost:3060')

const SocketComponent = ({ data }) => {
  const [lobby, setLobby] = useState(null)
  const [users, setusers] = useState([])
  const router = useRouter()
  const [pagina, setPagina] = useState('creado')
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
          <CrearLobby crearLobby={crearLobby} />
        </>
      )}

      {pagina === 'creado' && (
        <LobbyCreado
          cerrarLobby={cerrarLobby}
          users={users}
          lobby={lobby}
          socket={socket}
          setPagina={setPagina}
          data={data}
        />
      )}

      {pagina === 'empezar' && (
        <EmpezarSorteo
          setPagina={setPagina}
          users={users}
          finalizarSorteo={finalizarSorteo}
        />
      )}

      {pagina === 'terminar' && (
        <SorteoTerminado
          users={users}
          declararGanador={declararGanador}
          visible={visible}
          data={data}
          setVisible={setVisible}
        />
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
