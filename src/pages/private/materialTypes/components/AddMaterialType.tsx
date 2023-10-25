import { Box, Button, ButtonGroup, Divider, Modal, TextField, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { CustomBackdropComponent, CustomSelectComponent } from "../../../../components";
import { Close } from "@mui/icons-material";
import { getUnitsOfMeasurement, registerMaterialType } from "../../../../services";
import { UnitOfMeasurement } from "../../../../models";
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

interface ModalTypesProps {
    updateTypes: () => void;
}

export const AddMaterialTypes = () => {
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({
        severity: '',
        isOpen: false,
        text: '',
    })

    const token = useSelector((state: AppStore) => state.user.Token);

    const handlerOpen = (value: boolean) => {
        setOpen(value);
    }

    const ModalMaterialType = ({ updateTypes }: ModalTypesProps) => {
        const { CustomBackdrop, handlerOpen } = CustomBackdropComponent()
        const [units, setUnits] = useState<UnitOfMeasurement[]>([]);
    
        const { CustomSelect, selectedOption } = CustomSelectComponent({ options: units, inputLabel: 'Unidad de medida' })

        const [typesData, setTypesData] = useState({
            name: '',
            description: '',
            unitOfMeasurement: '',
        })

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setTypesData({ ...typesData, [e.target.name]: e.target.value })
        }

        const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
            e.stopPropagation()
            e.preventDefault()
            
            handlerOpen(true)
            console.log(typesData)
            newTypesOfMaterials()
        }

        useEffect(() => {
            updateUnitsOfMeasurement();
        }, []);

        const updateUnitsOfMeasurement = async() => {        
            const response = await getUnitsOfMeasurement(token);
            setUnits(response);
            // console.log(response)            
        }

        useEffect(() => {
            setTypesData({ ...typesData, unitOfMeasurement: selectedOption });
        }, [selectedOption]);

        const newTypesOfMaterials = async () => {
            try {
                const response = await registerMaterialType(typesData, token)
                console.log(response)

                setAlert({
                    severity: 'success',
                    isOpen: true,
                    text: 'Tipo de material registrado correctamente'
                })
                
            } catch (error) {

                setAlert({
                    severity: 'error',
                    isOpen: true,
                    text: 'Error al registrar tipo de material : '+ (error as Error).message
                })
                console.log(alert.isOpen)
                console.error(error)
            } finally {
                updateTypes()

            }
        }

        return (

            <SytledModal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    width={{ xs: 400, md: 500 }}
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
                    <Typography variant="h5" color="primary" textAlign="center">
                        Registrar Tipo de Material
                    </Typography>
                    <Divider sx={{ marginTop: "10px", marginBottom: "30px" }} />

                    <TypesBox >
                        <TextField
                            name='name'
                            margin='normal'
                            label="Nombre tipo de material"
                            size='small'
                            inputProps={{
                                maxLength: 30
                            }}
                            required
                            onChange={handleInputChange}
                            value={typesData.name}
                        />
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
                            value={typesData.description}
                        />

                        <Box sx={{ display: 'flex', justifyContent: "space-around" }}>
                            <CustomSelect />
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




    return { ModalMaterialType, handlerOpen }
}