import { Autocomplete, Backdrop, Box, Button, ButtonGroup, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { getProducts, registerMovement } from "../../../../services";
import { Delete, DoneRounded } from "@mui/icons-material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { CustomAlert } from "../../../../components";

interface InputProductsProps {
  updateInputs: () => void;
  resetSelectedOption: () => void;
  handleAlert: (severity: "success" | "info" | "warning" | "error", text: string) => void;
}
const initialNumbers = [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
const sizeVariations = [[39, 40, 41, 42, 43, 44, 45], [35, 36, 37, 38, 39, 40, 41], [27, 28, 29, 30, 31, 32, 33, 34]];

export const InputProducts = ({ updateInputs, resetSelectedOption, handleAlert }: InputProductsProps) => {
  const token = useSelector((state: any) => state.user.Token);
  const employeeId = useSelector((state: AppStore) => state.user.EmployeeId);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState({ id: '', name: '', color: '' })
  const [selectedNumbers, setSelectedNumbers] = useState<any[]>([]);
  const [quantity, setQuantity] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openBack, setOpenBack] = useState(false);
  const [alert, setAlert] = useState({
    severity: 'success',
    isOpen: false,
    text: '',
  })
  const [currentSizes, setCurrentSizes] = useState(0);

  useEffect(() => {
    updateProducts();
  }, []);

  const updateProducts = async () => {
    try {
      const response = await getProducts(token);
      setProducts(response);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClose = () => {
    setOpenDialog(false);
  }

  const handleProductChange = (value?: any) => {
    setSelectedProduct(value);
    console.log(value);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (selectedProduct.id === '' || selectedNumbers.length === 0) {
      handleAlert('warning', 'Debe seleccionar un producto y al menos una numeración');
      return;
    }
    setOpenDialog(true);
  }

  const handleQuantityChange = (index: number, value: any) => {
    const regex = new RegExp(/^\d+$/);
    if (regex.test(value) || value === "") {
      const nuevaCantidad = [...quantity];
      nuevaCantidad[index] = value;
      setQuantity(nuevaCantidad);
    }
  };

  const handleSelectedNumber = (value: any[]) => {
    const sortedValue = value.sort((a, b) => a - b);
  
    // Encuentra el índice del número agregado
    const addedIndex = sortedValue.findIndex(number => !selectedNumbers.includes(number));
  
    // Encuentra el índice del número eliminado
    const removedIndex = selectedNumbers.findIndex(number => !sortedValue.includes(number));
  
    // Crea una copia de quantity
    const newQuantity = [...quantity];
  
    // Si se agregó un número, agrega un nuevo elemento a quantity en el índice correspondiente
    if (addedIndex !== -1) {
      newQuantity.splice(addedIndex, 0, '');
    }
  
    // Si se eliminó un número, elimina el elemento correspondiente de quantity
    if (removedIndex !== -1) {
      newQuantity.splice(removedIndex, 1);
    }
    setSelectedNumbers(sortedValue);
    setQuantity(newQuantity);
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
        employeeId: employeeId,
        type: 'input',
        isMaterialMovement: false,
        details: selectedNumbers.map((number, index) => ({
          productId: Number(selectedProduct.id),
          quantity: Number(quantity[index]),
          number: number,
        }))
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

  const handleSize = () => {
    setQuantity([]);
    setSelectedNumbers(sizeVariations[currentSizes]);
    setCurrentSizes((currentSizes + 1) % sizeVariations.length);
  }

  const handleDeleteNumber = (index: number) => {
    if (selectedNumbers.length === 1) {
      return;
    }

    const newNumbers = [...selectedNumbers];
    newNumbers.splice(index, 1);
    setSelectedNumbers(newNumbers);
    const newQuantity = [...quantity];
    newQuantity.splice(index, 1);
    setQuantity(newQuantity);
  }

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <Box height='70vh' id='inputProduct' component='form' onSubmit={handleSubmit}>
      <Box sx={{ overflowY: 'auto', height: '64vh', padding: 1 }} alignItems='center'>
        <Typography variant='h5' sx={{ marginBottom: 2 }}>Seleccione Producto</Typography>
        <Box display={'flex'} flexDirection={{ xs: 'column', sm: 'row' }} gap={3} mb={2}>
          <Autocomplete
            sx={{ width: '50%' }}
            options={products}
            id={selectedProduct?.id?.toString() || ''}
            getOptionLabel={(option) => option.id ? (option.name + ' ' + option.color) : ''}
            isOptionEqualToValue={(option, value) => option.id === value.id || value === null || (value.id === '' && value.name === '') || (value.id === undefined && value.name === undefined)}
            value={selectedProduct}
            size='small'
            onChange={(_, value) => handleProductChange({ id: value?.id, name: value?.name, color: value?.color })}
            renderInput={(params) => <TextField {...params} label="Producto" required />}
          />
          <Autocomplete
            size="small"
            fullWidth
            multiple
            id="numeration"
            options={initialNumbers}
            value={selectedNumbers}
            disableCloseOnSelect
            getOptionLabel={(option) => option.toString()}
            onChange={(_, value) => handleSelectedNumber(value)}
            onInputChange={(_, reason) => {
              if (reason === 'clear') {
                setQuantity([]);
              }
            }}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Numeración" placeholder="" />
            )}
          />
        </Box>
        <Divider sx={{ marginBottom: 2 }} />

        {selectedNumbers.map((number, index) => (
          <Box display={'flex'} key={index} alignItems={'center'} justifyContent='space-between' gap={1} border={1} borderColor='background.paper' borderRadius={2.5} padding={1} mb={2}>
            <Box display={'flex'} gap={1}>
              <Typography variant="overline">Talle: {number}</Typography>
              <Divider orientation='vertical' flexItem />
            </Box>
            <Box display='flex' gap={2} alignItems='center'>
              <TextField
                name='cantidad'
                label='Cantidad'
                value={quantity[index] || ''}
                required
                size='small'
                onChange={(e) => handleQuantityChange(index, e.target.value)}
                inputProps={{
                  maxLength: 8
                }}
              />
              <Button variant='outlined' disabled={selectedNumbers.length === 1} size='small' onClick={() => handleDeleteNumber(index)} ><Delete /></Button>
            </Box>
          </Box>
        ))
        }
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
            <Box bgcolor={'info.main'} borderRadius={2.5} textAlign={'center'} marginBottom={2} p={0.5}>
              <Typography variant='button'>Producto: {selectedProduct.name} {selectedProduct.color}</Typography>
            </Box>
            {selectedNumbers.length > 0 &&
              <Box sx={{ overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                <Table sx={{ backgroundColor: 'info.main', borderRadius: 2.5 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Talle</TableCell>
                      <TableCell align="right">Cantidad</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedNumbers.map((number, index) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {number}
                        </TableCell>
                        <TableCell align="right">
                          {quantity[index]}
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
        <ButtonGroup
          fullWidth
          variant="contained"
        >
          <Button onClick={handleSize} fullWidth>Variar numeración</Button>
          <Button variant='contained' sx={{ width: '100px' }} type="submit"><DoneRounded /></Button>
        </ButtonGroup>
      </Box>
    </Box>
  )
}