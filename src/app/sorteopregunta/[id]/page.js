import Image from 'next/image'
import SocketComponent from '../../components/preguntas/SocketComponent'

async function getData (id) {
  const url = `http://localhost:3000/api/sorteo/${id}`

  const res = await fetch(url, { cache: 'no-store' })

  const json = await res.json()

  return json
}

async function getEvento (id) {
  const url = `http://localhost:3000/api/eventos/${id}`
  const res = await fetch(url, {
    cache: 'no-store'
  })

  const json = await res.json()

  return json
}

export default async function SocketPage ({ params }) {
  const { id } = params

  const data = await getData(id)
  const evento = await getEvento(data.data.evento_id)

  return (
    <>
      <div
        className='flex justify-center font-bold text-3xl mb-2 p-2'
        style={{ background: '#508ec3' }}
      >
        <h1 className='mx-4'>{evento.data.nombre_evento}</h1>
        <Image
          style={{ width: 'auto', height: 'auto' }}
          src={`/api/foto${evento.data.foto_empresa}`}
          width={50}
          height={50}
          alt='logo de empresa'
        />
      </div>
      <SocketComponent data={data} />
    </>
  )
}
