import { AddCircle } from "@mui/icons-material"
import { Box, Button, Typography } from "@mui/material"
import { useState } from "react";
import { ModalInput } from ".";

export const Inputs = () => {
    const [update, setUpdate] = useState(false);
    const [open, setOpen] = useState(false);
    
    const updateInputs = () => {
        setUpdate(!update)
    }

    const handlerOpen = (value: boolean) => { setOpen(value) }
    
    return (
        <Box>
            <Box display='flex' justifyContent='space-between' width='100%' borderRadius={2} marginBottom='20px'>
                <Typography variant="h4">Ingresos</Typography>
                <Button onClick={() => handlerOpen(true)} variant="text" size="large" color="primary" startIcon={<AddCircle />}>
                    <Typography variant="body1" sx={{ display: { xs: "none", sm: "flex" } }}>Nuevo Ingreso</Typography>
                </Button>
            </Box>
            {/* <DataTableIncomes update={update} /> */}
            <ModalInput updateInputs={updateInputs} open={open} handlerOpen={handlerOpen} />
        </Box>
    )
}