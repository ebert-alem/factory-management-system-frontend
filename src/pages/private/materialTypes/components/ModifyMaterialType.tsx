import { Box, Button, ButtonGroup, Divider, Modal, TextField, Typography, styled } from "@mui/material";
import { MaterialType, UnitOfMeasurement } from "../../../../models";
import { Close } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CustomBackdropComponent, CustomSelectComponent } from "../../../../components";
import { AppStore } from "../../../../redux/store";
import { getUnitsOfMeasurement, modifyMaterialType } from "../../../../services";
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
    materialType: MaterialType;
}

export const ModifyMaterialType = () => {
    const [open, setOpen] = useState(false);
    const [units, setUnits] = useState<UnitOfMeasurement[]>([]);
    const [alert, setAlert] = useState({
        severity: 'success',
        isOpen: false,
        text: '',
    })
    const token = useSelector((state: AppStore) => state.user.Token);

    const handlerOpen = (value: boolean) => {
        setOpen(value);
    }

    useEffect(() => {
        updateUnitsOfMeasurement();
    }, []);

    const updateUnitsOfMeasurement = async() => {        
        const response = await getUnitsOfMeasurement(token);
        setUnits(response);
    }

    const ModalMaterialType = ({ updateTypes, materialType }: ModalTypesProps) => {
        const { CustomBackdrop, handlerOpen } = CustomBackdropComponent()

        const { CustomSelect, selectedOption } = CustomSelectComponent({ options: units, inputLabel: 'Unidad de medida', defaultValue: materialType.unitOfMeasurement})

        const [typesData, setTypesData] = useState({
            id: materialType.id,
            name: materialType.name,
            description: materialType.description,
            unitOfMeasurement: materialType.unitOfMeasurement,
        })

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setTypesData({ ...typesData, [e.target.name]: e.target.value })
        }

        const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
            handlerOpen(true)
            console.log(typesData)
            newTypesOfMaterials()
        }

        useEffect(() => {
            setTypesData({ ...typesData, unitOfMeasurement: selectedOption });
        }, [selectedOption]);

        const newTypesOfMaterials = async () => {
            try {
                const response = await modifyMaterialType(typesData, token)
                setTypesData({
                    id: response.id,
                    name: response.name,
                    description: response.description,
                    unitOfMeasurement: response.unitOfMeasurement,
                })
                setOpen(false)


            } catch (error) {
                console.error(error)
                setAlert({
                    severity: "error",
                    isOpen: true,
                    text: 'Error al modificar el tipo de material : '+(error as Error).message
                })

            } finally {
                updateTypes()
                handlerOpen(false)

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
                        Editar: {materialType.name}
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
                        <Button type='submit' >Modificar</Button>
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