import { useState, useEffect } from "react";

const ControlPresupuesto = ({gastos, presupuesto}) => {

  const[disponible, setDisponible] = useState(0)
  const[gastado, setGastado] = useState(0)



  useEffect( () => {

    const totalGastos = gastos.reduce( (total, gastos) => gastos.cantidad + total, 0)

      console.log(totalGastos)

      setGastado(totalGastos)
      setDisponible(presupuesto - gastado)

  }, [gastos])

    const formatearCantidad = (cantidad) => {
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          });
        return formatter.format(cantidad)
    }
   
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>

        <h2>Grafica</h2>
      </div>

      <div className='contenido-presupuesto'> 

        <p>Presupuesto: <span> {formatearCantidad(presupuesto)}</span></p>


        <p>Disponible: <span> {disponible}</span></p>


        <p>Gastado: <span> {gastado}</span></p>

      </div>
    </div>
  )
}

export default ControlPresupuesto
