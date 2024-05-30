import { BackspaceRounded, Visibility } from "@mui/icons-material";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { getMovements } from "../../../../services";
import { CustomDialog, DataTable } from "../../../../components";
import { MaterialInfo } from "../../../../models";
import { IconButton } from "@mui/material";
import { ModalInputDetails } from ".";

export const DataTableInputs = ({ update }: { update: boolean }) => {
  const token = useSelector((state: AppStore) => state.user.Token);
  const [rows, setRows] = useState<MaterialInfo[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({ id: 0, number: '', description: '', total: 0, datetime: '' });
  const [openDetails, setOpenDetails] = useState(false);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Numero',
      width: 100,
    },
    {
      field: 'datetime',
      headerName: 'Fecha y Hora',
      width: 200,
      valueGetter: (params: GridValueGetterParams) => `${params.row.dateTime || ''}`,
    },
    {
      field: 'object',
      headerName: 'Objeto',
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.isMaterialMovement ? 'Materiales' : 'Productos'}`,
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 100,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.total ? '$' : '-'} ${params.row.total || ''}`,
    },
    {
      field: 'actions', headerName: 'Acción', width: 100, sortable: false, renderCell: (params) => {
        const id = params.row.id;
        const number = params.row.number;

        return (
          <div className="actions">
            <IconButton size="small" onClick={handlerDetails(id)}>{<Visibility />}</IconButton>
            <IconButton onClick={() => handleCancel(id, number)} size="small" >{<BackspaceRounded />}</IconButton>
          </div>
        )
      }
    },
  ];

  const handleCancel = (id: number, number: string) => {
    setSelectedRow({ ...selectedRow, id, number });
    setDialogOpen(true);
  }

  const handlerDetails = (id: number) => () => {
    setSelectedRow({ ...selectedRow, id });
    console.log(id)
    setOpenDetails(true);
  }

  const handleDialogAccept = async () => {
    // const response = await deleteMaterial(selectedRow.id.toString(), token);
    // updateTable()
    // console.log(response.message)
    setDialogOpen(false);
  };

  const handleDialogCancel = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    updateTable();
  }, [update]);

  const updateTable = async () => {
    const response = await getMovements('input', token);
    if (response) {
      setRows(response);
    }
  }

  return (
    <div>
      <DataTable columns={columns} rows={rows} />
      <CustomDialog
        title={`Cancelar: ${selectedRow.id}`}
        text="Esta accion no se puede deshacer, ¿Desea continuar?"
        isOpen={dialogOpen}
        onAccept={handleDialogAccept}
        onCancel={handleDialogCancel}
      />
      <ModalInputDetails movementId={selectedRow.id} handlerOpen={setOpenDetails} open={openDetails}/>
    </div>
  )
}

