'use client'
import { PanelMenu } from 'primereact/panelmenu'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import Image from 'next/image'
import SorteoDialog from './SorteoDialog'
import { fetcher } from '@/app/lib/fetcher'
import Link from 'next/link'

const MenuSorteo = ({ id }) => {
  const { data, error, mutate, isLoading } = useSWR(
    `/api/sorteos/${id}`,
    fetcher
  )
  const [visible, setVisible] = useState(false)
  const [items, setItems] = useState([])
  const [datosSorteo, setDatosSorteo] = useState({})
  useEffect(() => {
    const interval = setInterval(() => {
      mutate()
    }, 1000)

    return () => clearInterval(interval)
  }, [mutate])

  const onHide = () => setVisible(!visible)

  useEffect(() => {
    const templateNoJugado = sorteo => {
      return (
        <>
          <div className='my-2 h-52 overflow-y-auto'>
            <label>Premio del Sorteo: {sorteo.premio}</label>
            <div className='flex justify-center my-2'>
              <Image
                src={`/api/foto${sorteo.premio_foto}`}
                alt={sorteo.nombre}
                width={150}
                height={150}
              />
            </div>
            <div>
              <Button
                onClick={() => {
                  setVisible(true)
                  setDatosSorteo(sorteo)
                }}
                label='Jugar Sorteo'
                className='p-button p-button-primary p-button-rounded w-full mb-2'
              />
              {sorteo.pregunta && (
                <Link href={`/sorteopregunta/${sorteo.id}`}>
                  <Button
                    label='Jugar con Pregunta'
                    className='p-button p-button-primary p-button-rounded w-full'
                  />
                </Link>
              )}
            </div>
          </div>
        </>
      )
    }

    const templateJugado = sorteo => {
      return (
        <>
          <div className='my-2'>
            <label>Premio del Sorteo: {sorteo.premio}</label>
            <div className='flex justify-center my-2'>
              <Image
                src={`/api/foto${sorteo.premio_foto}`}
                alt={sorteo.nombre}
                width={150}
                height={150}
              />
            </div>
          </div>
          <div>
            <label className='font-bold'>
              Ganador del Sorteo: {sorteo.nombre_ganador}
            </label>
          </div>
        </>
      )
    }

    if (data !== undefined) {
      const sortItems = []

      data.data.map(sorteo => {
        const sorteoItem = {
          label: (
            <div className='flex justify-between '>
              <Checkbox checked={sorteo.jugado === 1} disabled />
              <span className='ml-4'>{sorteo.nombre}</span>
            </div>
          ),
          items: [
            {
              label: 'Opciones',
              template: () =>
                sorteo.jugado === 0
                  ? templateNoJugado(sorteo)
                  : templateJugado(sorteo)
            }
          ]
        }
        sortItems.push(sorteoItem)
      })
      setItems(sortItems)
    }
  }, [data])

  if (isLoading) {
    return <ClipLoader color='#fff' loading={isLoading} size={200} />
  }

  return (
    <>
      <SorteoDialog
        visible={visible}
        onHide={onHide}
        id={id}
        datosSorteo={datosSorteo}
      />
      <div className='card flex justify-content-center my-2 overflow-y-auto'>
        <PanelMenu model={items} className='w-full md:w-25rem' />
      </div>
    </>
  )
}

export default MenuSorteo
