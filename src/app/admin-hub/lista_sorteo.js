'use client'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';

export default function ListaSorteo({ data }) {
  const router = useRouter()
  const header = <div className='flex justify-between h-4'>
    <label className='font-bold'>Lista de Sorteos</label>
    <Button icon='pi pi-plus' className='p-button p-button-success p-button-text' tooltip='Crear Sorteo' onClick={(e) => router.push('/admin-hub/sorteoscrear')}/>
  </div>

  return <div className='mb-4 mx-96 my-52'>
    <DataTable value={data} rows={5} emptyMessage={'Usted no ha creado sorteos aun'} header={header}>
      <Column field='nombre' header='Nombre' />
      <Column field='descripcion' header='Descripcion' />
      <Column field='fecha_sorteo' header='Fecha' />
      <Column field='img' header='Img' />
    </DataTable>
  </div>
}