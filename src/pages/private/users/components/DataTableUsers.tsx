import { useSelector } from "react-redux";
import { AppStore } from '../../../../redux/store';
import { disableUser, getEmployees, transformData } from "../../../../services";
import { DeleteRounded, EditRounded, RestorePageRounded } from "@mui/icons-material";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { CustomDialog, DataTable } from "../../../../components";
import { useEffect, useState } from "react";
import { EmployeeInfo } from "../../../../models";

export const DataTableUsers = ({ update }: { update: boolean }) => {
  const token = useSelector((state: AppStore) => state.user.Token);
  const [rows, setRows] = useState<EmployeeInfo[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({ id: '', name: '', inactive: false });

  const columns: GridColDef[] = [
    {
      field: 'username',
      headerName: 'Usuario',
      width: 150,
      valueGetter: (params: GridValueGetterParams) => `${params.row.user.userName || ''}`,
    },
    {
      field: 'name',
      headerName: 'Nombre',
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.name || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'dni',
      headerName: 'Dni',
      type: 'number',
      width: 110,
    },
    {
      field: 'charge',
      headerName: 'Cargo',
      width: 150,
      valueGetter: (params: GridValueGetterParams) => `${params.row.charge.name || ''}`,
    },
    {
      field: 'active',
      headerName: 'Activo',
      width: 100,
      sortable: false,
      type: 'boolean',
      editable: false,
      valueGetter: (params: GridValueGetterParams) => params.row.user.inactive ? false : true,
    },
    {
      field: 'actions', headerName: 'Acción', width: 100, sortable: false, renderCell: (params) => {
        const userId = params.row.user.id;
        const userName = params.row.user.userName;
        return (
          <div className="actions">
            <button className="edit"><EditRounded /></button>
            <button onClick={() => handleDisable(userId, userName, !params.row.user.inactive)} className="delete">{params.row.user.inactive ? <RestorePageRounded /> : <DeleteRounded />}</button>
          </div>
        )
      }
    },
  ];

  const handleDisable = (id: string, name: string, inactive: boolean) => {
    setSelectedRow({ id, name, inactive });
    setDialogOpen(true);
  }

  const handleDialogAccept = async () => {
    const response = await disableUser(selectedRow.id, selectedRow.inactive, token);
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
    const response = await getEmployees(token);
    // const transformedData = transformData(response);
    setRows(response);
    // console.log(transformedData)
  }

  return (
    <div>
      <DataTable columns={columns} rows={rows} />
      <CustomDialog
        title={`${selectedRow.inactive ? 'Desactivar' : 'Habilitar'} al usuario ${selectedRow.name}`}
        text={`${selectedRow.inactive ? 'Se suspendera' : 'Se restaurará'} su acceso al sistema, ¿Desea continuar?`}
        isOpen={dialogOpen}
        onAccept={handleDialogAccept}
        onCancel={handleDialogCancel}
      />
    </div>
  )
}