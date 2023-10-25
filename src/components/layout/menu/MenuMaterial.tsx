import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { useSelector } from 'react-redux'
import { menuMaterial, menuMaterialUser } from "../../../data";
import { AppStore } from "../../../redux/store";
import { Link } from "react-router-dom";

export const MenuMaterial = () => {

  const switchMenu = () => {
    const userState = useSelector((store: AppStore) => store.user);
    return userState.Charge === "admin" ? menuMaterial : menuMaterialUser
  }
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "flex" }}}>
      <Box position="fixed">
        <List>
          {switchMenu().map(item =>
            <>
              <Typography variant="overline">{item.title}</Typography>
              {item.listItems.map(listItem => (
                <ListItem disablePadding>
                  <ListItemButton component={Link} to={listItem.url} key={listItem.title}>
                    <ListItemIcon>
                      {/* <img src={listItem.icon} alt={listItem.title} /> */}
                    </ListItemIcon>
                    <ListItemText primary={listItem.title.toUpperCase()} />
                  </ListItemButton>
                </ListItem>
              ))}
            </>

          )}
        </List>
      </Box>
    </Box>
  )
}