import { MenuRounded } from "@mui/icons-material";
import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Typography, styled } from "@mui/material"
import { clearLocalStorage } from "../../../utilities";
import { UserKey, resetUser } from "../../../redux/states/user";
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
    backgroundColor: '#1f1f1f',

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


export const NavbarMaterial = () => {

    const token = useSelector((state: AppStore) => state.user.Token);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = async () => {
        try {
            await logoutUser(token);
        } catch (error) {
            console.error(error);
        }

        clearLocalStorage(UserKey);
        dispatch(resetUser());
        navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
        handleClose();
    }

    const [anchorEl, setAnchorEl] = useState
    <null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <AppBar position="sticky">
            <StyledToolbar disableGutters>
                {/* <IconButton size="small" color="default" sx={{ display: { xs: "flex", sm: "none" } }}> */}
                <MenuRounded fontSize="large" sx={{ display: { xs: "flex", sm: "none" } }} />
                {/* </IconButton> */}
                <Logo>
                    <IconButton >
                        <img src="/bravaLogo.png" alt="logo" />
                    </IconButton>
                    <Typography variant="h6" sx={{ color: "#3c72ff", display: { xs: "none", sm: "flex" } }}>
                        BRAVA STOCKS
                    </Typography>
                </Logo>

                <IconButton onClick={handleClick}>
                    <Avatar sx={{ backgroundColor: "#3c72ff", width: 30, height: 30 }} />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>Perfil</MenuItem>
                    <MenuItem onClick={logOut}>Cerrar sesión</MenuItem>
                </Menu>

            </StyledToolbar>
        </AppBar>
    )
}