import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Paper from "@mui/material/Paper"

export function FAQ() {
  const id = React.useId();
  return (
    <div>
    <Paper elevation={2}
    sx={{
        p: 3, 
        border: 2, 
        borderColor: "divider", 
        borderRadius: 3,
    }}
    >
        <Typography variant="h5" xs={{mb: 1}}>
            Preguntas Frecuentes
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
            Ayuda para utilizar el Sistema de Gestión Académica
        </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls={`${id}-panel1-content`}
          id={`${id}-panel1-header`}
        >
          <Typography component="span">
            ¿Cómo se registra un alumno?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Desde el formulario de Alumnos, 
            completá el legajo, nombre, carrera y 
            correo electrónico. Luego seleccioná Guardar.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls={`${id}-panel2-content`}
          id={`${id}-panel2-header`}
        >
          <Typography component="span">¿Cómo puedo modificar los datos de un alumno?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Buscá al alumno en el listado y 
            seleccioná Editar. 
            El formulario se completará con sus datos
            para que puedas modificarlos.
          </Typography>
        </AccordionDetails>
      </Accordion>
       <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls={`${id}-panel2-content`}
          id={`${id}-panel2-header`}
        >
          <Typography component="span">¿Puedo eliminar un alumno?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Si. Desde el listado, 
            seleccioná Eliminar. 
            Antes de confirmar, 
            verificá que estés trabajando 
            con el alumno correcto.
          </Typography>
        </AccordionDetails>
      </Accordion>
      </Paper>
    </div>
  );
}
