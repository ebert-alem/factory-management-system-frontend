import { AddCircle } from "@mui/icons-material"
import { Box, Button, Typography } from "@mui/material"
import { useState } from "react";
import { ModalOutput } from ".";

export const Outputs = () => {
    const [update, setUpdate] = useState(false);
    const [open, setOpen] = useState(false);
    
    const updateOutputs = () => {
        setUpdate(!update)
    }

    const handlerOpen = (value: boolean) => { setOpen(value) }
    
    return (
        <Box>
            <Box display='flex' justifyContent='space-between' width='100%' borderRadius={2} marginBottom='20px'>
                <Typography variant="h4">Egresos</Typography>
                <Button onClick={() => handlerOpen(true)} variant="text" size="large" color="primary" startIcon={<AddCircle />}>
                    <Typography variant="body1" sx={{ display: { xs: "none", sm: "flex" } }}>Nuevo Egreso</Typography>
                </Button>
            </Box>
            {/* <DataTableIncomes update={update} /> */}
            <ModalOutput updateOutputs={updateOutputs} open={open} handlerOpen={handlerOpen} />
        </Box>
    )
}