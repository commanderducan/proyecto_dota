function ficheroAUrlCodificada(fichero, manejador) {

    var lectorDeArchivo = new FileReader();

    lectorDeArchivo.readAsDataURL(fichero);

    lectorDeArchivo.onload = function (evento) {
      manejador({
        ok: true,
        datos: evento.target.result})
    };

    lectorDeArchivo.onerror = function (error) {
      manejador({
        ok: false,
        datos: null
      })
    };

}

export {
    ficheroAUrlCodificada
}