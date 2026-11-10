import { ListaMaterias } from "../components/ListaMaterias"
import { useState } from "react"
import FormularioM from "../components/FormularioM"

export default function Materias() {
const [actualizar, setActualizar] = useState(0)
const [materiaEditar, setMateriaEditar] = useState(null)

function materiaCreada() {
  setActualizar(valor => valor + 1)
  setMateriaEditar(null)
}

function seleccionarMateria(materia) {
  setMateriaEditar(materia)
}

return (
   <>
   <FormularioM key={materiaEditar?.codigo ?? "nuevo"}
   onMateriaCreada={materiaCreada}
   materiaEditar={materiaEditar}
   onCancelar={() => setMateriaEditar(null)}
   />
   <ListaMaterias 
   actualizar={actualizar} 
   onMateriaCreada={materiaCreada}
   onEditarMateria={seleccionarMateria} 
   /> 
  </>
  )
}