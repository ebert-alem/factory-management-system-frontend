import { useState } from "react";
import "./MaterialTypes.scss"
import { Box, Button, Typography } from "@mui/material";
import { AddMaterialTypes } from "./components/AddMaterialType";
import { AddCircle } from "@mui/icons-material";
import { DataTableTypesOfMaterials } from "./components/DataTableMaterialTypes";

export const MaterialTypes = () => {
  const { ModalMaterialType, handlerOpen } = AddMaterialTypes()
  const [update, setUpdate] = useState(false);

  const updateTypes = () => {
    setUpdate(!update)
  }

  return (
    <div className="materialTypes">
      <div className="info">
        <Box display='flex' justifyContent='space-between' width='100%' borderRadius={2}>
          <Typography variant="h4">Tipos de Maleriales</Typography>
          <Button onClick={() => handlerOpen(true)} variant="text" size="large" color="primary" startIcon={<AddCircle />}>
            <Typography variant="body1" sx={{ display: { xs: "none", sm: "flex" } }}>Nuevo Tipo</Typography>
          </Button>
        </Box>
      </div>
      <ModalMaterialType updateTypes={updateTypes} />
      <Box borderRadius={2}>
        <DataTableTypesOfMaterials update={update} />
      </Box>

    </div>
  )
}

export default MaterialTypes;