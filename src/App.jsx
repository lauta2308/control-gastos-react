import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal';
import Filtros from './components/Filtros'
import ListadoGastos from './components/ListadoGastos';
import { generarId } from './helpers';

import IconoNuevoGasto from './img/nuevo-gasto.svg'






function App() {

  
  const[presupuesto,setPresupuesto] = useState(localStorage.getItem('presupuesto') ? JSON.parse(localStorage.getItem('presupuesto')) : "");
  const[isValidPresupuesto, setIsValidPresupuesto] = useState(presupuesto ? true : false)
  const[modal, setModal] = useState(false)
  const[alternarModal, setAlternarModal] = useState(false)
  const[gastos, setGastos] = useState(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : [{}]);
  
  const[gastoEditar, setGastoEditar] = useState({});

  const[gastoEliminar, setGastoEliminar] = useState({});

  const[filtro, setFiltro] = useState("");
  const[gastosFiltrados, setGastosFiltrados] = useState([]);





  const handleModal = (() => {

    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAlternarModal(true)
  }, 500)


  })

  useEffect(() => {
    if(filtro.length > 0){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  useEffect( () => {

    if(Object.keys(gastoEditar).length > 0){

      setModal(true)
 
  
      setTimeout(() => {
        setAlternarModal(true)
    }, 500)
    }


  }, [gastoEditar])


  useEffect( () => {

    if(Object.keys(gastoEliminar).length > 0){

      const gastosActualizados = gastos.filter(gasto => gasto.id !== gastoEliminar.id)
  
      setGastos(gastosActualizados);
    }


  }, [gastoEliminar])



  const nuevoGasto = gasto => {

    if(gasto.id){


      const gastosActualizados = gastos.map(gastoState => 
    
        gastoState.id === gasto.id ? gasto : gastoState
      )


      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
  
      setGastos([...gastos, gasto])

    }
  
  }


  useEffect(() => {
      localStorage.setItem('gastos', JSON.stringify(gastos))

  }, [gastos])




  return (
    <div className={modal ? 'fijar' : ''}>
    

    <Header
    setGastos = {setGastos}
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
      gastoEditar = {gastoEditar}
      setGastoEditar = {setGastoEditar}

    />}


    <main>

    <Filtros 
    
      filtro = {filtro}
      setFiltro = {setFiltro}
    />



    {gastos && 
      <ListadoGastos
        gastos= {gastos}
        setGastoEditar = {setGastoEditar}
        setGastoEliminar = {setGastoEliminar}
        filtro = {filtro}
        gastosFiltrados = {gastosFiltrados}
      
      />    
    
    }
    </main>
   
     
    </div>
  )
}

export default App
