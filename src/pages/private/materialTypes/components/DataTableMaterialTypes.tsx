import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { MaterialType } from "../../../../models";
import { deleteMaterialType, getMaterialTypes } from "../../../../services";
import { CustomDialog, DataTable } from "../../../../components";
import { ModifyMaterialType } from "./ModifyMaterialType";

export const DataTableTypesOfMaterials = ({ update }: { update: boolean }) => {
  const token = useSelector((state: AppStore) => state.user.Token);
  const [rows, setRows] = useState<MaterialType[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({ id: 0, name: '', description: '', unitOfMeasurement: '' });
  
  const {ModalMaterialType, handlerOpen} = ModifyMaterialType()

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nombre',
      width: 150,
    },
    {
      field: 'description',
      headerName: 'Descripción',
      width: 350,
    },
    {
      field: 'unitOfMeasurement',
      headerName: 'Unidad de medida',
      width: 150,
    },
    {
      field: 'actions', headerName: 'Acción', width: 100, sortable: false, renderCell: (params) => {
        const id = params.row.id;
        const name = params.row.name;
        const description = params.row.description;
        const unitOfMeasurement = params.row.unitOfMeasurement;
        return (
          <div className="actions">
            <button onClick={() => handleModify(id, name, description, unitOfMeasurement)} className="edit"><EditRounded /></button>
            <button onClick={() => handleDelete(id, name)} className="delete">{<DeleteRounded />}</button>
          </div>
        )
      }
    },
  ];


  const handleDelete = (id: number, name: string) => {
    setSelectedRow({...selectedRow, id, name });
    setDialogOpen(true);
  }

  const handleModify = (id: number, name: string, description: string, unitOfMeasurement: string) => {
    setSelectedRow({ id, name, description, unitOfMeasurement });
    handlerOpen(true)
  }

  const handleDialogAccept = async () => {
    const response = await deleteMaterialType(String(selectedRow.id), token);
    updateTable()
    console.log(response)
    setDialogOpen(false);
  };

  const handleDialogCancel = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    updateTable();
  }, [update]);

  const updateTable = async () => {
    const response = await getMaterialTypes(token);
    if (response) {
      setRows(response);
    }
  }


  return (
    <div>
      <DataTable columns={columns} rows={rows} />
      <CustomDialog
        title={`Eliminar ${selectedRow.name}`}
        text="Esta accion no se puede deshacer, ¿Desea continuar?"
        isOpen={dialogOpen}
        onAccept={handleDialogAccept}
        onCancel={handleDialogCancel}
      />
      <ModalMaterialType updateTypes={updateTable} materialType={selectedRow}/>
    </div>
  )
}

