import placeholder from "../../resources/logo.jpg"
import style from "./MiniItem.module.css"

function MiniItem({item}) {
    return(
        <>
        <img className={style.miniatura} src={ item ? item?.File.imagenCodificada : placeholder } alt={ item ? item?.name : "Empty slot" }/>
        </> 
 
    )
}

export default MiniItem