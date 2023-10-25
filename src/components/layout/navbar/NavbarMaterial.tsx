import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Stack, Toolbar, Typography, styled } from "@mui/material"
import { clearLocalStorage } from "../../../utilities";
import { resetUser } from "../../../redux/states/user";
import { PublicRoutes } from '../../../models';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../services";
import { useSelector } from "react-redux";
import { AppStore } from "../../../redux/store";
import { useState } from "react";

const StyledToolbar = styled(Toolbar)({
    paddingRight: '20px',
    paddingLeft: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    height: '64px',
});

const Logo = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    gap: '10px',
    '& img': {
        width: '30px',
        height: '30px',
        objectFit: 'cover',
    }
}));

interface NavbarProps {
    toggleTheme: () => void;
    mode: string;
}

export const NavbarMaterial = ({ toggleTheme, mode }: NavbarProps) => {

    const token = useSelector((state: AppStore) => state.user.Token);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = async () => {
        try {
            await logoutUser(token);
        } catch (error) {
            console.error(error);
        } finally {   
            clearLocalStorage('user');
            dispatch(resetUser());
            navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
            window.location.reload();
        }
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Stack position="sticky">
            <StyledToolbar sx={{ backgroundColor: "background.paper", borderRadius: 2.5, margin: 1.5}} disableGutters>
                <Logo>
                    <IconButton>
                        <img src="/bravaLogo.png" alt="logo" />
                    </IconButton>
                    <Typography variant="h6" sx={{ color: "#3c72ff", display: { xs: "none", sm: "flex" } }}>
                        BRAVA STOCKS
                    </Typography>
                </Logo>
                <Box gap={1} display='flex' alignItems='center' >
                    <IconButton onClick={() => toggleTheme()}>{ mode === 'dark' ? <LightModeOutlined color="primary"/> : <DarkModeOutlined color="primary"/>}</IconButton>
                    <Divider orientation="vertical" flexItem variant="middle"/>
                    <IconButton onClick={handleClick}>
                        <Avatar sx={{ backgroundColor: "primary.main", width: 30, height: 30 }} />
                    </IconButton>
                </Box>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                >
                    <MenuItem onClick={handleClose}>Perfil</MenuItem>
                    <MenuItem onClick={logOut}>Cerrar sesión</MenuItem>
                </Menu>

            </StyledToolbar>
        </Stack>
    )
}