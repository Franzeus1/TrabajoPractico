import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

function EjemploMUI() {
return (
    <>
     <Stack spacing={1} direction="row">
      <Button variant="contained">Aceptar</Button>
      <Button variant="contained">Guardar</Button>
      <Button variant="outlined">Cancelar</Button>
    </Stack>
    <Stack direction="row" spacing={2} sx={{
        mt:2, mx: 3
    }}>
      <Button variant="contained" startIcon={<DeleteIcon /> } color="error">
        Borrar
      </Button>
      <Button variant="contained" endIcon={<SendIcon />} 
      sx={{
        bgcolor: "#4fb6dc",
        color: "#251b1b",
        "&:hover": {bgcolor: "#96b0b4"}
      }}
      >
        Enviar
      </Button>
    </Stack>
    </>
)
}

export default EjemploMUI