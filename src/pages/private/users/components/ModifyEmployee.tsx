import { Box, Button, ButtonGroup, Divider, Modal, TextField, Typography, styled } from "@mui/material";
import { Employee } from "../../../../models";
import { Close } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CustomBackdropComponent, CustomSelectComponent } from "../../../../components";
import { AppStore } from "../../../../redux/store";
import { getCharges, modifyEmployee } from "../../../../services";
import { CustomAlert } from "../../../../components/customAlert";

const SytledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const EmployeeBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "1px",
    marginBottom: "20px",
});


interface ModalEmployeeProps {
    updateEmployees: () => void;
    employee: Employee
}

export const ModifyEmployee = () => {
    const [open, setOpen] = useState(false);
    const token = useSelector((state: AppStore) => state.user.Token);
    const [charges, setCharges] = useState([]);

    useEffect(() => {
        updateCharges();
    }, []);

    const handlerOpen = (value: boolean) => {
        setOpen(value);
    }

    const updateCharges = async () => {
        const response = await getCharges(token);
        setCharges(response);
    }

    const ModalEmployee = ({ updateEmployees, employee }: ModalEmployeeProps) => {
        
        const [employeeData, setEmployeeData] = useState({
            id: employee.id,
            name: employee.name,
            lastName: employee.lastName,
            dni: employee.dni,
            chargeId: employee.chargeId,
        })

        const { CustomSelect, selectedOption } = CustomSelectComponent({ options: charges, inputLabel: 'Cargo', defaultValue: String(employee.chargeId) })

        const [alert, setAlert] = useState({
            severity: 'success',
            isOpen: false,
            text: '',
        })

        const { CustomBackdrop, handlerOpen } = CustomBackdropComponent()

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setEmployeeData({ ...employeeData, [e.target.name]: e.target.value })
        }

        const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
            handlerOpen(true)
            console.log(employeeData)
            editEmployee()
        }

        useEffect(() => {
            setEmployeeData({ ...employeeData, chargeId: parseInt(selectedOption) });
        }, [selectedOption]);

        const editEmployee = async () => {
            try {
                const response = await modifyEmployee(employeeData, token)
                console.log(response)
                setOpen(false)
            } catch (error) {
                console.error(error)
                setAlert({
                    severity: "error",
                    isOpen: true,
                    text: 'Error al modificar el empleado: ' + (error as Error).message
                })

            } finally {
                updateEmployees()
                handlerOpen(false)
            }
        }

        const handleInputNumber = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = event.target;
            const regex = new RegExp(/^\d+$/);
            if (regex.test(value) || value === "") {
                setEmployeeData({ ...employeeData, [name]: value });
            }
        };

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
                        Editar: {employee.name + " " + employee.lastName}
                    </Typography>
                    <Divider sx={{ marginTop: "10px", marginBottom: "30px" }} />

                    <EmployeeBox>

                        <Typography variant="button" textAlign="center" >
                            Datos del empleado
                        </Typography>
                        <Box display={'flex'} justifyContent={'space-around'} gap={4}>
                            <TextField
                                name='name'
                                margin='normal'
                                fullWidth
                                label="Nombre del empleado"
                                size='small'
                                inputProps={{
                                    maxLength: 30
                                }}
                                required
                                onChange={handleInputChange}
                                value={employeeData.name}
                            />
                            <TextField
                                name='lastName'
                                margin='normal'
                                fullWidth
                                label="Apellido del empleado"
                                size='small'
                                inputProps={{
                                    maxLength: 30
                                }}
                                required
                                onChange={handleInputChange}
                                value={employeeData.lastName}
                            />
                        </Box>
                        <TextField
                            name='dni'
                            fullWidth
                            type="text"
                            size='small'
                            margin='normal'
                            label="Dni"
                            value={employeeData.dni}
                            inputProps={{
                                minLength: 7,
                                maxLength: 9
                            }}
                            onChange={handleInputNumber}
                        />

                        <Typography variant="button" textAlign="center" marginTop={2}>
                            Datos del cargo
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: "space-around" }}>
                            <CustomSelect />
                        </Box>
                    </EmployeeBox>
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
    
    return { 
        ModalEmployee, 
        handlerOpen 
    }
}