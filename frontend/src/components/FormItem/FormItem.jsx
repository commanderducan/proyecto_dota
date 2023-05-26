import { useState, useEffect } from "react";
import style from "./style.module.css"
import { ficheroAUrlCodificada } from "../../lib/ficheros.mjs";

function FormItem() {
        const [nombre, setNombre] = useState("")
        const [precio, setPrecio] = useState(0)
        const [valorReceta, setReceta] = useState(0)
        const [imagen, setImagen] = useState("")
        const [ size, setSize ] = useState(0)
        const [ mimeType, setMimeType ] = useState("")
        const [ imagenCodificada, setImagenCodificada] = useState("")

    function manejadorInputNombre (evento) {
        const nuevoNombre = evento.target.value
        setNombre(nuevoNombre)
    }

    function manejadorInputPrecio (evento) {
        const nuevoPrecio = evento.target.value
        setPrecio(nuevoPrecio)
    }

    function manejadorInputReceta (evento) {
        const nuevaReceta = evento.target.value
        setReceta(nuevaReceta)
    }

    function manejadorEnviar() {
        const datos = {
            name: nombre,
            price: precio,
            recipe: valorReceta,
            file: {
                mimeType,
                size,
                imagenCodificada
            }
        }
        const datosJson = JSON.stringify(datos)
        // Envia los datos del nuevo Item y la informacion sobre fichero de su imagen
        fetch("http://localhost:8000/items/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: datosJson
        }).then(
            response => { if ( ! response.ok )  alert("No se ha podido guardar el Item") }
        ).catch(
            exception => alert(exception)
        )
    }

    function manejadorImagenCodificada(objetoRespuesta) {
        if (objetoRespuesta.ok) setImagenCodificada(objetoRespuesta.datos)
        else alert("No se ha podido codificar la imagen para enviarla.")
    }

    function manejadorFichero(evento) {
        const inputFicheros = evento.target
        const fichero = inputFicheros.files[0]
        const ficheroCodificado = URL.createObjectURL(fichero)
        setImagen(ficheroCodificado)
        setSize(fichero.size)
        setMimeType(fichero.type)
        ficheroAUrlCodificada(fichero, manejadorImagenCodificada)
    }

    return(
        <>
            <label className={style.label}>
                {/*_("Nombre:")*/}
                Nombre:
                <input onInput={manejadorInputNombre} value={nombre} type="text"/>
            </label>
            <label className={style.label}>
                Precio:
                <input onInput={manejadorInputPrecio} value={precio} type="number"/>
            </label>
            <label className={style.label}>
                Receta:
                <input onInput={manejadorInputReceta} value={valorReceta} type="number"/>
            </label>
            <label className={style.label}>
                Imagen:
                <input type="file" onChange={manejadorFichero}/>
                <img src={imagen} alt="Imagen seleccionada"/>
            </label>
            <label className={style.label}>        
                <input type="submit" value="enviar" onClick={manejadorEnviar}></input>
            </label>    
        </>
    )   
}

export default FormItem