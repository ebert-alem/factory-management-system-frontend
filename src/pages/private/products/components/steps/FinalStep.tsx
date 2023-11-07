import { Box, Typography } from "@mui/material"
import { useContext } from "react";
import { StepperContext } from "../..";
import { CheckCircle, Error } from "@mui/icons-material";

interface FinalStepProps {
    success: boolean;
}

export const FinalStep = ({ success }: FinalStepProps) => {
    const { setSelectedMaterials, setQuantity, setProductData } = useContext(StepperContext);

    const handleReset = () => {
        setSelectedMaterials([null]);
        setQuantity(['']);
        setProductData({
            name: '',
            description: '',
            color: '',
            size: '',
            price: '',
            stock: '',
            imageUrl: '',
        });
    }

    return (
        <Box id="final-step" sx={{ overflowY: 'auto', maxHeight: '55vh', minHeight: '55vh' }} component='form' onReset={handleReset} display='flex' flexDirection='column' justifyContent='center'>
            <Box display='flex' justifyContent='center' alignItems='center'>
                {success ?
                    <>
                        <CheckCircle fontSize="medium" color="primary" />
                        <Typography sx={{ padding: 2 }} color='primary' variant='h5'>Realizado</Typography>
                    </>
                    :
                    <>
                        <Error fontSize="medium" color="primary" />
                        <Typography sx={{ padding: 2 }} color='primary' variant='h5'>No realizado</Typography>
                    </>

                }
            </Box>
        </Box>
    )
}