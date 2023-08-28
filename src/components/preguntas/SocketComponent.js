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
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import 'aos/dist/aos.css' // Asegúrate de importar los estilos de AOS en tus componentes
import Aos from 'aos'

const socket = io('https://socket.smartie.com.co')

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
    Aos.init()
    if (sessionStorage.getItem('socketUser')) {
      const user = JSON.parse(sessionStorage.getItem('socketUser'))
      socket.emit('leaveLobby', user)

      socket.emit('joinLobby', user)
      setLobby(user.lobbyId)
      setPagina('creado')
    }

    socket.on('connect_error', () => {
      console.log('Error de conexión con el servidor.')

      router.push('/admin-hub')
    })
  }, [])

  socket.on('updateLobbyUsers', users => {
    setusers(users.players)
  })

  socket.on('lobbyCreated', lobbyId => {
    setLobby(lobbyId)
  })

  socket.on('joinedLobby', user => {
    if (user !== 'No encontrado') {
      sessionStorage.setItem('socketUser', JSON.stringify(user))
    } else {
      if (sessionStorage.getItem('socketUser')) {
        sessionStorage.removeItem('socketUser')
      }
    }
  })

  const cerrarLobby = () => {
    socket.emit('deleteLobby', lobby)
    if (sessionStorage.getItem('socketUser')) {
      sessionStorage.removeItem('socketUser')
      setLobby(null)
      setusers([])
    }
    setPagina('crear')
  }

  const declararGanador = ganador => {
    confirmDialog({
      message: `Seguro que quiere declarar a ${ganador.nombre} como el Ganador del Sorteo?`,
      header: 'Confirmacion',
      accept: async () => {
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
          sessionStorage.removeItem('socketUser')
          router.push(`/jugarevento/${data.data.evento_id}`)
        }
      },
      acceptLabel: 'Declarar Ganador',
      rejectLabel: 'Cancelar'
    })
  }

  const onHide = () => {
    setVisible(!visible)
  }

  return (
    <>
      <ConfirmDialog />
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
