
import { useState, useEffect } from 'react'
import Mensaje from './Mensaje';
import CerrarModal from '../img/cerrar.svg'

const Modal = ({setModal, alternarModal, setAlternarModal, nuevoGasto, gastoEditar, setGastoEditar}) => {

    const [mensaje, setMensaje] = useState("");

    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [categoria, setCategoria] = useState("");
    const [id, setId] = useState("");
    const [fecha, setFecha] = useState("");

    const handleModal = () => {
        setModal(false)

        setGastoEditar({})

        setTimeout(() => {
            setAlternarModal(false)
        }, 500)
    

        
    }

    useEffect(() => {
            if(Object.keys(gastoEditar).length > 0){
                setNombre(gastoEditar.nombre)
                setCantidad(gastoEditar.cantidad)
                setCategoria(gastoEditar.categoria)
                setId(gastoEditar.id),
                setFecha(gastoEditar.fecha)
               
            }
    }, [])

    const handleSubmit = e => {

        e.preventDefault();

        if([nombre, cantidad, categoria].includes("")){
            setMensaje("Hay campos vacíos")


            setTimeout((e) => {
                setMensaje("");
            }, 3000)

            return
        } 

        nuevoGasto(
            {

                "nombre": nombre,
                "cantidad": cantidad,
                "categoria": categoria, 
                "id": id,
                "fecha": fecha       
            
            }
       );

       handleModal()
    }


  return (
    <div className='modal'>

        <div className="cerrar-modal">
            <img src={CerrarModal} alt="cerrar modal" onClick={handleModal}/>
        </div>

        <form onSubmit={handleSubmit} className={`formulario ${alternarModal ? 'animar' : 'cerrar'} `}>

            <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Añadir Gasto'}</legend>

            {mensaje && <Mensaje
                mensaje = {mensaje}
                tipo= "error"
            >{mensaje}</Mensaje>}

            <div className="campo">
            <label htmlFor="nombre-gasto">Nombre 
            
          
            
            </label>

            <input type="text" id="nombre-gasto" placeholder="Añade un nombre del gasto" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            
            />
            </div>
      

            <div className="campo">
            <label htmlFor="cantidad">Cantidad
                        
                 
                        
                        </label>

                        <input type="number" id="cantidad" placeholder="Cantidad"
                        value={cantidad}
                        onChange={(e) => setCantidad(Number(e.target.value))}
                        
                        />

            </div>


            <div className="campo">
            <label htmlFor="categoria">Categoría
                     
                       
                        
                        </label>

                        <select name="" id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                                <option value="">Seleccione</option>
                                <option value="ahorro">Ahorro</option>
                                <option value="comida">Comida</option>
                                <option value="varios">Varios</option>
                                <option value="ocio">Ocio</option>
                                <option value="salud">Salud</option>
                                <option value="suscripciones">Suscripciones</option>


                        </select>
            </div>

            <input type="submit" value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'} />
         
        </form>
      
    </div>
  )
}

export default Modal
