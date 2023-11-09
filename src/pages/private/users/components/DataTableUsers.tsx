import { useSelector } from "react-redux";
import { AppStore } from '../../../../redux/store';
import { disableUser, getEmployees } from "../../../../services";
import { DeleteRounded, EditRounded, KeyRounded, RestorePageRounded } from "@mui/icons-material";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { CustomDialog, DataTable } from "../../../../components";
import { useEffect, useState } from "react";
import { EmployeeInfo } from "../../../../models";
import { IconButton } from "@mui/material";
import { ModifyEmployee } from ".";
import { ModifyUser } from "./ModifyUser";

export const DataTableUsers = ({ update }: { update: boolean }) => {
  const token = useSelector((state: AppStore) => state.user.Token);
  const [rows, setRows] = useState<EmployeeInfo[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({ userId: 0, userName: '', inactive: false, id: 0, name: '', lastName: '', dni: '', chargeId: 0 });


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
      field: 'actions', headerName: 'Acción', width: 120, sortable: false, disableExport: true, renderCell: (params) => {
        const userId = params.row.user.id;
        const userName = params.row.user.userName;
        const employeeId = params.row.id;
        const name = params.row.name;
        const lastName = params.row.lastName;
        const dni = params.row.dni;
        const chargeId = params.row.charge.id;

        return (
          <div className="actions">
            <IconButton onClick={() => handleModifyUser(userId, userName)} size="small"><KeyRounded /></IconButton>
            <IconButton onClick={() => handleModifyEmployee(employeeId, name, lastName, dni, chargeId)} size="small"><EditRounded /></IconButton>
            <IconButton onClick={() => handleDisable(userId, userName, !params.row.user.inactive)} size="small">{params.row.user.inactive ? <RestorePageRounded /> : <DeleteRounded />}</IconButton>
          </div>
        )
      }
    },
  ];

  const handleDisable = (userId: number, userName: string, inactive: boolean) => {
    setSelectedRow({...selectedRow, userId, userName, inactive });
    setDialogOpen(true);
  }

  const handleModifyEmployee = (id: number, name: string, lastName: string, dni: string, chargeId: number) => {
    setSelectedRow({...selectedRow, id, name, lastName, dni, chargeId})
    handlerOpen(true);
    console.log(selectedRow)
  }

  const handleModifyUser = (userId: number, userName: string) => {
    setSelectedRow({...selectedRow, userId, userName})
    handlerOpenUser(true);
    console.log(selectedRow)
  }

  const handleDialogAccept = async () => {
    const response = await disableUser(String(selectedRow.userId), selectedRow.inactive, token);
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
    if (response) {
      setRows(response);
    }
  }

  const {ModalEmployee, handlerOpen} = ModifyEmployee()
  const {ModalUser, handlerOpenUser} = ModifyUser()

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
      <ModalEmployee updateEmployees={updateTable} employee={selectedRow}/>
      <ModalUser updateUsers={updateTable} user={{id: selectedRow.userId, username: selectedRow.userName}}/>
    </div>
  )
}