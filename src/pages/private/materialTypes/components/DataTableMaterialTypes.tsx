import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { MaterialType } from "../../../../models";
import { deleteMaterialType, getMaterialTypes } from "../../../../services";
import { CustomDialog, DataTable } from "../../../../components";

export const DataTableTypesOfMaterials = ({ update }: { update: boolean }) => {
  const token = useSelector((state: AppStore) => state.user.Token);
  const [rows, setRows] = useState<MaterialType[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({ id: '', name: '' });


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
        return (
          <div className="actions">
            <button className="edit"><EditRounded /></button>
            <button onClick={() => handleDelete(id, name)} className="delete">{<DeleteRounded />}</button>
          </div>
        )
      }
    },
  ];

  const handleDelete = (id: string, name: string) => {
    setSelectedRow({ id, name });
    setDialogOpen(true);
  }

  const handleDialogAccept = async () => {
    const response = await deleteMaterialType(selectedRow.id, token);
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
    setRows(response);
    // console.log(response)
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
    </div>
  )
}

