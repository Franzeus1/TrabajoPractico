import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

export default function Footer(){
    return (
        <Box
            component="footer"
            sx={{
                py: 2.5,
                borderTop: 1,
                borderColor: "divider",
                bgcolor: "background.paper"
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 1
                }}
            >
                <Typography variant="body2" fontWeight={600}>
                    Sistema de Gestión Académica
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    SGA: Proyecto Programación IV
                </Typography>
            </Container>
        </Box>
    )
}
