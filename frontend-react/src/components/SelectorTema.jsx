import Box from "@mui/material/Box"
import { useColorScheme } from "@mui/material/styles" // Hook para obtener y cambiar el modo de color (claro/oscuro)
import MaterialUISwitch from "./MaterialUISwitch"

function SelectorTema() {
    const {mode, setMode} = useColorScheme() // Hook que proporciona el modo de color actual y una función para cambiarlo

    if (!mode) {
        return null  // Si no se puede obtener el modo actual, no renderizar nada
    }
    const modoOscuro = mode === "dark" // true si el modo actual es oscuro, false si es claro

    function cambiarModo(event) {
        setMode(event.target.checked ? "dark" : "light") // Cambia el modo de color según el estado del switch
    }
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0
        }}>
            <MaterialUISwitch
            checked={modoOscuro}  // El switch está activado si el modo actual es oscuro
            onChange={cambiarModo}
            slotProps={{
                input: {
                    "aria-label": "Cambiar entre modo claro y oscuro",
                },
            }} />
        </Box>
    )
}
export default SelectorTema
