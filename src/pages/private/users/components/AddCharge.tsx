import { Close } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Divider, Modal, TextField, Typography, styled } from "@mui/material"
import { useState } from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { CustomBackdropComponent } from "../../../../components";
import { registerCharge } from "../../../../services";

const SytledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

export const AddCharge = () => {
    const [open, setOpen] = useState(false);
    
    
    const token = useSelector((state: AppStore) => state.user.Token);

    const handlerOpenCharge = (value: boolean) => {
        setOpen(value);
    }

    const ModalCharge = () => {
        const [chargeName, serChargeName] = useState("");
        const { CustomBackdrop, handlerOpen } = CustomBackdropComponent()
        const [update, setUpdate] = useState(false);
        
        const handlerSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
            e.stopPropagation()
            e.preventDefault()
            handlerOpen(true)
            console.log(chargeName)
            newCharge()
            setUpdate(!update)
        }

        const newCharge = async () => {
            try {
                const response = await registerCharge(chargeName, token)
                console.error(response)
            } catch (error) {
                console.error(error)
            }
            handlerOpen(false)
        }

        return (
            <SytledModal open={open}>
                <Box
                    width="auto"
                    height="auto"
                    bgcolor={"background.default"}
                    color={"text.primary"}
                    p={3}
                    borderRadius={2.5}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    component="form"
                    onSubmit={handlerSubmit}
                >
                    <Typography variant="h5" color="gray" textAlign="center">
                        Registrar Cargo
                    </Typography>
                    <Divider sx={{ marginTop: "10px", marginBottom: "20px" }} />

                    <TextField
                        name='charge'
                        label="Nombre del Cargo"
                        margin="none"                        
                        size='small'
                        required
                        value={chargeName}
                        onChange={(e) => serChargeName(e.target.value)}
                    />
                    
                    <ButtonGroup
                        fullWidth
                        variant="contained"
                        aria-label="outlined primary button group"
                        sx={{ marginTop: "20px" }}
                    >
                        <Button type='submit' >Registrar</Button>
                        <Button onClick={() => setOpen(false)} sx={{ width: "100px" }}>
                            <Close />
                        </Button>
                    </ButtonGroup>

                    <CustomBackdrop />

                </Box>
            </SytledModal>
        )
    }
    
    return {
        ModalCharge,
        handlerOpenCharge
    }
}
