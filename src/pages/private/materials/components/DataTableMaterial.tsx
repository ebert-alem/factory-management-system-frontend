import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { getMaterials } from "../../../../services";
import { CustomDialog, DataTable } from "../../../../components";
import { MaterialInfo } from "../../../../models";

export const DataTableMaterials = () => {
  const token = useSelector((state: AppStore) => state.user.Token);
  const [rows, setRows] = useState<MaterialInfo[]>([]);
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
      width: 250,
    },
    {
      field: 'materialType',
      headerName: 'Tipo material',
      width: 150,
      valueGetter: (params: GridValueGetterParams) => `${params.row.materialType.name || ''}`,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      width: 100,
      valueGetter: (params: GridValueGetterParams) =>
      `${params.row.stock || ''} ${params.row.materialType.unitOfMeasurement.symbol || ''}`,
    },
    {
      field: 'repositionPoint',
      headerName: 'Reposición',
      width: 100,
      valueGetter: (params: GridValueGetterParams) =>
      `${params.row.repositionPoint || ''} ${params.row.materialType.unitOfMeasurement.symbol || ''}`,
    },
    {
      field: 'unitOfMeasurement',
      headerName: 'Unidad',
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
      `${params.row.materialType.unitOfMeasurement.name || ''}`,
    },
    {
      field: 'price',
      headerName: 'Precio',
      width: 100,
      valueGetter: (params: GridValueGetterParams) =>
      `$ ${params.row.price || ''}`,
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

  const handleDialogAccept = async() => {
    // const response = await deleteMaterialType(selectedRow.id, token);
    // updateTable()
    // console.log(response)
    setDialogOpen(false);
  };

  const handleDialogCancel = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    updateTable();
  }, []);

  const updateTable = async () => {
    const response = await getMaterials(token);
    if (response){
      setRows(response);
    } 
    console.log(response)
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
