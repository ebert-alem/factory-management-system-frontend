import { useSelector } from "react-redux";
import { AppStore } from '../../../../redux/store';
import { getEmployees, transformData } from "../../../../services";
import { DeleteRounded, EditRounded, RestorePageRounded } from "@mui/icons-material";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { DataTable } from "../../../../components";
import { useEffect, useState } from "react";
import { EmployeeInfo } from "../../../../models";

const columns: GridColDef[] = [
  {
    field: 'username',
    headerName: 'Usuario',
    width: 150,
    editable: true,
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
    editable: true,
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

  },
  {
    field: 'actions', headerName: 'Acción', width: 100, sortable: false, renderCell: (params) => {
      return (
        <div className="actions">
          <button className="edit"><EditRounded /></button>
          <button className="delete">{!params.row.status ? <DeleteRounded /> : <RestorePageRounded />}</button>
        </div>
      )
    }
  },

];

export const DataTableUsers = ({ update }: { update: boolean }) => {

  const token = useSelector((state: AppStore) => state.user.Token);
  const [rows, setRows] = useState<EmployeeInfo[]>([]);

  useEffect(() => {
    updateTable();
  }, [update]);

  const updateTable = async () => {
    const response = await getEmployees(token);
    const transformedData = transformData(response);
    setRows(transformedData);
    console.log(transformedData)
  }

  return (
    <div>
      <DataTable columns={columns} rows={rows} />
    </div>
  )
}