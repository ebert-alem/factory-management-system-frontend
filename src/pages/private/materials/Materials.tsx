import { Button, Typography } from "@mui/material"
import { AddCircle } from "@mui/icons-material"
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
        <Button onClick={() => handlerOpen(true)} variant="text" size="large" color="primary" startIcon={<AddCircle />}>
          <Typography variant="body1" sx={{ display: { xs: "none", sm: "flex" } }}>Nuevo Material</Typography>
        </Button>
      </div>
      <ModalMaterial updateMaterials={updateMaterials} />
      <DataTableMaterials update={updateMaterial} />
    </div>
  )
}

export default Materials