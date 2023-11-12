import { useState } from "react";
import { Box, Button, Divider, IconButton, Modal, Typography, styled } from "@mui/material";
import { Close, Inventory2Outlined, ReplyRounded, SellOutlined } from "@mui/icons-material";
import { CustomAlert } from "../../../../components";
import { InputMaterials, InputProducts } from ".";

const SytledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

interface ModalIncomeProps {
    updateInputs: () => void;
    open: boolean;
    handlerOpen: (value: boolean) => void;
}

export const ModalInput = ({ updateInputs, open, handlerOpen }: ModalIncomeProps) => {
    const [selectedButton, setSelectedButton] = useState<'materiales' | 'productos' | null>(null);

    const [alert, setAlert] = useState({
        severity: "success",
        isOpen: false,
        text: '',
    })

    const handleAlert = (severity: "success" | "info" | "warning" | "error", text: string) => {
        setAlert({
            severity,
            isOpen: true,
            text,
        })
    }

    const resetSelectedButton = () => {
        setSelectedButton(null)
    }

    const handleModalClose = () => {
        resetSelectedButton()
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
                    <Typography variant="h4" color='primary'>Nuevo ingreso</Typography>
                    <Box display='flex' alignItems='center'>
                        {selectedButton !== null && (
                            <IconButton size="small" onClick={() => setSelectedButton(null)}>
                                <ReplyRounded />
                            </IconButton>
                        )}
                        <IconButton onClick={() => handleModalClose()}>
                            <Close />
                        </IconButton>
                    </Box>

                </Box>
                <Divider sx={{ mb: 1 }} />
                
                {selectedButton === null && (
                    <Box display='flex' justifyContent='center' flexDirection='column' alignItems='center' height='70vh' gap={6}>
                        <Button sx={{ height: 80, borderRadius: 5 }} variant="outlined" startIcon={<Inventory2Outlined />} onClick={() => setSelectedButton('materiales')}>Materiales</Button>
                        <Button sx={{ height: 80, borderRadius: 5 }} variant="outlined" startIcon={<SellOutlined />} onClick={() => setSelectedButton('productos')}>Productos</Button>
                    </Box>
                )}

                {selectedButton === 'materiales' && <InputMaterials updateInputs={updateInputs} resetSelectedOption={resetSelectedButton} handleAlert={handleAlert}/>}
                {selectedButton === 'productos' && <InputProducts />}
                
                <CustomAlert severity={alert.severity as unknown as "success" | "info" | "warning" | "error"} text={alert.text} isOpen={alert.isOpen} onClose={() => { setAlert((alert) => ({ ...alert, isOpen: false })); }} />
            </Box>
        </SytledModal>
    );
}

