function guardarDatos(clave, datos){
    localStorage.setItem(clave, JSON.stringify(datos))
}

function obtenerDatos(clave) {
    const datos = localStorage.getItem(clave)
    if (datos) {
        return JSON.parse(datos)
    }
    return []
}