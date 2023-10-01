import { useState } from "react";
import "./MaterialTypes.scss"
import { Button, Typography } from "@mui/material";
import { AddMaterialTypes } from "./components/AddMaterialType";
import { AddCircleOutlineRounded } from "@mui/icons-material";
import { DataTableTypesOfMaterials } from "./components/DataTableMaterialTypes";

export const MaterialTypes = () => {
  const { ModalMaterialType, handlerOpen } = AddMaterialTypes()
  const [update, setUpdate]   = useState(false);

  const updateTypes = () => { 
    setUpdate(!update)
  }
  
  return (
    <div className="materialTypes">
      <div className="info">
        <Typography variant="h4">Tipos de Maleriales</Typography>
        <Button onClick={() => handlerOpen(true)} variant="text" size="small" color="primary" startIcon={<AddCircleOutlineRounded />}>Nuevo Tipo de Material</Button>
      </div>
      <ModalMaterialType updateTypes={updateTypes}/>
      <DataTableTypesOfMaterials update={update}/>
      
    </div>
  )
}

export default MaterialTypes;