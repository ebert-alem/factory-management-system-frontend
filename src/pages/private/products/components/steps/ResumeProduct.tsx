import { Box, Divider, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { StepperContext } from "../..";
import { useContext } from "react";

export interface Product {
    name: string;
    description: string;
    color: string;
    size: string;
    price: string;
    stock: string;
    imageUrl: string;
}

interface ResumeProductProps {
    newProduct: (productData: Product, selectedMaterials: any[], quantity: string[]) => void;    
}

export const ResumeProduct = ({ newProduct }: ResumeProductProps) => {
    const { productData, selectedMaterials, quantity } = useContext(StepperContext);
    

    const handleSubmit = async(e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        newProduct(productData, selectedMaterials, quantity);
    }

    return (
        <Box id="step-3" sx={{ overflowY: 'auto', maxHeight: '55vh', minHeight: '55vh' }} component='form' onSubmit={handleSubmit}>
            <Box sx={{ backgroundColor: 'background.paper', padding: 3, borderRadius: 2.5 }}>
                <Typography variant='h6' mb={3.5}>Datos del producto</Typography>
                <Grid container rowSpacing={1.5} pl={2} pb={2} borderRadius={2.5} bgcolor='info.main'>
                    <Grid item xs={12} display='flex'>
                        <Typography variant="button">Nombre:</Typography>
                        <Typography ml={1}>{productData.name}</Typography>
                    </Grid>
                    <Grid item xs={12} display='flex'>
                        <Typography variant="button">Descripcion:</Typography>
                        <Typography ml={1}>{productData.description}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display='flex'>
                        <Typography variant="button">Color:</Typography>
                        <Typography ml={1}>{productData.color}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display='flex'>
                        <Typography variant="button">Numero:</Typography>
                        <Typography ml={1}>{productData.size}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display='flex'>
                        <Typography variant="button">Precio:</Typography>
                        <Typography ml={1}>{productData.price}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display='flex'>
                        <Typography variant="button">Stock:</Typography>
                        <Typography ml={1}>{productData.stock}</Typography>
                    </Grid>
                </Grid>
                {selectedMaterials.length > 0 &&
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Divider sx={{ marginTop: 4, marginBottom: 2 }} />
                        <Typography variant='h6' mb={2}>Composición del producto</Typography>
                        <Table sx={{ backgroundColor: 'info.main', borderRadius: 2.5 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Material</TableCell>
                                    <TableCell align="right">Cantidad</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedMaterials.map((material, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {material?.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            {quantity[index]} {material?.symbol}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                }
            </Box>
        </Box>
    );
}