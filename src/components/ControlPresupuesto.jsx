import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({gastos, presupuesto}) => {


  const[porcentaje, setPorcentaje] = useState("");
  const[disponible, setDisponible] = useState(0)
  const[gastado, setGastado] = useState(0)



  useEffect( () => {

    const totalGastos = gastos.reduce( (total, gastos) => gastos.cantidad + total, 0)

     

      setGastado(totalGastos)
      setDisponible(presupuesto - totalGastos)

      const calcularPorcentajeGastado = ((totalGastos * 100) / presupuesto).toFixed(2);


      setTimeout(() => {
        setPorcentaje(calcularPorcentajeGastado);
      }, 1000)


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

        <CircularProgressbar
          styles={buildStyles({
              pathColor: '#3b82f6',
              trailColor: '#F5F5F5',
              textColor: '#3b82f6',


          })}
          value={porcentaje}
          text={`${porcentaje} % Gastado`}
        />
      </div>

      <div className='contenido-presupuesto'> 

        <p>Presupuesto: <span> {formatearCantidad(presupuesto)}</span></p>


        <p>Disponible: <span> {formatearCantidad(disponible)}</span></p>


        <p>Gastado: <span> {formatearCantidad(gastado)}</span></p>

      </div>
    </div>
  )
}

export default ControlPresupuesto
