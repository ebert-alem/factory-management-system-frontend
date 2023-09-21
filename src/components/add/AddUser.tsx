import { AddRounded, Close } from '@mui/icons-material';
import { Box, Button, ButtonGroup, Divider, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField, Typography, styled } from '@mui/material';
import React, { useState } from 'react'

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

const options = [
  { value: 1, label: 'Empleado' },
  { value: 2, label: 'Administrador' },
];

export const AddUser = () => {
  const [open, setOpen] = React.useState(false);

  //hacer funcion para abrir y cerrar el modal para no pasar directamente el setOpen

  const ModalUserComponent = () => {

    const [loginData, setLoginData] = useState({
      username: '',
      password: '',
      name: '',
      lastname: '',
      dni: '',
      charge: '',
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
      console.log(loginData)
    }

    return (
      <SytledModal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={500}
          height="auto"
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={2.5}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography variant="h5" color="gray" textAlign="center">
            Registrar Usuario
          </Typography>
          <Divider sx={{ marginTop: "10px", marginBottom: "30px" }} />

          <UserBox component="form" onSubmit={handleSubmit}>
            
            <Typography variant="button" textAlign="center">
              Datos de Usuario
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: "space-around" }}>
              <TextField
                name='username'
                margin='normal'
                label="Nombre de Usuario"
                size='small'
                required
                onChange={handleInputChange}
                value={loginData.username}
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
                name='lastname'
                size='small'
                margin='normal'
                label="Apellido"
                required
                onChange={handleInputChange}
                value={loginData.lastname}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: "space-around" }}>
              <TextField
                name='dni'
                size='small'
                inputProps={{
                  pattern: /^\d{7}(\d{1})?$/,
                  inputMode: 'numeric',
                  maxLength: 8,
                }}
                margin='normal'
                label="DNI"
                required
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                value={loginData.dni}
              />
            </Box>

            <Typography variant="button" textAlign="center" paddingTop={2}>
              Cargo del empleado
            </Typography>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="charge">Cargo</InputLabel>
                <Select
                  labelId="charge"
                  id="charge"
                  value={loginData.charge}
                  onChange={(e: SelectChangeEvent) => setLoginData({ ...loginData, charge: e.target.value })}
                  label="Cargo"
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Button variant="text" size="small" color="primary" startIcon={<AddRounded />}>Agregar Cargo</Button>
          </UserBox>

          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button>Registrar</Button>
            <Button onClick={() => setOpen(false)} sx={{ width: "100px" }}>
              <Close />
            </Button>
          </ButtonGroup>
        </Box>
      </SytledModal>
    )
  }

  return { ModalUserComponent, setOpen }

}