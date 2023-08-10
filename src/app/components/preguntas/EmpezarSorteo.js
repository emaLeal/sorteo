import { Button } from 'primereact/button'
import React from 'react'

const EmpezarSorteo = ({ setPagina, users, finalizarSorteo }) => {
  return (
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
  )
}

export default EmpezarSorteo
