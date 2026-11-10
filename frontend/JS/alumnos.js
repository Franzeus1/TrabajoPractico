const formulario = document.querySelector("#formulario")
// const mensaje = document.querySelector("#mensaje")
const listaAlumnos = document.querySelector("#listaAlumnos")
let alumnoEditandoLegajo = null 
let alumnoEditar = null 
const btnCancelar = document.querySelector("#btnCancelar")
btnCancelar.style.display = "none" 
const btnGuardar = document.querySelector("#btnGuardar")
const API_ALUMNOS = "http://localhost:3000/alumnos" 

formulario.addEventListener("submit", async function (event) { 
    event.preventDefault();

    // Cargamos los valores de los campos del formulario
    const legajo = document.querySelector("#legajo").value.trim()
    const nombre = document.querySelector("#nombre").value.trim()
    const carrera = document.querySelector("#carrera").value.trim()
    const correo = document.querySelector("#correo").value.trim()

    // validaciones de los campos del formulario
    if (legajo === "" || nombre === "" || carrera === "" || correo === "") {
        mostrarMensaje("Todos los campos son obligatorios", "mje-error")
        return
    }

    if (!correo.includes("@")) {
        mostrarMensaje("Ingrese un correo electrónico válido", "mje-error")
        return
    }

    if (nombre.length < 3) {
        mostrarMensaje("El nombre debe tener al menos 3 caracteres", "mje-error")
        return
    }
try {
    // Si alumnoEditandoLegajo es null, significa que estamos creando un nuevo alumno, por lo que hacemos un POST.
    if (alumnoEditandoLegajo === null) {
        const alumno = { 
            legajo: Number(legajo),
            nombre: nombre,
            carrera: carrera,
            correo: correo
        }
        const respuesta = await fetch(API_ALUMNOS, { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(alumno) 
        })
        if (!respuesta.ok) { 
           throw new Error("La API respondió con un error.")
        }
        mostrarMensaje("Alumno guardado correctamente", "mje-exito")
    } else { 
        const datosActuales = { 
            nombre: nombre,
            carrera: carrera,
            correo: correo
        }
        if (JSON.stringify(datosActuales) === JSON.stringify(alumnoEditar)){ 
            mostrarMensaje("No se realizaron cambios", "mje-adv")
            return
        }
        const respuesta = await fetch(`${API_ALUMNOS}/${alumnoEditandoLegajo}`, { 
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre, 
                carrera: carrera,
                correo: correo
            })
        })
        if (!respuesta.ok) {
            throw new Error("La API respondió con un error")
        }
        alumnoEditandoLegajo = null 
        alumnoEditar = null 
        btnGuardar.textContent = "Guardar Alumno" 
        document.querySelector("#legajo").disabled = false 
        
        mostrarMensaje("Alumno actualizado correctamente", "mje-exito")
    }
    await actualizarListaAlumnos() 
    formulario.reset()
} catch (error){
    console.error(error.message)
    mostrarMensaje("No fue posible realizar la operación", "mje-error")
}
});


async function obtenerAlumnos() { 
    try{
    const respuesta = await fetch(API_ALUMNOS)  
    const alumnos = await respuesta.json() 
    return alumnos
    } catch (error) {
        console.error(error.message)
        throw error
    }
}

function mostrarAlumnos(alumnos) {
    listaAlumnos.innerHTML = ""
    for (const alumno of alumnos) {
        listaAlumnos.innerHTML += `
        <tr>
            <td>${alumno.legajo}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.carrera}</td>
            <td>${alumno.correo}</td>
            <td>
                <button 
                class="btn-editar" 
                data-legajo="${alumno.legajo}" // Agregamos un atributo data-legajo al botón de editar para poder identificar qué alumno se está editando
                title="Editar alumno">
                <i class="fa-solid fa-pen"></i>
                </button>
                <button 
                class="btn-eliminar" 
                data-legajo="${alumno.legajo}"
                title="Eliminar alumno">
                <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    }
}

 async function eliminarAlumno(legajo) { 
    const respuesta = await fetch(`${API_ALUMNOS}/${legajo}`, { 
        method: "DELETE"
    })    
    if (!respuesta.ok) {
        mostrarMensaje("No se pudo eliminar el alumno", "mje-error")
        return
    }
    
    if (alumnoEditandoLegajo === legajo){ 
        formulario.reset()
        alumnoEditar = null
        alumnoEditandoLegajo = null
        btnGuardar.textContent = "Guardar alumno"
        document.querySelector("#legajo").disabled = false
        btnCancelar.style.display = "none"
    }
    mostrarMensaje("Alumno eliminado correctamente", "mje-exito")
    await actualizarListaAlumnos()
}

async function actualizarListaAlumnos() { 
    try {
    const alumnos = await obtenerAlumnos()
    mostrarAlumnos(alumnos)
    } catch (error) {
        mostrarMensaje("No se pudo cargar la lista de alumnos", "mje-error")
    }
}

listaAlumnos.addEventListener("click", (e) => { 
    const boton_el = e.target.closest(".btn-eliminar") 
    if (boton_el) { 
        const legajo = Number(boton_el.dataset.legajo)
        const confirmar = confirm("¿Está seguro de eliminar este alumno?")
        if (confirmar) {
        eliminarAlumno(legajo)
        }
    }
    const boton_ed = e.target.closest(".btn-editar") 
    if (boton_ed) { 
        const legajo = Number(boton_ed.dataset.legajo)
        editarAlumno(legajo)
    }
})

async function editarAlumno(legajo) { 
    const alumnos = await obtenerAlumnos()
    const alumno = alumnos.find(alumno => alumno.legajo === legajo) 

    if (!alumno) { 
        mostrarMensaje("Alumno no encontrado", "mje-error")
        return
    }
    document.querySelector("#legajo").value = alumno.legajo; 
    document.querySelector("#legajo").disabled = true; 
    document.querySelector("#nombre").value = alumno.nombre;
    document.querySelector("#carrera").value = alumno.carrera;
    document.querySelector("#correo").value = alumno.correo;

    alumnoEditar = { 
        nombre: alumno.nombre,
        carrera: alumno.carrera,
        correo: alumno.correo
    }

    alumnoEditandoLegajo = alumno.legajo; 
    btnCancelar.style.display ="inline-block" 
    btnGuardar.textContent = "Actualizar Alumno" 
    document.querySelector("#nombre").focus() 
}

function cancelarEdicion(){ 
    formulario.reset()
    alumnoEditandoLegajo = null
    alumnoEditar = null
    btnGuardar.textContent = "Guardar Alumno"
    document.querySelector("#legajo").disabled = false
    btnCancelar.style.display = "none" 
    document.querySelector("#legajo").focus() 
}

btnCancelar.addEventListener("click", cancelarEdicion) 

async function iniciar(){ 
    await actualizarListaAlumnos()
}

iniciar() 