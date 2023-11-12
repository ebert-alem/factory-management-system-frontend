import { Box, IconButton, Modal, Typography, styled } from "@mui/material";
import { CustomAlert, CustomStepper } from "../../../../components";
import { useState } from "react";
import { Close } from "@mui/icons-material";
import { FinalStep, Product, ProductComposition, ProductData, ResumeProduct, StepperProvider } from "..";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { registerAssignation, registerProduct } from "../../../../services";

const SytledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

interface ModalProductProps {
    updateProducts: () => void;
    open: boolean;
    handlerOpen: (value: boolean) => void;
}

export const ModalProduct = ({ updateProducts, open, handlerOpen }: ModalProductProps) => {
    const token = useSelector((state: AppStore) => state.user.Token);
    const [alert, setAlert] = useState({
        severity: "success",
        isOpen: false,
        text: '',
    })
    const [ success, setSuccess ] = useState<boolean>(false)
    const [resetKey, setResetKey] = useState(0);
    
    const handleModalClose = () => {
        handlerOpen(false)
        setResetKey((prevKey) => prevKey + 1)
    };

    const newProduct = async (productData: Product, selectedMaterials: any[], quantity: string[]) => {
        console.log(productData)
        try {
            const productField = {
                ...productData,
                size: Number(productData.size),
                price: Number(productData.price),
                stock: Number(productData.stock),
            }
            const data = await registerProduct(productField, token)
            console.log(data)

            if (selectedMaterials.length > 0) {
                const assignationField = {
                    productId: data.id,
                    assignations: selectedMaterials.map((material, index) => {
                        return {
                            quantity: Number(quantity[index]),
                            materialId: Number(material.id),
                        }
                    })
                }
                const assignationData = await registerAssignation(assignationField, token)
                console.log(assignationData)
            }

            setAlert({
                severity: 'success',
                isOpen: true,
                text: 'Producto registrado con exito',
            })

            setSuccess(true)
            updateProducts();

        } catch (error) {
            console.error(error)
            setAlert({
                severity: 'error',
                isOpen: true,
                text: 'Error al registrar producto : ' + (error as Error).message,
            })

            setSuccess(false)
        }
    }

    const steps = [{
        label: 'Datos del producto',
        content: <ProductData />
    },
    {
        label: 'Composición',
        content: <ProductComposition />,
        optional: true
    },
    {
        label: 'Resumen',
        content: <ResumeProduct newProduct={newProduct} />
    }];

    return (
        <StepperProvider key={resetKey}>
            <SytledModal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    width={{ xs: '100%', sm: 800 }}
                    height="auto"
                    bgcolor={"background.default"}
                    color={"text.primary"}
                    p={3}
                    borderRadius={2.5}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                >
                    <Box alignItems='center' display='flex' marginBottom={3} justifyContent='space-between'>
                        <Typography variant="h4" color='primary'>Nuevo producto</Typography>
                        <IconButton onClick={() => handleModalClose()}>
                            <Close />
                        </IconButton>
                    </Box>
                    <CustomStepper steps={steps} finalStep={<FinalStep success={success} />} />
                    <CustomAlert severity={alert.severity as unknown as "success" | "info" | "warning" | "error"} text={alert.text} isOpen={alert.isOpen} onClose={() => { setAlert((alert) => ({ ...alert, isOpen: false })); }} />
                </Box>
            </SytledModal>
        </StepperProvider>
    );
}


