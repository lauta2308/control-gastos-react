import { useState } from 'react'
import Header from './components/Header'
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';
import { generarId } from './helpers';

import IconoNuevoGasto from './img/nuevo-gasto.svg'






function App() {

  const[presupuesto,setPresupuesto] = useState(0);
  const[isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const[modal, setModal] = useState(false)
  const[alternarModal, setAlternarModal] = useState(false)
  const[gastos, setGastos] = useState([]);
  

  const handleModal = (() => {

    setModal(true)

    setTimeout(() => {
      setAlternarModal(true)
  }, 500)


  })


  const nuevoGasto = gasto => {
    gasto.id = generarId();
    gasto.fecha = Date.now();

    setGastos([...gastos, gasto])
  }


  return (
    <div className={modal && 'fijar'}>
    

    <Header
    gastos = {gastos}
    presupuesto = {presupuesto}
    setPresupuesto = {setPresupuesto}
    isValidPresupuesto = {isValidPresupuesto}
    setIsValidPresupuesto = {setIsValidPresupuesto}
    
    
    />


    {isValidPresupuesto && (
    
    <div className='nuevo-gasto'>
      <img src={IconoNuevoGasto} alt="icono-nuevo-gasto"
        onClick={handleModal}
      
      
      
      />

    </div>
    
  )
    }  


    {modal && <Modal 
    
      setModal= {setModal}
      alternarModal = {alternarModal}
      setAlternarModal = {setAlternarModal}
      nuevoGasto = {nuevoGasto}
    />}


    
    {gastos && 
      <ListadoGastos
        gastos= {gastos}
      
      />    
    
    }
     
    </div>
  )
}

export default App
