import styled from "@emotion/styled";
import { Box, CircularProgress, Divider, IconButton, Modal, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { Close } from "@mui/icons-material";
import { getProductById } from "../../../../services";


const SytledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

interface ModalProductsProps {
    productId: number;
    open: boolean;
    handlerOpen: (value: boolean) => void;
}

export const ModalProductDetails = ({ open, handlerOpen, productId }: ModalProductsProps) => {
    const token = useSelector((state: AppStore) => state.user.Token);
    const [product, setProduct] = useState<any>({});
    const [inCharge, setInCharge] = useState(true);


    // const [alert, setAlert] = useState({
    //     severity: "success",
    //     isOpen: false,
    //     text: '',
    // })


    useEffect(() => {
        if (open) {
            setInCharge(true)
            getProduct();
        }
    }, [open])

    const getProduct = async () => {
        try {
            const response = await getProductById(productId.toString(), token)
            console.log(response)
            setProduct(response)
        } catch (error) {
            console.log(error)
        } finally {
            setInCharge(false)
        }
    }

    const handleModalClose = () => {
        setProduct({})
        setInCharge(true)
        handlerOpen(false)
    };

    return (
        <SytledModal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                width={{ xs: '100%', sm: 800 }}
                height='auto'
                bgcolor={"background.default"}
                color={"text.primary"}
                p={3}
                borderRadius={2.5}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
            >
                <Box alignItems='center' display='flex' marginBottom={2} justifyContent='space-between'>
                    <Typography variant="h4" color='primary'>{product.name} {product.color}</Typography>
                    <Box display='flex' alignItems='center'>
                        <IconButton onClick={() => handleModalClose()}>
                            <Close />
                        </IconButton>
                    </Box>
                </Box>
                <Divider sx={{ mb: 1 }} />
                {inCharge ?
                    <Box sx={{display: 'flex', justifyContent: 'center', height: '70vh', alignItems:'center' }}>
                        <CircularProgress color="inherit" />
                    </Box>
                    :
                    <Box component='form' sx={{ overflowY: 'auto', height: '70vh', padding: 1 }}>
                        <Typography variant='h6' mb={3.5}>Datos de Stock</Typography>
                        {/* <Grid container rowSpacing={1.5} pl={2} pb={2} borderRadius={2.5} bgcolor='info.main'>
                        <Grid item xs={6} display='flex'>
                            <Typography variant="button">Numero:</Typography>
                            <Typography ml={1}>{movement.id}</Typography>
                        </Grid>
                        <Grid item xs={6} display='flex'>
                            <Typography variant="button">Tipo:</Typography>                            
                            {movement.id ? (movement.isMaterialMovement ? <Typography ml={1}>Ingreso de Materiales</Typography> : <Typography ml={1}>Ingreso de Productos</Typography>): <Typography ml={1}></Typography>}
                        </Grid>
                        <Grid item xs={12} display='flex'>
                            <Typography variant="button">Descricion:</Typography>
                            <Typography ml={1}>{movement.description}</Typography>
                        </Grid>
                     */}
                        <Typography variant='h6' mb={3.5}>Composición del producto</Typography>
                        {product.assignations?.length > 0 ?
                            <Box sx={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', mt: 3 }}>
                                <Table sx={{ backgroundColor: 'info.main', borderRadius: 2.5 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Material</TableCell>
                                            <TableCell align="right">Cantidad</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {product.assignations.map((detail: any, index: number) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {detail?.material?.name}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {detail.quantity} {detail?.material?.materialType?.unitOfMeasurement?.charAt(0)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                            :
                            <Box display='flex' justifyContent='center' alignItems='center' m={18}>
                                <Typography variant='body1'>No hay asignaciones</Typography>
                            </Box>
                        }

                    </Box>
                }
            </Box>

        </SytledModal>
    );
}


