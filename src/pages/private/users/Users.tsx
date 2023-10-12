import { Button, Typography } from "@mui/material"
import "./users.scss"
import { PersonAdd } from "@mui/icons-material";
import { AddUser } from "./components/AddUser";
import { DataTableUsers } from "./components/DataTableUsers";
import { useState } from "react";

export const Users = () => {

  const { ModalUser, handlerOpen } = AddUser()
  const [update, setUpdate]   = useState(false);

  const updateUsers = () => { 
    setUpdate(!update)
  }
  
  
  
  return (
    <div className="users">
      <div className="info">
        <Typography variant="h4">Usuarios</Typography>
        <Button onClick={() => handlerOpen(true)} variant="text" size="small" color="primary" startIcon={<PersonAdd />}>Nuevo usuario</Button>
      </div>
      <ModalUser updateUsers={updateUsers}/ >
      <DataTableUsers update={update}/>
      
    </div>

  )
}
