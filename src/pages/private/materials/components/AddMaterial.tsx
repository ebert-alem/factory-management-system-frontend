import { Box, Button, ButtonGroup, Divider, InputAdornment, Modal, TextField, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { CustomBackdropComponent, CustomSelectComponent } from "../../../../components";
import { MaterialTypeInfo } from "../../../../models";
import { getMaterialTypes, registerMaterial } from "../../../../services";
import { Close } from "@mui/icons-material";
import { CustomAlert } from "../../../../components/customAlert";

const SytledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const TypesBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "1px",
    marginBottom: "20px",
});

interface ModalMaterialProps {
    updateMaterials: () => void;
}

export const AddMaterial = () => {
    const token = useSelector((state: AppStore) => state.user.Token);
    const [open, setOpen] = useState(false);
    const [materialTypes, setMaterialTypes] = useState<MaterialTypeInfo[]>([]);
    const [alert, setAlert] = useState({
        severity: '',
        isOpen: false,
        text: '',
    })

    const handlerOpen = (value: boolean) => { setOpen(value) }

    useEffect(() => {
        updateMaterialTypes()
    }, []);

    const updateMaterialTypes = async () => {
        const response = await getMaterialTypes(token);
        setMaterialTypes(response);
    }

    const ModalMaterial = ({ updateMaterials }: ModalMaterialProps) => {
        const { CustomBackdrop, handlerOpen } = CustomBackdropComponent()
        const { CustomSelect, selectedOption } = CustomSelectComponent({ options: materialTypes, inputLabel: 'Tipo de material' })

        const [materialData, setMaterialData] = useState({
            name: '',
            description: '',
            materialTypeId: '',
            price: '',
            stock: '',
            repositionPoint: '',
        })

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setMaterialData({ ...materialData, [e.target.name]: e.target.value })
        }

        const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
            handlerOpen(true)
            newMaterial()
        }

        useEffect(() => {
            setMaterialData({ ...materialData, materialTypeId: selectedOption });
        }, [selectedOption]);

        const newMaterial = async () => {
            try {
                const materialFields = {
                    ...materialData,
                    materialTypeId: Number(materialData.materialTypeId),
                    price: Number(materialData.price),
                    stock: Number(materialData.stock),
                    repositionPoint: Number(materialData.repositionPoint),
                }

                await registerMaterial(materialFields, token)                
                setAlert({
                    severity: "success",
                    isOpen: true,
                    text: 'Material registrado con éxito'
                })
            

            } catch (error) {
                setAlert({
                    severity: "error",
                    isOpen: true,
                    text: 'Error al registrar material : '+ (error as Error).message
                })
                console.error(error)

            } finally {
                updateMaterials()
                handlerOpen(false)
            }
        }

        const handleInputNumber = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = event.target;     
            const regex = new RegExp(/^\d+(\.\d{0,2})?$/);

            if (regex.test(value) || value === "") {
                setMaterialData({ ...materialData, [name]: value });
            }
        };

        return (
            <SytledModal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    width={{ xs: "auto", md: "auto" }}
                    height="auto"
                    bgcolor={"background.default"}
                    color={"text.primary"}
                    p={3}
                    borderRadius={2.5}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <Typography variant="h5" color="gray" textAlign="center">
                        Registrar Material
                    </Typography>
                    <Divider sx={{ marginTop: "10px", marginBottom: "30px" }} />

                    <TypesBox >
                        
                        <Typography variant="button" textAlign="center" >
                            Datos de Material
                        </Typography>
                        <Box display={'flex'} justifyContent={'space-around'} gap={4}>
                            <TextField
                                name='name'
                                margin='normal'
                                fullWidth
                                label="Nombre de material"
                                size='small'
                                inputProps={{
                                    maxLength: 30
                                }}
                                required
                                onChange={handleInputChange}
                                value={materialData.name}
                            />
                            
                            <TextField
                                name='price'
                                fullWidth
                                type="text"
                                size='small'
                                margin='normal'
                                label="Precio"
                                value={materialData.price}
                                inputProps={{ maxLength: 10 }}
                                InputProps={{
                                    startAdornment:
                                        <InputAdornment position="start">$</InputAdornment>
                                }}
                                onChange={handleInputNumber}
                            />
                        </Box>
                        <TextField
                            name='description'
                            inputProps={{
                                maxLength: 150
                            }}
                            size='small'
                            multiline
                            margin='normal'
                            label="Descripción"
                            onChange={handleInputChange}
                        />

                        <Typography variant="button" textAlign="center" marginTop={2}>
                            Datos de tipo de Material
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: "space-around" }}>
                            <CustomSelect />
                        </Box>

                        <Typography variant="button" textAlign="center" marginTop={2} >
                            Datos de Stock
                        </Typography>
                        <Box display={"flex"} justifyContent={"space-around"} gap={4} >
                            <TextField
                                name='stock'
                                fullWidth
                                inputProps={{
                                    maxLength: 8
                                }}
                                size='small'
                                margin='normal'
                                label="Stock"                                
                                onChange={handleInputNumber}
                                value={materialData.stock}
                            />
                            <TextField
                                name='repositionPoint'
                                fullWidth
                                inputProps={{
                                    maxLength: 8
                                }}
                                value={materialData.repositionPoint}
                                size='small'
                                margin='normal'
                                label="Punto reposicion"
                                onChange={handleInputNumber}
                            />
                        </Box>
                    </TypesBox>

                    <CustomBackdrop />
                    <ButtonGroup
                        fullWidth
                        variant="contained"
                        aria-label="outlined primary button group"
                    >
                        <Button type='submit' >Registrar</Button>
                        <Button onClick={() => setOpen(false)} sx={{ width: "100px" }}>
                            <Close />
                        </Button>
                    </ButtonGroup>
                    <CustomAlert severity={alert.severity as unknown as "success" | "info" | "warning" | "error"} text={alert.text} isOpen={alert.isOpen} onClose={() => { setAlert((alert) => ({ ...alert, isOpen: false })); }} />
                </Box>

            </SytledModal>
        )
    }

    return {
        ModalMaterial,
        handlerOpen
    }

}