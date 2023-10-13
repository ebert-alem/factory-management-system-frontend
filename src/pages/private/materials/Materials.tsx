import { Button, Typography } from "@mui/material"
import { AddCircleOutlineRounded } from "@mui/icons-material"
import { DataTableMaterials } from "./components/DataTableMaterial"
import { AddMaterial } from "."
import { useState } from "react"

export const Materials = () => {
  const { ModalMaterial, handlerOpen } = AddMaterial()
  const [updateMaterial, setMaterials] = useState<boolean>(false)

  const updateMaterials = () => {
    setMaterials(!updateMaterial)
  }
  
  return (
    <div className="materialTypes">
      <div className="info">
        <Typography variant="h4">Materiales</Typography>
        <Button onClick={() => handlerOpen(true)} variant="text" size="small" color="primary" startIcon={<AddCircleOutlineRounded />}>Nuevo Material</Button>
      </div>
      <ModalMaterial updateMaterials={updateMaterials}/>
      <DataTableMaterials update={updateMaterial}/>
    </div>
  )
}

export default Materials