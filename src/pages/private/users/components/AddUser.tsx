import { Close } from '@mui/icons-material';
import { Box, Button, ButtonGroup, Divider, Modal, TextField, Typography, styled } from '@mui/material';
import { useEffect, useState } from 'react'
import { registerUser } from '../../../../services';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../../redux/store';
import { CustomBackdropComponent, CustomSelectComponent } from '../../../../components';
import { getCharges } from '../../../../services/getCharges.service';

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

  const token = useSelector((state: AppStore) => state.user.Token);

  const handlerOpen = (value: boolean) => {
    setOpen(value);
  }

  const ModalUser = ({ updateUsers }: ModalUserProps) => {
    const { CustomBackdrop, handlerOpen } = CustomBackdropComponent()
    const [charges, setCharges] = useState([]);
    const { CustomSelect, selectedOption } = CustomSelectComponent({ options: charges, inputLabel: 'Cargo' })


    const [loginData, setLoginData] = useState({
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
      setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      handlerOpen(true)
      console.log(loginData)
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
      setLoginData({ ...loginData, chargeId: Number(selectedOption) });
    }, [selectedOption]);

    const newUser = async () => {
      try {
        const response = await registerUser(loginData, token)
        console.error(response)
      } catch (error) {
        console.error(error)
      } finally {
        updateUsers()
        handlerOpen(false)
        setOpen(false)
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
          <Typography variant="h5" color="gray" textAlign="center">
            Registrar Usuario
          </Typography>
          <Divider sx={{ marginTop: "10px", marginBottom: "30px" }} />

          <UserBox >
            <Typography variant="button" textAlign="center">
              Datos de Usuario
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: "space-around" }}>
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
                value={loginData.userName}
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
                value={loginData.password}
              />
            </Box>

            <Typography variant="button" textAlign="center" paddingTop={2}>
              Datos de empleado
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: "space-around" }}>
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
                value={loginData.name}
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
                value={loginData.lastName}
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
                value={loginData.DNI}
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


