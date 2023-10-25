import { Close } from '@mui/icons-material';
import { Box, Button, ButtonGroup, Divider, Modal, TextField, Typography, styled } from '@mui/material';
import { useEffect, useState } from 'react'
import { registerUser } from '../../../../services';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../../redux/store';
import { CustomBackdropComponent, CustomSelectComponent } from '../../../../components';
import { getCharges } from '../../../../services/getCharges.service';
import { CustomAlert } from '../../../../components/customAlert';

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

interface ModalUserProps {
  updateUsers: () => void;
}

export const AddUser = () => {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({
    severity: "success",
    isOpen: false,
    text: '',
  })

  const token = useSelector((state: AppStore) => state.user.Token);

  const handlerOpen = (value: boolean) => {
    setOpen(value);
  }

  const ModalUser = ({ updateUsers }: ModalUserProps) => {
    const { CustomBackdrop, handlerOpen } = CustomBackdropComponent()
    const [charges, setCharges] = useState([]);
    const { CustomSelect, selectedOption } = CustomSelectComponent({ options: charges, inputLabel: 'Cargo' })


    const [userData, setUserData] = useState({
      userName: '',
      password: '',
      name: '',
      lastName: '',
      DNI: '',
      chargeId: 0,
    })

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const charCode = event.key;
      if (isNaN(Number(charCode))) {
        event.preventDefault();
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation()
      e.preventDefault()

      handlerOpen(true)
      // console.log(userData)
      newUser()
    }

    useEffect(() => {
      updateCharges();
    }, []);

    const updateCharges = () => {
      (async () => {
        const response = await getCharges(token);
        setCharges(response);
      })();
    }

    useEffect(() => {
      setUserData({ ...userData, chargeId: Number(selectedOption) });
    }, [selectedOption]);

    const newUser = async () => {
      try {
        const response = await registerUser(userData, token)
        console.log(response)
        setAlert({
          severity: 'success',
          isOpen: true,
          text: 'Usuario registrado con exito',
        })
        console.log("llega aca")
        updateUsers()

      } catch (error) {
        console.log("catch")
        setAlert({
          severity: 'error',
          isOpen: true,
          text: 'Error al registrar usuario : ' + (error as Error).message,
        })
        console.log(alert.isOpen)
      
        console.error(error)
      } finally {
        
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
            Registrar Usuario
          </Typography>
          <Divider sx={{ marginTop: "10px", marginBottom: "30px" }} />

          <UserBox >
            <Typography variant="button" textAlign="center">
              Datos de Usuario
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: "space-around" }} gap={4}>
              <TextField
                name='userName'
                margin='normal'
                label="Nombre de Usuario"
                size='small'
                inputProps={{
                  minLength: 5,
                  maxLength: 20
                }}
                required
                onChange={handleInputChange}
                value={userData.userName}
              />
              <TextField
                name='password'
                type='password'
                inputProps={{
                  minLength: 5,
                  maxLength: 20
                }}
                size='small'
                margin='normal'
                label="Contraseña"
                required
                onChange={handleInputChange}
                value={userData.password}
              />
            </Box>

            <Typography variant="button" textAlign="center" paddingTop={2}>
              Datos de empleado
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: "space-around" }} gap={4}>
              <TextField
                name='name'
                size='small'
                inputProps={{
                  maxLength: 20
                }}
                margin='normal'
                label="Nombre"
                required
                onChange={handleInputChange}
                value={userData.name}
              />
              <TextField
                name='lastName'
                inputProps={{
                  maxLength: 20
                }}
                size='small'
                margin='normal'
                label="Apellido"
                required
                onChange={handleInputChange}
                value={userData.lastName}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: "space-around" }}>
              <TextField
                name='DNI'
                size='small'
                inputProps={{
                  pattern: "[0-9]*",
                  inputMode: 'numeric',
                  maxLength: 8,
                  minLength: 7
                }}
                margin='normal'
                label="DNI"
                required
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                value={userData.DNI}
              />
            </Box>

            <Typography variant="button" textAlign="center" paddingTop={2}>
              Cargo del empleado
            </Typography>
            <Box>
              <CustomSelect />
            </Box>
          </UserBox>

          <CustomBackdrop />
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button type='submit' >Registrar</Button>
            <Button onClick={() => setOpen(false)} sx={{ width: "100px" }}>
              <Close />
            </Button>
          </ButtonGroup>
          <CustomAlert severity={alert.severity as unknown as "success" | "info" | "warning" | "error"} text={alert.text} isOpen={alert.isOpen} onClose={() => { setAlert((alert) => ({ ...alert, isOpen: false })); }} />

        </Box>

      </SytledModal>

    )

  }
  //const MemoModalUser = React.memo(ModalUser)
  return {
    ModalUser,
    handlerOpen,
  }
}


