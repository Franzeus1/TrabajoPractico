import { useState } from "react";
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

const API_MATERIAS = "http://localhost:3000/materias"

function FormularioM({ onMateriaCreada, materiaEditar, onCancelar }){
    const [formulario, setFormulario] = useState({
        codigo: String(materiaEditar?.codigo ?? ""),
        nombre: materiaEditar?.nombre ?? "",
        cargaHoraria: materiaEditar?.cargaHoraria ?? "",
        estado: materiaEditar?.estado ?? "activa",
        descripcion: materiaEditar?.descripcion ?? ""
    })
    const [error, setError] = useState("")
    const [exito, setExito] = useState("")
    const [guardando, setGuardando] = useState(false)

    function manejarCambio(e) {
        const { name, value} = e.target

        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    async function guardar(e) {
        e.preventDefault()
        setError("")
        setExito("")

        const codigo = formulario.codigo.trim()
        const nombre = formulario.nombre.trim()
        const descripcion = formulario.descripcion.trim()
        const cargaHoraria = Number(formulario.cargaHoraria)

        if (!codigo || !nombre) {
            setError("El código y el nombre no pueden estar vacíos")
            return
        }
        if (formulario.descripcion !== "" && !descripcion) {
            setError("La descripción no puede contener solo espacios")
            return
        }
        if (formulario.cargaHoraria === "" || !Number.isInteger(cargaHoraria) || cargaHoraria <= 0) {
            setError("La carga horaria debe ser un número entero mayor a cero")
            return
        }

        setGuardando(true)

        const materia = {
            codigo,
            nombre,
            descripcion,
            cargaHoraria,
            estado: formulario.estado
        }
        const editando = Boolean(materiaEditar)
        const url = editando
                    ? `${API_MATERIAS}/${encodeURIComponent(materiaEditar.codigo)}`
                    : API_MATERIAS
        try {
            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(materia)
            })

            if (!respuesta.ok) {
                const datos = await respuesta.json().catch(() => ({}))
                throw new Error(datos.mensaje || `No se pudo ${editando ? "editar" : "crear"} la materia. Estado HTTP: ${respuesta.status}`)
            }

            setFormulario({
                codigo: "",
                nombre: "",
                cargaHoraria: "",
                descripcion: "",
                estado: "activa"
            })
            setExito(editando ? "Materia modificada correctamente" : "Materia creada correctamente")
            onMateriaCreada()
        } catch (error) {
            console.error("Error al guardar:", error)
            setError(error instanceof TypeError
                ? "No se pudo conectar con el servidor"
                : error.message)
        } finally {
            setGuardando(false)
        }
    }
    function cancelar(){
        onCancelar()
    }
    return(
        <Paper
            component="section"
            elevation={0}
            sx={{
                p: { xs: 2.5, sm: 3.5 },
                mb: 3,
                border: 1,
                borderColor: "divider",
                borderRadius: 4,
                bgcolor: "background.paper"
            }}
        >
            <Typography component="h2" variant="h5" sx={{ mb: 2.5, fontWeight: 700 }}>
                {materiaEditar ? "Editar materia" : "Nueva Materia"}
            </Typography>
            <Box
                component="form"
                onSubmit={guardar}
                noValidate
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
                    gap: 2
                }}
            >
                <TextField
                    id="codigo"
                    name="codigo"
                    label="Código"
                    value={formulario.codigo}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />
                <TextField
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />
                <TextField
                    id="cargaHoraria"
                    name="cargaHoraria"
                    label="Carga Horaria"
                    type="number"
                    inputProps={{ min: 1, step: 1 }}
                    value={formulario.cargaHoraria}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />

                <TextField
                    id="descripcion"
                    name="descripcion"
                    label="Descripción"
                    value={formulario.descripcion}
                    onChange={manejarCambio}
                    multiline
                    fullWidth
                />

               <TextField
                    select
                    id="estado"
                    name="estado"
                    label="Estado"
                    value={formulario.estado}
                    onChange={manejarCambio}
                    required
                    fullWidth
                >
                    <MenuItem value="activa">Activa</MenuItem>
                    <MenuItem value="inactiva">Inactiva</MenuItem>
                </TextField>
                <Box
                    sx={{
                        gridColumn: "1 / -1",
                        display: "flex",
                        justifyContent: "flex-end",
                        flexWrap: "wrap",
                        gap: 1.5,
                        mt: 1
                    }}
                >
                    <Button type="submit" variant="contained" disabled={guardando}>
                        {guardando
                            ? "Guardando..."
                            : materiaEditar
                                ? "Guardar cambios"
                                : "Guardar"}
                    </Button>
                    {materiaEditar && (
                        <Button
                            type="button"
                            onClick={cancelar}
                            disabled={guardando}
                            variant="outlined"
                        >
                            Cancelar
                        </Button>
                    )}
                </Box>
                {error && (
                    <Alert severity="error" role="alert" sx={{ gridColumn: "1 / -1" }}>
                        {error}
                    </Alert>
                )}
                {exito && (
                    <Alert severity="success" sx={{ gridColumn: "1 / -1" }}>
                        {exito}
                    </Alert>
                )}
            </Box>
        </Paper>
    )
}
export default FormularioM