function Item({item}) {
    return(
        <>
        <p>{item.name}</p>
        <img src={item.File.imagenCodificada} alt={item.name}/>
        </>
 
    )
}

export default Item