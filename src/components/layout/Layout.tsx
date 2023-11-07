import { Outlet } from "react-router-dom"
import { Menu } from "../menu/Menu"
import { Footer } from "../footer/Footer"
import { Box, Stack, ThemeProvider } from "@mui/material"
import { NavbarMaterial } from "./navbar/NavbarMaterial"
import { CssBaseline } from '@mui/material';
import { useState } from "react"
import { lightTheme, darkTheme } from '../../styles/theme'

export const LayoutMaterial = () => {
    // const [openMenu, setOpenMenu] = useState(false);

    const getTheme = () => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme === 'dark' ? darkTheme : lightTheme;
    };

    const [theme, setTheme] = useState(getTheme());

    const toggleTheme = () => {
        const newTheme = theme.palette.mode === 'light' ? darkTheme : lightTheme;
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme.palette.mode);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <ThemeProvider theme={theme}>
                <NavbarMaterial toggleTheme={toggleTheme} mode={theme.palette.mode} />
                <Stack display='flex' flexDirection='column' justifyContent='space-between' flexGrow='1'>
                    <Stack
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            height: '100%',
                        }}
                    >
                        <Box sx={{
                            width: { lg: "250px" },
                            // maxHeight: {lg:'88vh'},
                            // overflowY: {lg:"auto"},
                            scrollbarwidth: 'thin',
                            '&::-webkit-scrollbar': {
                                width: '0.4em',
                                height: '0.2em',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: "background.paper",
                            },
                            '&::-webkit-scrollbar-thumb': {
                                borderRadius: '5px',
                                                              
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                background: '#5858587a'
                            },
                        }}>
                        
                            <Box sx={{ marginLeft: { lg: '20px', sm: '10px' }, marginRight: { lg: '15px', sm: '10px' } }}>
                                <Menu />
                            </Box>
                        </Box>
                        <Stack
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '20px',
                                backgroundColor: "background.paper",
                                borderRadius: 2.5,
                                marginTop: 1.5,
                                marginBottom: 1.5,
                                marginRight: 1.5,
                            }}
                        >
                            <Outlet />
                        </Stack>
                    </Stack>
                    <Footer />
                </Stack>
                <CssBaseline />
            </ThemeProvider>
        </Box>
    );
}
