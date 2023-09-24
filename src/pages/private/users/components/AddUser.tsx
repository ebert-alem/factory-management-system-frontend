import { AddRounded, Close } from '@mui/icons-material';
import { Box, Button, ButtonGroup, Divider, MenuItem, Modal, TextField, Typography, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { registerUser } from '../../../../services';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../../redux/store';
import { CustomBackdropComponent, CustomSelectComponent } from '../../../../components';

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

// Consultar al service para obtener los cargos
const charges = [
  { id: "1", name: 'Empleado' },
  { id: "2", name: 'Administrador' }
];


export const AddUser = () => {
  const [open, setOpen] = React.useState(false);

  const token = useSelector((state: AppStore) => state.user.Token);

  const handlerOpen = (value: boolean) => {
    setOpen(value);
  }

  const ModalUserComponent = () => {
    const { CustomBackdrop, handlerOpen } = CustomBackdropComponent()
    const { CustomSelect, selectedOption } = CustomSelectComponent({options: charges, inputLabel: 'Cargo'})

    const [loginData, setLoginData] = useState({
      userName: '',
      password: '',
      name: '',
      lastName: '',
      DNI: '',
      chargeId: '',
    })

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const charCode = event.key;
      if (isNaN(Number(charCode))) {
        event.preventDefault();
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginData({ ...loginData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      handlerOpen(true)
      console.log(selectedOption)
      console.log(loginData)
      newUser()
    }

    useEffect(() => {
      setLoginData({ ...loginData, chargeId: selectedOption });
    }, [selectedOption]);

    const newUser = async () => {
      try {
        const response = await registerUser(loginData, token)
        console.error(response)
      } catch (error) {
        console.error(error)
      }
      handlerOpen(false)
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
                required
                onChange={handleInputChange}
                value={loginData.userName}
              />
              <TextField
                name='password'
                type='password'
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
                margin='normal'
                label="Nombre"
                required
                onChange={handleInputChange}
                value={loginData.name}
              />
              <TextField
                name='lastName'
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
            <Button variant="text" size="small" color="primary" startIcon={<AddRounded />}>Agregar Cargo</Button>
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
  //const MemoModalUser = React.memo(ModalUserComponent)
  return {
    ModalUserComponent
    , handlerOpen
  }
}


