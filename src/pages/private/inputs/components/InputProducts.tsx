import { Box, Typography } from "@mui/material"


export const InputProducts = () => {
  return (
    <Box height='70vh' id='step-2' component='form'>
      <Box sx={{ overflowY: 'auto', height: '64vh', padding: 1 }} alignItems='center'>
        <Typography variant='h5' sx={{ marginBottom: 2 }}>Productos</Typography>
      </Box>
    </Box>
  )
}