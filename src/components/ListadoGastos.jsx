import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({gastos, setGastoEditar, setGastoEliminar, filtro, gastosFiltrados}) => {

  return (
    <div className='listado-gastos contenedor'>
      <h2>{gastosFiltrados.length > 0 ? `Gastos: ${filtro}` : filtro != '' && gastosFiltrados.length == 0 ? "No hay gastos de esta categoría" : gastos ? `Gastos` : "Los gastos se mostrarán aquí"}</h2>


    {filtro ? 
    
    gastosFiltrados.map(gasto => 
      
      <Gasto
           key = {gasto.id}
           gasto = {gasto}
           setGastoEditar = {setGastoEditar}
           setGastoEliminar = {setGastoEliminar}
      
      
      />
    )

      :


      gastos && gastos.map(gasto => 
      
        <Gasto
             key = {gasto.id}
             gasto = {gasto}
             setGastoEditar = {setGastoEditar}
             setGastoEliminar = {setGastoEliminar}
        
        
        />
 
 
 
 
     )
  
  
  }


   
    
    </div>
  )
}

export default ListadoGastos
