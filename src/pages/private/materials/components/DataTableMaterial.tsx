import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { deleteMaterial, getMaterials } from "../../../../services";
import { CustomDialog, DataTable } from "../../../../components";
import { MaterialInfo } from "../../../../models";
import { IconButton } from "@mui/material";

export const DataTableMaterials = ({ update }: { update: boolean }) => {
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
      width: 60,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.stock || ''} ${params.row.stock ? params.row.materialType.unitOfMeasurement.symbol : '-'}`,
    },
    {
      field: 'repositionPoint',
      headerName: 'Reposición',
      width: 100,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.repositionPoint || ''} ${params.row.stock ? params.row.materialType.unitOfMeasurement.symbol : '-'}`,
    },
    {
      field: 'unitOfMeasurement',
      headerName: 'Unidad',
      width: 100,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.materialType.unitOfMeasurement.name || ''}`,
    },
    {
      field: 'price',
      headerName: 'Precio',
      width: 100,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.price ? '$' : '-'} ${params.row.price || ''}`,
    },
    {
      field: 'actions', headerName: 'Acción', width: 100, sortable: false, renderCell: (params) => {
        const id = params.row.id;
        const name = params.row.name;
        return (
          <div className="actions">
            <IconButton size="small"><EditRounded /></IconButton>
            <IconButton onClick={() => handleDelete(id, name)} size="small" >{<DeleteRounded />}</IconButton>
          </div>
        )
      }
    },
  ];

  const handleDelete = (id: string, name: string) => {
    setSelectedRow({...selectedRow, id, name });
    setDialogOpen(true);
  }

  const handleDialogAccept = async () => {
    const response = await deleteMaterial(selectedRow.id, token);
    updateTable()
    console.log(response.message)
    setDialogOpen(false);
  };

  const handleDialogCancel = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    updateTable();
  }, [update]);

  const updateTable = async () => {
    const response = await getMaterials(token);
    if (response) {
      setRows(response);
    }

  }

  return (
    <div>
      <DataTable columns={columns} rows={rows} />
      <CustomDialog
        title={`Eliminar: ${selectedRow.name}`}
        text="Esta accion no se puede deshacer, ¿Desea continuar?"
        isOpen={dialogOpen}
        onAccept={handleDialogAccept}
        onCancel={handleDialogCancel}
      />
    </div>
  )
}

