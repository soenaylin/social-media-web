import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";

import { useApp } from "../ThemedApp";
import { Avatar, Typography } from "@mui/material";
import { grey, indigo, pink, blue } from "@mui/material/colors";

import {
  Home as HomeIcon,
  Person as ProfileIcon,
  PersonAdd as RegisterIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

export default function AppDrawer() {
  const { drawer, setDrawer, auth, setAuth } = useApp();
  {console.log(auth)}
  const navigate = useNavigate();

  const images = import.meta.env.VITE_IMAGES_URL;

  const DrawerList = (
    <Box sx={{ width: 300 }} onClick={() => setDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <Divider />

        {auth && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate(`/profile/${auth._id}`)}>
                <ListItemIcon>
                  <ProfileIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setAuth(false);
                  localStorage.removeItem("token");
                }}
              >
                <ListItemIcon>
                  <LogoutIcon color="error" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        )}

        {!auth && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/register")}>
                <ListItemIcon>
                  <RegisterIcon />
                </ListItemIcon>
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/login")}>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer open={drawer} onClose={() => setDrawer(false)}>
        <Box
          sx={{
            height: 160,
            background: grey[500],
            position: "relative",
            mb: 8,
          }}
        >
          {auth && (
            <Box
              sx={{
                position: "absolute",
                bottom: -35,
                left: 20,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Avatar
                src={`${images}/${auth.photo}`}
                sx={{ width: 100, height: 100, background: pink[500] }}
              >
                {auth.name[0]}
              </Avatar>
              <Typography>{auth.name}</Typography>
            </Box>
          )}
        </Box>

        {DrawerList}
      </Drawer>
    </div>
  );
}
