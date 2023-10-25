import { Box } from '@mui/material'
import './footer.scss'

export const Footer = () => {
  return (
    <Box className='footer' bgcolor='background.paper' margin={1.5} borderRadius={2.5}>
      <span>brava</span>
      <span>© Brava dashboard</span>
    </Box>
  )
}
