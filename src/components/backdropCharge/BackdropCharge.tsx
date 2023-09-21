import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';

export const BackdropCharge = () => {
    const [open, setOpen] = useState(false)

    const BackdropLoading = () => {
        return(
            <Backdrop open={open} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <CircularProgress color="inherit" />
        </Backdrop>
            )
    }
    
    return {
        BackdropLoading,
        setOpen
    }
}
