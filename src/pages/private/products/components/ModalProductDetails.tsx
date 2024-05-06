import styled from "@emotion/styled";
import { Box, CircularProgress, Dialog, DialogContent, Divider, IconButton, Modal, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { Close, PrintOutlined } from "@mui/icons-material";
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
    const [expandedImage, setExpandedImage] = useState('');

    const handleImageClick = (imageUrl: string) => {
        setExpandedImage(imageUrl);
    };

    const handleCloseImage = () => {
        setExpandedImage('');
    };

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
                sx={{ '@media print': { color: 'black' } }}
            >
                <Box alignItems='center' display='flex' marginBottom={2} justifyContent='space-between'>
                    <Typography variant="h4" color='primary'>Resumen de producto</Typography>
                    <Box display='flex' alignItems='center'>
                        <IconButton onClick={() => window.print()}>
                            <PrintOutlined />
                        </IconButton>
                        <IconButton onClick={() => handleModalClose()}>
                            <Close />
                        </IconButton>
                    </Box>
                </Box>
                <Divider sx={{ mb: 1 }} />
                {inCharge ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', height: '70vh', alignItems: 'center' }}>
                        <CircularProgress color="inherit" />
                    </Box>
                    :
                    <Box component='form' sx={{ overflowY: 'auto', height: '70vh', padding: 1 }}>
                        <Box display='flex' gap={3} sx={{ flexDirection: { sm: 'row', xs: 'column' } }} alignItems={{ sm: 'inherit', xs: 'center' }}>
                            <Box bgcolor='background.paper' p={2} display='flex' flexDirection='column' borderRadius={2.5} maxWidth='232px'>
                                <img
                                    src={product?.imageUrl ? product?.imageUrl : "/noImage.png"}
                                    alt=""
                                    style={{ borderRadius: '10px', objectFit: 'cover', width: '200px', cursor: 'zoom-in', }}
                                    onClick={() => handleImageClick(product?.imageUrl)}
                                />
                                <Box display='flex' flexDirection='column' justifyContent='space-between' mt={2}>
                                    <Typography variant='h6'>{product.name} {product.color}</Typography>
                                    <Typography variant='caption'>Precio: ${product.price}</Typography>
                                    <Typography variant='caption'>Stock: {product.stock}</Typography>
                                    <Typography variant='caption'>Descripción: {product.description}</Typography>
                                </Box>
                            </Box>

                            {product.productVariation?.length > 0 ?
                                <Box sx={{ overflowY: 'auto', display: 'flex', flexDirection: 'column' }} width='100%' alignItems='center'>
                                    <Table sx={{ backgroundColor: 'background.paper', borderRadius: 2.5 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Talle</TableCell>
                                                <TableCell align="right">Stock</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {product.productVariation.map((detail: any, index: number) => (
                                                detail.stock > 0 &&
                                                <TableRow
                                                    key={index}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {detail?.number}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {detail?.stock}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>
                                :
                                <Box display='flex' justifyContent='center' alignItems='center' mb={2} width='100%'>
                                    <Typography variant='body1'>Sin Stock registrado</Typography>
                                </Box>
                            }
                        </Box>
                        <Divider sx={{ mb: 3, mt: 3 }} />
                        <Typography variant='h6'>Composición del producto</Typography>
                        {product.assignations?.length > 0 ?
                            <Box sx={{ display: 'flex', mt: 2 }}>
                                <Table sx={{ backgroundColor: 'background.paper', borderRadius: 2.5 }} aria-label="simple table">
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
                            <Box display='flex' justifyContent='center' alignItems='center' m={2}>
                                <Typography variant='body1'>No hay asignaciones</Typography>
                            </Box>
                        }

                    </Box>
                }
                {expandedImage && (
                    <Dialog open={!!expandedImage} onClose={handleCloseImage}>
                        <DialogContent>
                            <img src={expandedImage} alt="Imagen del producto" style={{ maxWidth: '100%', maxHeight: '100vh', borderRadius: 6 }} />
                        </DialogContent>
                    </Dialog>
                )}
            </Box>


        </SytledModal>
    );
}


