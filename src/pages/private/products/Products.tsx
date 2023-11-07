import { Box, Button, Typography } from "@mui/material"
import { AddCircle } from "@mui/icons-material";
import { DataTableProducts, ModalProduct } from ".";
import { useState } from "react";

export const Products = () => {
    const [update, setUpdate] = useState(false);
    const [open, setOpen] = useState(false);
    
    const updateProducts = () => {
        setUpdate(!update)
    }

    const handlerOpen = (value: boolean) => { setOpen(value) }
    
    return (
        <Box>
            <Box display='flex' justifyContent='space-between' width='100%' borderRadius={2} marginBottom='20px'>
                <Typography variant="h4">Productos</Typography>
                <Button onClick={() => handlerOpen(true)} variant="text" size="large" color="primary" startIcon={<AddCircle />}>
                    <Typography variant="body1" sx={{ display: { xs: "none", sm: "flex" } }}>Nuevo Producto</Typography>
                </Button>
            </Box>
            <DataTableProducts update={update} />
            <ModalProduct updateProducts={updateProducts} open={open} handlerOpen={handlerOpen} />
        </Box>
    )
}