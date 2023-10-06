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
    },
    {
      field: 'active',
      headerName: 'Activo',
      width: 100,
      sortable: false,
      type: 'boolean',
      editable: false,
      valueGetter: (params: GridValueGetterParams) => params.row.inactive ? false : true,
    },
    {
      field: 'actions', headerName: 'Acción', width: 100, sortable: false, renderCell: (params) => {
        const id = params.row.id;
        const name = params.row.username;
        return (
          <div className="actions">
            <button className="edit"><EditRounded /></button>
            <button onClick={() => handleDisable(id, name, !params.row.inactive)} className="delete">{params.row.inactive ? <RestorePageRounded /> : <DeleteRounded />}</button>
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
    // const response = await disableUser(selectedRow.id, selectedRow.inactive, token);
    // updateTable()
    // console.log(response)
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
    const transformedData = transformData(response);
    setRows(transformedData);
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