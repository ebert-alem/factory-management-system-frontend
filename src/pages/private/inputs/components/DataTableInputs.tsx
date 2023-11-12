import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { deleteMaterial, getMaterials } from "../../../../services";
import { CustomDialog, DataTable } from "../../../../components";
import { MaterialInfo } from "../../../../models";
import { IconButton } from "@mui/material";

export const DataTableInputs = ({ update }: { update: boolean }) => {
  const token = useSelector((state: AppStore) => state.user.Token);
  const [rows, setRows] = useState<MaterialInfo[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({ id: 0, number: '', description: '', total: 0, datetime: ''});

  // const {ModalMaterial, handlerOpen} = ModifyMaterial()


  const columns: GridColDef[] = [
    {
      field: 'number',
      headerName: 'Numero',
      width: 150,
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 250,
    },
    {
      field: 'datetime',
      headerName: 'Fecha y Hora',
      width: 150,
      valueGetter: (params: GridValueGetterParams) => `${params.row.materialType.name || ''}`,
    },
    {
      field: 'description',
      headerName: 'Descripción',
      width: 60,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.stock || ''} ${params.row.stock ? params.row.materialType.unitOfMeasurement.symbol : '-'}`,
    },
    {
      field: 'actions', headerName: 'Acción', width: 100, sortable: false, renderCell: (params) => {
        const id = params.row.id;
        const number = params.row.number;

        return (
          <div className="actions">
            <IconButton size="small"><EditRounded /></IconButton>
            <IconButton onClick={() => handleDelete(id, number)} size="small" >{<DeleteRounded />}</IconButton>
          </div>
        )
      }
    },
  ];

  const handleDelete = (id: number, number: string) => {
    setSelectedRow({...selectedRow, id, number });
    setDialogOpen(true);
  }
  
  // const handleModify = (id: number, name: string, description: string, price: number, materialTypeId: number, materialTypeName: string, stock: number, repositionPoint: number) => {
  //   setSelectedRow({ id, name, description, price, materialTypeId, materialTypeName, stock, repositionPoint });
  //   // handlerOpen(true)
  // }

  const handleDialogAccept = async () => {
    const response = await deleteMaterial(selectedRow.id.toString(), token);
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
        title={`Cancelar: ${selectedRow.number}`}
        text="Esta accion no se puede deshacer, ¿Desea continuar?"
        isOpen={dialogOpen}
        onAccept={handleDialogAccept}
        onCancel={handleDialogCancel}
      />
      {/* <ModalMaterial updateMaterial={updateTable} material={selectedRow}/> */}
    </div>
  )
}

