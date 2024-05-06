import { useEffect, useState } from "react";
import { Box, CircularProgress, Divider, Grid, IconButton, Modal, Table, TableBody, TableCell, TableHead, TableRow, Typography, styled } from "@mui/material";
import { Close, PrintOutlined } from "@mui/icons-material";
import { CustomAlert } from "../../../../components";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { getMovementById } from "../../../../services";


const SytledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

interface ModalIncomeProps {
    movementId: number;
    open: boolean;
    handlerOpen: (value: boolean) => void;
}

export const ModalInputDetails = ({ open, handlerOpen, movementId }: ModalIncomeProps) => {
    const token = useSelector((state: AppStore) => state.user.Token);
    const [movement, setMovement] = useState<any>({});
    const [inCharge, setInCharge] = useState(true);


    const [alert, setAlert] = useState({
        severity: "success",
        isOpen: false,
        text: '',
    })

    // const handleAlert = (severity: "success" | "info" | "warning" | "error", text: string) => {
    //     setAlert({
    //         severity,
    //         isOpen: true,
    //         text,
    //     })
    // }

    useEffect(() => {
        if (open) {
            setInCharge(true)
            getMovement();
        }
    }, [open])

    const getMovement = async () => {
        try {
            const response = await getMovementById(movementId.toString(), token)
            console.log(response)
            setMovement(response)
        } catch (error) {
            console.log(error)
        } finally {
            setInCharge(false)
        }
    }

    const handleModalClose = () => {
        setMovement({})
        setInCharge(true)
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
                    {inCharge ? <Typography></Typography> : <Typography variant="h4" color='primary'>Resumen de ingreso</Typography>}
                    <Box display='flex' alignItems='center'>
                        <IconButton onClick={() => window.print()}>
                            <PrintOutlined />
                        </IconButton>
                        <IconButton onClick={() => handleModalClose()}>
                            <Close />
                        </IconButton>
                    </Box>
                </Box>
                <Divider sx={{ mb: 1 }} />
                {inCharge ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', height: '70vh', alignItems: 'center' }}>
                        <CircularProgress color="inherit" />
                    </Box>
                    :
                    <Box height='70vh' component='form'>
                        <Typography variant='h6' mb={3.5}>Datos del movimiento</Typography>
                        <Grid container rowSpacing={1.5} pl={2} pb={2} borderRadius={2.5} bgcolor='background.paper'>
                            <Grid item xs={6} display='flex'>
                                <Typography variant="button">Numero:</Typography>
                                <Typography ml={1}>{movement.id}</Typography>
                            </Grid>
                            <Grid item xs={6} display='flex'>
                                <Typography variant="button">Tipo:</Typography>

                                {movement.id ? (movement.isMaterialMovement ? <Typography ml={1}>Ingreso de Materiales</Typography> : <Typography ml={1}>Ingreso de Productos</Typography>) : <Typography ml={1}></Typography>}
                            </Grid>
                            <Grid item xs={12} display='flex'>
                                <Typography variant="button">Descricion:</Typography>
                                <Typography ml={1}>{movement.description}</Typography>
                            </Grid>
                            {/* <Grid item xs={12} sm={6} display='flex'>
                            <Typography variant="button">Total: </Typography>
                            <Typography ml={1}>{movement.total}</Typography>
                        </Grid> */}
                            <Grid item xs={12} sm={6} display='flex'>
                                <Typography variant="button">Fecha:</Typography>
                                <Typography ml={1}>{movement.dateTime}</Typography>
                            </Grid>
                            {/* <Grid item xs={12} sm={6} display='flex'>
                            <Typography variant="button">Objeto:</Typography>
                            <Typography ml={1}>{movement.isMaterialMovement ? 'Materiales' : 'Productos'}</Typography>
                        </Grid> */}
                        </Grid>

                        {movement.movementDetails?.length > 0 &&
                            (movement.isMaterialMovement as boolean ?
                                <Box sx={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', height: '64vh', mt: 3 }}>
                                    <Table sx={{ backgroundColor: 'background.paper', borderRadius: 2.5 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Material</TableCell>
                                                <TableCell align="right">Cantidad</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {movement.movementDetails.map((detail: any, index: number) => (
                                                <TableRow
                                                    key={index}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {detail?.material?.name}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {detail.quantity} {detail?.material?.unitOfMeasurementSymbol}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>
                                :
                                <Box mt={10}>Nada aún</Box>)
                        }
                    </Box>
                }
                <CustomAlert severity={alert.severity as unknown as "success" | "info" | "warning" | "error"} text={alert.text} isOpen={alert.isOpen} onClose={() => { setAlert((alert) => ({ ...alert, isOpen: false })); }} />
            </Box>
        </SytledModal>
    );
}

