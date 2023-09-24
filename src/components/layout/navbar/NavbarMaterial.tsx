import { MenuRounded } from "@mui/icons-material";
import { AppBar, Avatar, Box, IconButton, Toolbar, Typography, styled } from "@mui/material"
import { clearLocalStorage } from "../../../utilities";
import { UserKey, resetUser } from "../../../redux/states/user";
import { PublicRoutes } from '../../../models';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = () => {
        clearLocalStorage(UserKey);
        dispatch(resetUser());
        navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
    }

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

                <IconButton onClick={logOut}>
                    <Avatar sx={{ backgroundColor: "#3c72ff", width: 30, height: 30 }} />
                </IconButton>

            </StyledToolbar>
        </AppBar>
    )
}