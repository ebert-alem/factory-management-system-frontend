import { Autocomplete, Box, InputAdornment, TextField } from "@mui/material";
import { useContext } from "react";
import { StepperContext } from "../..";


const colors = ['Blanco', 'Negro', 'Rojo', 'Azul', 'Gris', 'Verde', 'Beige', 'Camel', 'Ceniza', 'Marrón']

export const ProductData = () => {
    const { productData, setProductData } = useContext(StepperContext);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductData({ ...productData, [e.target.name]: e.target.value })
    }

    const handleInputNumber = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        const regex = new RegExp(name === 'price' ? /^\d+(\.\d{0,3})?$/ : /^\d+$/);
        if (regex.test(value) || value === "") {
            setProductData({ ...productData, [name]: value });
        }
    };

    return (
        <Box id="step-1" sx={{ overflowY: 'auto', maxHeight: '55vh' }} component='form'>
            <Box height='55vh' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <TextField
                    name='name'
                    margin='normal'
                    label="Nombre del producto"
                    size='small'
                    inputProps={{
                        maxLength: 30
                    }}
                    required
                    onChange={handleInputChange}
                    value={productData.name}
                    fullWidth
                />
                <Autocomplete
                    options={colors}
                    sx={{ marginTop: 2, marginBottom: 1}}
                    id={productData?.color || ''}
                    getOptionLabel={(option) => option || ''}
                    isOptionEqualToValue={(option, value) => option === value || value === ''}
                    value={productData.color}
                    size='small'
                    fullWidth
                    onChange={(_, value) => setProductData({ ...productData, color: value || '' })}
                    renderInput={(params) => <TextField {...params} label="Color" required />}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
                    <TextField
                        name='description'
                        margin='normal'
                        label="Descripción"
                        size='small'
                        inputProps={{
                            maxLength: 150
                        }}
                        onChange={handleInputChange}
                        value={productData.description}
                        fullWidth
                    />                    
                    {/* <TextField
                        name='size'
                        margin='normal'
                        label="Numeración"
                        size='small'
                        inputProps={{
                            maxLength: 3
                        }}
                        fullWidth
                        onChange={handleInputNumber}
                        value={productData.size}
                    /> */}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
                    <TextField
                        name='price'
                        margin='normal'
                        label="Precio"
                        size='small'
                        inputProps={{
                            maxLength: 10
                        }}
                        InputProps={{
                            startAdornment:
                                <InputAdornment position="start">$</InputAdornment>
                        }}
                        onChange={handleInputNumber}
                        value={productData.price}
                        fullWidth
                    />
                    <TextField
                        name='stock'
                        margin='normal'
                        label="Stock"
                        size='small'
                        inputProps={{
                            maxLength: 10
                        }}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">u</InputAdornment>
                        }}
                        fullWidth
                        onChange={handleInputNumber}
                        value={productData.stock}
                    />
                </Box>
                <TextField
                    name='imageUrl'
                    margin='normal'
                    label="URL de la imagen"
                    size='small'
                    inputProps={{
                        maxLength: 150
                    }}
                    onChange={handleInputChange}
                    value={productData.imageUrl}
                    fullWidth
                />
                
            </Box>
        </Box>
    )
}