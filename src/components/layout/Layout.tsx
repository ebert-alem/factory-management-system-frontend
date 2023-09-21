import { Outlet } from "react-router-dom"
import { Menu } from "../menu/Menu"
import { Navbar } from "../navbar/Navbar"
import { Footer } from "../footer/Footer"
import { Box, Stack, ThemeProvider, createTheme } from "@mui/material"
import { NavbarMaterial } from "./navbar/NavbarMaterial"
import { MenuMaterial } from "./menu"


const theme = createTheme({
    palette: {
        mode: "light",
    },
});

export const LayoutMaterial = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box bgcolor={"background.default"} color={"text.primary"}>
                <NavbarMaterial />
                <Stack direction="column" spacing={2} justifyContent="space-between">
                    <MenuMaterial />
                    <Outlet />
                </Stack>
                <Footer />
            </Box>
        </ThemeProvider>
    )
}

export const Layout = () => {
    return (
        <ThemeProvider theme={theme}>

        <div className="main">
            <NavbarMaterial/>
            <div className="container">
                <div className="menuContainer">
                    <Menu />
                </div>
                <div className="contentContainer">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
        </ThemeProvider>
    )
}



export default Layout;