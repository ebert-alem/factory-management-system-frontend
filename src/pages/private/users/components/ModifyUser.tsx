import { Box, Button, ButtonGroup, Divider, Modal, TextField, Typography, styled } from "@mui/material";
import { User } from "../../../../models";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CustomBackdropComponent } from "../../../../components";
import { AppStore } from "../../../../redux/store";
import { CustomAlert } from "../../../../components/customAlert";
import { modifyUser } from "../../../../services/modifyUser.service";

const SytledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const UserBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "1px",
    marginBottom: "20px",
});


interface ModalEmployeeProps {
    updateUsers: () => void;
    user: User
}

export const ModifyUser = () => {
    const [open, setOpen] = useState(false);
    const token = useSelector((state: AppStore) => state.user.Token);

    const handlerOpen = (value: boolean) => {
        setOpen(value);
    }

    const ModalUser = ({ updateUsers, user }: ModalEmployeeProps) => {

        const [userData, setUserData] = useState({
            id: user.id,
            username: user.username,
            password: '',
            repeatPassword: ''
        })

        const [alert, setAlert] = useState({
            severity: 'success',
            isOpen: false,
            text: '',
        })

        const { CustomBackdrop, handlerOpen } = CustomBackdropComponent()

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setUserData({ ...userData, [e.target.name]: e.target.value })
        }

        const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
            if (userData.password !== userData.repeatPassword) { return }
            handlerOpen(true)
            console.log(userData)
            editUser()
        }

        const editUser = async () => {
            try {
                const response = await modifyUser({ id: userData.id, username: userData.username, password: userData.password }, token)
                console.log(response)
                setOpen(false)
            } catch (error) {
                console.error(error)
                setAlert({
                    severity: "error",
                    isOpen: true,
                    text: 'Error al modificar el usuario: ' + (error as Error).message
                })

            } finally {
                updateUsers()
                handlerOpen(false)
            }
        }

        return (

            <SytledModal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    width={{ xs: 400, md: 500 }}
                    height="auto"
                    bgcolor={"background.default"}
                    color={"text.primary"}
                    p={3}
                    borderRadius={2.5}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <Typography variant="h5" color="primary" textAlign="center">
                        Editar: {user.username}
                    </Typography>
                    <Divider sx={{ marginTop: "10px", marginBottom: "30px" }} />

                    <UserBox>
                        <Typography variant="button" textAlign="center" >
                            Datos de usuario
                        </Typography>
                        <TextField
                            name='username'
                            margin='normal'
                            fullWidth
                            label="Nombre de usuario"
                            size='small'
                            inputProps={{
                                minLength: 5,
                                maxLength: 20
                            }}
                            required
                            onChange={handleInputChange}
                            value={userData.username}
                        />
                        <TextField
                            name='password'
                            margin='normal'
                            fullWidth
                            type="password"
                            label="Nueva contraseña"
                            size='small'
                            inputProps={{
                                minLength: 5,
                                maxLength: 20
                            }}
                            required
                            onChange={handleInputChange}
                            value={userData.password}
                        />
                        <TextField
                            name='repeatPassword'
                            fullWidth
                            type="password"
                            size='small'
                            inputProps={{
                                minLength: 5,
                                maxLength: 20
                            }}
                            margin='normal'
                            label="Repetir contraseña"
                            required
                            error={userData.password !== userData.repeatPassword}
                            helperText={userData.password !== userData.repeatPassword ? 'Las contraseñas no coinciden' : ''}
                            value={userData.repeatPassword}
                            onChange={handleInputChange}
                        />
                    </UserBox>
                    <CustomBackdrop />
                    <ButtonGroup
                        fullWidth
                        variant="contained"
                        aria-label="outlined primary button group"
                    >
                        <Button type='submit' >Modificar</Button>
                        <Button onClick={() => setOpen(false)} sx={{ width: "100px" }}>
                            <Close />
                        </Button>
                    </ButtonGroup>
                    <CustomAlert severity={alert.severity as unknown as "success" | "info" | "warning" | "error"} text={alert.text} isOpen={alert.isOpen} onClose={() => { setAlert((alert) => ({ ...alert, isOpen: false })); }} />
                </Box>
            </SytledModal>
        )
    }

    return {
        ModalUser,
        handlerOpenUser: handlerOpen
    }
}