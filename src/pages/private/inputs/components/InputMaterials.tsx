import { Delete, DoneRounded } from "@mui/icons-material";
import { Autocomplete, Backdrop, Box, Button, ButtonGroup, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getMaterials, registerMovement } from "../../../../services";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { CustomAlert } from "../../../../components";

interface InputMaterialsProps {
    updateInputs: () => void;
    resetSelectedOption: () => void;
    handleAlert: (severity: "success" | "info" | "warning" | "error", text: string) => void;
}

export const InputMaterials = ({ updateInputs, resetSelectedOption, handleAlert }: InputMaterialsProps) => {
    const token = useSelector((state: any) => state.user.Token);
    const employeeId = useSelector((state: AppStore) => state.user.EmployeeId);
    const [materials, setMaterials] = useState<any[]>([]);
    const [selectedMaterials, setSelectedMaterials] = useState<any[]>([{ id: '', name: '', symbol: '', stock: '' }]);
    const [quantity, setQuantity] = useState<any[]>(['']);
    const [openDialog, setOpenDialog] = useState(false);
    const [openBack, setOpenBack] = useState(false);
    const [alert, setAlert] = useState({
        severity: 'success',
        isOpen: false,
        text: '',
    })

    useEffect(() => {
        updateMaterials();
    }, []);

    const handleClose = () => {
        setOpenDialog(false);
    }

    const updateMaterials = async () => {
        try {
            const response = await getMaterials(token);
            setMaterials(response);
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddMaterial = () => {
        setSelectedMaterials([...selectedMaterials, { id: '', name: '', symbol: '', stock: '' }]);
        setQuantity([...quantity, '']);
    };

    const handleMaterialChange = (index: number, value?: any) => {
        const nuevosMateriales = [...selectedMaterials];
        nuevosMateriales[index] = value;
        setSelectedMaterials(nuevosMateriales);
    };

    const handleQuantityChange = (index: number, value: any) => {
        const regex = new RegExp(/^\d+(\.\d{0,3})?$/);
        if (regex.test(value) || value === "") {
            const nuevaCantidad = [...quantity];
            nuevaCantidad[index] = value;
            setQuantity(nuevaCantidad);
        }
    };

    const handleDeleteMaterial = (index: number) => {
        if ( selectedMaterials.length === 1 ) {
            return;
        }
        const nuevosMateriales = [...selectedMaterials];
        nuevosMateriales.splice(index, 1);
        setSelectedMaterials(nuevosMateriales);
        const nuevaCantidad = [...quantity];
        nuevaCantidad.splice(index, 1);
        setQuantity(nuevaCantidad);
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setOpenDialog(true);
    }

    const handleDialogAccept = () => {
        setOpenBack(true);
        newInput();
        setOpenDialog(false);
    };

    const handleDialogCancel = () => {
        setOpenDialog(false);
    };

    const newInput = async () => {
        try {
            const movementField = {
                employeeId,
                type: 'input',
                isMaterialMovement: true,
                details: selectedMaterials.map((material, index) => {
                    return {
                        quantity: Number(quantity[index]),
                        materialId: Number(material.id),
                    }
                })
            }
            console.log(movementField)
            const data = await registerMovement(movementField, token)
            console.log(data)
            handleAlert('success', 'Ingreso registrado con éxito')
        } catch (error) {
            console.error(error)
            handleAlert('error', 'Error al registrar ingreso: ' + (error as Error).message)
        } finally {
            setOpenBack(false);
            updateInputs()
            resetSelectedOption()
        }
    }

    return (
        <Box height='70vh' id='step-2' component='form' onSubmit={handleSubmit}>
            <Box sx={{ overflowY: 'auto', height: '64vh', padding: 1 }} alignItems='center'>
                <Typography variant='h5' mb={2}>Materiales</Typography>
                <Box bgcolor='background.default' borderRadius={2.5}>
                    {selectedMaterials.map((material, index) => (
                        <Box key={index} display='flex' flexDirection='column' justifyContent='center' gap={1} border={1} borderColor='background.paper' borderRadius={2.5} padding={1} mb={2}>
                            <Box display='flex' justifyContent='space-around' flexDirection={{ xs: 'column', sm: 'row' }} alignItems='center' gap={1}>
                                <Autocomplete
                                    options={materials}
                                    id={material?.id?.toString() || ''}
                                    getOptionLabel={(option) => option.name || ''}
                                    isOptionEqualToValue={(option, value) => option.id === value.id || value === null || (value.id === '' && value.name === '') || (value.id === undefined && value.name === undefined)}
                                    value={{ id: material?.id, name: material?.name }}
                                    size='small'
                                    fullWidth
                                    onChange={(_, value) => handleMaterialChange(index, { ...material, id: value?.id, name: value?.name, symbol: value?.materialType?.unitOfMeasurement?.symbol, stock: value?.stock })}
                                    renderInput={(params) => <TextField {...params} label="Material" required />}
                                />
                                <TextField
                                    name='cantidad'
                                    label='Cantidad'
                                    value={quantity[index]}
                                    required
                                    size='small'
                                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">{material?.symbol}</InputAdornment>
                                    }}
                                    fullWidth
                                    inputProps={{
                                        maxLength: 8
                                    }}                                    
                                />
                            </Box>
                            <Box alignItems='center' display='flex' justifyContent='space-between'>
                                <Typography marginLeft={1} variant='body1'>{ material.name ? `Stock actual: ${material?.stock} ${material?.symbol}` : 'Seleccione material'}</Typography>
                                <Button variant='outlined' disabled={selectedMaterials.length === 1} size='small' onClick={() => handleDeleteMaterial(index)}><Delete /></Button>
                            </Box>                        
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 1 }}>
                <ButtonGroup
                    fullWidth
                    variant="contained"
                >
                    <Button fullWidth onClick={handleAddMaterial}>Agregar Material</Button>
                    <Button sx={{ width: '100px' }} type="submit"><DoneRounded /></Button>
                </ButtonGroup>
            </Box>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                sx={{ '& .MuiDialog-paper': { borderRadius: 2.5 } }}
            >
                <DialogTitle id="alert-dialog-title">
                    {'¿Desea confirmar el siguiente ingreso?'}
                </DialogTitle>
                <DialogContent sx={{ overflowY: 'auto', maxHeight: '400px' }}>

                    {selectedMaterials.length > 0 &&
                        <Box sx={{ overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                            <Table sx={{ backgroundColor: 'info.main', borderRadius: 2.5 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Material</TableCell>
                                        <TableCell align="right">Cantidad</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {selectedMaterials.map((material, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {material?.name}
                                            </TableCell>
                                            <TableCell align="right">
                                                {quantity[index]} {material?.symbol}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    }
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleDialogCancel}>Cancelar</Button>
                    <Button variant="outlined" color="success" onClick={handleDialogAccept} autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
            <Backdrop open={openBack} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <CustomAlert severity={alert.severity as unknown as "success" | "info" | "warning" | "error"} text={alert.text} isOpen={alert.isOpen} onClose={() => { setAlert((alert) => ({ ...alert, isOpen: false })); }} />
        </Box>
    )
}