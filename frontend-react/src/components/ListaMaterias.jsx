import { useEffect, useState } from "react"
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
const API_MATERIAS = "http://localhost:3000/materias"

export function ListaMaterias({ actualizar, onMateriaCreada, onEditarMateria }) {
    const [materias, setMaterias] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")
    const [errorEliminar, setErrorEliminar] = useState("")

    async function eliminarMateria(codigo){
        const confirmar = window.confirm("¿Seguro que querés eliminar esta materia?")
        if (!confirmar) {
            return
        }
        setErrorEliminar("")
        try {
            const respuesta = await fetch(`${API_MATERIAS}/${encodeURIComponent(codigo)}`,
                { method: "DELETE" }
            )
            if (!respuesta.ok) {
                const datos = await respuesta.json().catch(() => ({}))
                throw new Error(datos.mensaje || "No se pudo eliminar la materia")
            }
            onMateriaCreada()
        } catch (error) {
            console.error("Error al eliminar: ", error)
            setErrorEliminar(error instanceof TypeError
                ? "No se pudo conectar con el servidor"
                : error.message)
        }
    }
    useEffect(() => {
        async function cargarMaterias(){
            setCargando(true)
            setError("")

            try {
            const respuesta = await fetch(API_MATERIAS)

            if (!respuesta.ok){
                throw new Error("No se pudo obtener la lista")
            }

            const datos = await respuesta.json()
            setMaterias(datos)
        } catch(error) {
            console.error("Error de conexión", error)
            setError("No se pudo cargar la lista de materias.")
        } finally {
            setCargando(false)
        }
    }
        cargarMaterias()
    }, [actualizar])

    if (cargando) {
        return (
            <Paper component="section" elevation={0} sx={{ p: 3, border: 1, borderColor: "divider", borderRadius: 4 }}>
                <Typography color="text.secondary">Cargando materias...</Typography>
            </Paper>
        )
    }
    if (error) {
        return <Alert severity="error" role="alert">{error}</Alert>
    }
    return (
        <Paper
            component="section"
            elevation={0}
            sx={{
                p: { xs: 2.5, sm: 3.5 },
                border: 1,
                borderColor: "divider",
                borderRadius: 4,
                bgcolor: "background.paper"
            }}
        >
            <Typography component="h2" variant="h5" sx={{ mb: 2.5, fontWeight: 700 }}>
                Materias
            </Typography>
            {errorEliminar && (
                <Alert
                    severity="error"
                    role="alert"
                    onClose={() => setErrorEliminar("")}
                    sx={{ mb: 2 }}
                >
                    {errorEliminar}
                </Alert>
            )}
            {materias.length === 0
                ? (
                    <Typography color="text.secondary">
                        No hay materias registradas.
                    </Typography>
                )
                : (
                    <Stack
                        component="ul"
                        spacing={1.5}
                        sx={{ listStyle: "none", p: 0, m: 0 }}
                    >
                        {materias.map(materia => (
                            <Paper
                                component="li"
                                key={materia.codigo}
                                elevation={0}
                                sx={{
                                    p: { xs: 2, sm: 2.5 },
                                    border: 1,
                                    borderColor: "divider",
                                    borderRadius: 3,
                                    display: "flex",
                                    alignItems: { xs: "stretch", sm: "center" },
                                    justifyContent: "space-between",
                                    flexDirection: { xs: "column", sm: "row" },
                                    gap: 2
                                }}
                            >
                                <Stack
                                    direction="row"
                                    spacing={1.5}
                                    sx={{ alignItems: "center", flexWrap: "wrap" }}
                                >
                                    <Chip label={`Código ${materia.codigo}`} color="primary" variant="outlined" size="small" />
                                    <Box>
                                        <Typography fontWeight={600}>{materia.nombre}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {materia.descripcion || "Sin descripción"} - Carga horaria: {materia.cargaHoraria}hs - Estado: {materia.estado}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
                                    <Button
                                        type="button"
                                        onClick={() => onEditarMateria(materia)}
                                        variant="outlined"
                                        size="small"
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => eliminarMateria(materia.codigo)}
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                    >
                                        Eliminar
                                    </Button>
                                </Stack>
                            </Paper>
                        ))}
                    </Stack>
                )}
        </Paper>
    )
}