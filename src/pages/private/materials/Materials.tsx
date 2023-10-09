import { Button, Typography } from "@mui/material"
import "./mateirals.scss"
import { AddCircleOutlineRounded } from "@mui/icons-material"
import { DataTableMaterials } from "./components/DataTableMaterial"

export const Materials = () => {
  // const { ModalMaterialType, handlerOpen } = AddMaterial()
  
  return (
    <div className="materialTypes">
      <div className="info">
        <Typography variant="h4">Maleriales</Typography>
        <Button variant="text" size="small" color="primary" startIcon={<AddCircleOutlineRounded />}>Nuevo Material</Button>
      </div>
      {/* <ModalMaterialType updateTypes={updateTypes}/> */}
      <DataTableMaterials />
    </div>
  )
} // @ts-ignore

export default Materials