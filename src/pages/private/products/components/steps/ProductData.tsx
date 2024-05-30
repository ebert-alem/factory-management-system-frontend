import { Autocomplete, Box, Button, InputAdornment, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { StepperContext } from "../..";
import { uploadImageToImgbb } from "../../../../../utilities";
import { AddCircle, RemoveCircle } from "@mui/icons-material";


const colors = ['Blanco', 'Negro', 'Rojo', 'Azul', 'Gris', 'Verde', 'Beige', 'Camel', 'Ceniza', 'Marrón']

export const ProductData = () => {
    const { productData, setProductData } = useContext(StepperContext);
    const [uploadedImg, setUploadedImg] = useState<boolean>(false)

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

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const image = event.target.files[0];
            const imageUrl = await uploadImageToImgbb(image);
            setProductData({ ...productData, imageUrl });
            console.log(imageUrl);
            setUploadedImg(true);
        }
    };

    const handleDeleteImage = () => {
        setProductData({ ...productData, imageUrl: '' });
        setUploadedImg(false);

        const fileInput = document.getElementById('raised-button-file') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    }

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

                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
                    <Autocomplete
                        options={colors}
                        sx={{ marginTop: 2, marginBottom: 1 }}
                        id={productData?.color || ''}
                        getOptionLabel={(option) => option || ''}
                        isOptionEqualToValue={(option, value) => option === value || value === ''}
                        value={productData.color}
                        size='small'
                        fullWidth
                        onChange={(_, value) => setProductData({ ...productData, color: value || '' })}
                        renderInput={(params) => <TextField {...params} label="Color" required />}
                    />
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
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
                    <TextField
                        name='description'
                        minRows={3}
                        multiline
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
                </Box>
                <Box display='flex' alignItems='center' justifyContent='center' gap={3}>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        type="file"
                        onChange={handleImageChange}
                    />
                    <TextField
                        fullWidth
                        margin='none'
                        label="Imagen"
                        size='small'
                        value={productData.imageUrl}
                        disabled
                    />
                    {
                        !uploadedImg ? (
                            <label htmlFor="raised-button-file">
                                <Button variant="outlined" size="large" component="span">
                                    <AddCircle />
                                </Button>
                            </label>
                        ) : (
                            <Button variant="outlined" size="large" onClick={handleDeleteImage}>
                                <RemoveCircle />
                            </Button>
                        )}

                </Box>
            </Box>
        </Box>
    )
}