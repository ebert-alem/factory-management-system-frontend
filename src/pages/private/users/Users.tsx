import { Box, Button, Typography } from "@mui/material"
import "./users.scss"
import { AddCircle, AddCircleOutlineRounded, PersonAdd } from "@mui/icons-material";
import { AddUser } from "./components/AddUser";
import { DataTableUsers } from "./components/DataTableUsers";
import { useState } from "react";

export const Users = () => {

  const { ModalUser, handlerOpen } = AddUser()
  const [update, setUpdate] = useState(false);

  const updateUsers = () => {
    setUpdate(!update)
  }



  return (
    <div className="users">
      <div className="info">
        <Typography variant="h4">Usuarios</Typography>
        <Button onClick={() => handlerOpen(true)} variant="text" size="large" color="primary" startIcon={<AddCircle />}>
          <Typography variant="body1" sx={{ display: { xs: "none", sm: "flex" } }}>Nuevo usuario</Typography>
        </Button>
      </div>
      <ModalUser updateUsers={updateUsers} />
      <DataTableUsers update={update} />
    </div>

  )
}
