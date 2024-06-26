import React from "react";
import { useHistory } from "react-router-dom";
import logo from "../../images/logo.png";
import {
  Home,
  CloseOutlined,
  LocalMall,
  MarkunreadMailbox,
  PhoneInTalk,
  Group,
  LocalConvenienceStore,
  AssignmentTurnedIn,
  ImageSearch,
  ExitToApp,
} from "@material-ui/icons";
import {
  Box,
  Divider,
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
const DrawerData = ({ opendrawer, setopendrawer }) => {
  const logout = () => {
    localStorage.removeItem("admin");
    window.location.reload();
  };
  const history = useHistory();
  return (
    <div>
      <SwipeableDrawer
        open={opendrawer}
        onClose={() => setopendrawer(false)}
        anchor="left"
      >
        <List style={{ width: "270px" }}>
          {/* logo */}
          <ListItem button>
            <img src={logo} width="100px" height="60px" alt="" />
            <IconButton
              style={{ marginLeft: "auto" }}
              onClick={() => setopendrawer(false)}
            >
              <CloseOutlined />
            </IconButton>
          </ListItem>
          <Divider />
          {/* Home */}
          <ListItem button>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          {/* Add new user*/}
          <ListItem button onClick={() => history.push("/admin/users")}>
            <ListItemIcon>
              <Group fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          {/* Products */}
          <ListItem button onClick={() => history.push("/admin/products")}>
            <ListItemIcon>
              <LocalMall />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
          {/* Blog */}
          <ListItem button onClick={() => history.push("/admin/services")}>
            <ListItemIcon>
              <MarkunreadMailbox />
            </ListItemIcon>
            <ListItemText primary="Services" />
          </ListItem>
          {/* Contact */}
          <ListItem button>
            <ListItemIcon>
              <PhoneInTalk />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
          {/* Price calcultor */}
          <ListItem
            button
            onClick={() => history.push("/admin/priceCalculator")}
          >
            <ListItemIcon>
              <LocalConvenienceStore />
            </ListItemIcon>
            <ListItemText primary="Price Calculator" />
          </ListItem>
          {/* Purchased orders */}
          <ListItem button onClick={() => history.push("/admin/purchased")}>
            <ListItemIcon>
              <AssignmentTurnedIn />
            </ListItemIcon>
            <ListItemText primary="Purchased Orders" />
          </ListItem>
          {/* image crud */}
          <ListItem button onClick={() => history.push("/admin/image")}>
            <ListItemIcon>
              <ImageSearch />
            </ListItemIcon>
            <ListItemText primary="Buildings" />
          </ListItem>
          {/* Logout */}
          <ListItem button onClick={logout}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </SwipeableDrawer>
    </div>
  );
};

export default DrawerData;
