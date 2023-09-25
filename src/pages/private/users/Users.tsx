import { Button, Typography } from "@mui/material"
import {DataTable} from "../../../components/dataTable/DataTable"
import "./users.scss"
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { DeleteRounded, EditRounded, PersonAdd, RestorePageRounded } from "@mui/icons-material";
import { AddUser } from "./components/AddUser";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },

  {
      field: 'username',
      headerName: 'Usuario',
      width: 150,
      editable: true,
  },
  {
      field: 'name',
      headerName: 'Nombre',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
          `${params.row.username || ''} ${params.row.name || ''}`,
  },
  {
      field: 'dni',
      headerName: 'Dni',
      type: 'number',
      width: 110,
      editable: true,
  },
  {
      field: 'rol',
      headerName: 'Cargo',
      width: 150,
  },
  {
      field: 'status',
      headerName: 'Activo',
      width: 100,
      type: 'boolean',
      editable: false,
      
  },
  { field: 'actions', headerName: 'Acción', width: 100, sortable: false, renderCell: (params) => {
      return (
          <div className="actions">
              <button className="edit"><EditRounded /></button>
              <button className="delete">{params.row.status ? <DeleteRounded /> : <RestorePageRounded />}</button>
          </div>
      )
  }
  },
  
];

const rows = [
  { id: 1, name: 'Snow', username: 'Jon', dni: 23534243,rol:'Administrador', status: true },
  { id: 2, name: 'Lannister', username: 'Cersei', dni: 24222345,rol:'Usuario', status: true },
  { id: 3, name: 'Lannister', username: 'Jaime', dni: 45661133,rol:'Usuario', status: true},
  { id: 4, name: 'Stark', username: 'Arya',rol:'Usuario', dni: 21667668, status: true },
  { id: 5, name: 'Targaryen', username: 'Daenerys',rol:'Usuario', dni: 48848923 },
  { id: 6, name: 'Melisandre', username: 'Arnold',rol:'Administrador', dni: 41500968 },
  { id: 7, name: 'Clifford', username: 'Ferrara',rol:'Usuario', dni: 54487237 },
  { id: 8, name: 'Frances', username: 'Rossini',rol:'Usuario', dni: 23532566 },
  { id: 9, name: 'Roxie', username: 'Harvey',rol:'Usuario', dni: 36986285 },
];

export const  Users = () => {
  
  const { ModalUser, handlerOpen } = AddUser()

  return (
    <div className="users">
      <div className="info">
        <Typography variant="h4">Usuarios</Typography>
        <Button onClick={() => handlerOpen(true)} variant="text" size="small" color="primary" startIcon={<PersonAdd />}>Nuevo usuario</Button>
      </div>
      <ModalUser />
      <DataTable columns={columns} rows={rows}/>
    </div>
    
  )
}
