import Box from "@mui/material/Box"
import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function LayoutPpal() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                bgcolor: "background.default",
                color: "text.primary"
            }}
        >
            <Header />
            <Box
                component="main"
                sx={{
                    width: "100%",
                    maxWidth: 1120,
                    mx: "auto",
                    px: { xs: 2, sm: 3, md: 4 },
                    py: { xs: 4, md: 6 },
                    flex: 1
                }}
            >
                <Outlet />
            </Box>
            <Footer />
        </Box>
    )
}