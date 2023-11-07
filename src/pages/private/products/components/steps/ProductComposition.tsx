import { useContext, useEffect, useState } from 'react';
import { Autocomplete, Box, Button, InputAdornment, TextField } from "@mui/material"
import { Delete } from '@mui/icons-material';
import { getMaterials } from '../../../../../services';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../../../redux/store';
import { StepperContext } from '../..';

export const ProductComposition = () => {
  const token = useSelector((state: AppStore) => state.user.Token);
  const [materials, setMaterials] = useState<any[]>([]);
  const { selectedMaterials, setSelectedMaterials, quantity, setQuantity } = useContext(StepperContext);

  useEffect(() => {
    updateMaterials();
  }, []);

  const updateMaterials = async () => {
    try {
      const response = await getMaterials(token);
      setMaterials(response);
    } catch (error) {
      console.error(error);
    }
  }

  const handleAddMaterial = () => {
    setSelectedMaterials([...selectedMaterials, { id: '', name: '', symbol: '' }]);
    setQuantity([...quantity, '']);
  };

  const handleMaterialChange = (index: number, value?: any) => {
    const nuevosMateriales = [...selectedMaterials];
    nuevosMateriales[index] = value;
    console.log(value)
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
    const nuevosMateriales = [...selectedMaterials];
    nuevosMateriales.splice(index, 1);
    setSelectedMaterials(nuevosMateriales);
    const nuevaCantidad = [...quantity];
    nuevaCantidad.splice(index, 1);
    setQuantity(nuevaCantidad);
  };

  const handleReset = () => {
    setSelectedMaterials([]);
    setQuantity([]);
  }

  return (
    <Box height='55vh' id='step-2' component='form' onReset={handleReset}>
      <Box sx={{ overflowY: 'auto', maxHeight: '50vh', minHeight: '50vh', padding: 1 }}>
        {selectedMaterials.map((material, index) => (
          <Box key={index} display='flex' flexDirection='column' justifyContent='center' gap={1} border={1} borderColor='background.paper' borderRadius={2.5} padding={1} mb={2}>
            <Box display='flex' justifyContent='space-around' alignItems='center' gap={1}>
              <Autocomplete
                options={materials}
                id={material?.id?.toString() || ''}
                getOptionLabel={(option) => option.name || ''}
                isOptionEqualToValue={(option, value) => option.id === value.id || value === null || (value.id === '' && value.name === '') || (value.id === undefined && value.name === undefined)}
                value={{ id: material?.id, name: material?.name }}
                size='small'
                fullWidth
                onChange={(_, value) => handleMaterialChange(index, { ...material, id: value?.id, name: value?.name, symbol: value?.materialType?.unitOfMeasurement?.symbol })}
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
                inputProps={{
                  min: 0,
                  max: 100,
                  step: 1,
                }}
              />
            </Box>
            <Button fullWidth variant='outlined' size='small' onClick={() => handleDeleteMaterial(index)}><Delete /></Button>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 1 }}>
        <Button variant="contained" fullWidth onClick={handleAddMaterial}>Agregar Material</Button>
      </Box>
    </Box>
  )
}