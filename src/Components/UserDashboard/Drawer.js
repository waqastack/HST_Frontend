import React from "react";
import {useHistory} from "react-router-dom"
import logo from "../../images/logo.png";
import {
  Home,
  CloseOutlined,
  LocalMall,
  MarkunreadMailbox,
  PhoneInTalk,
  Group,
  Dashboard,
  
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
const Drawer = ({ opendrawer, setopendrawer }) => {
  const history = useHistory();
  return (
    <div>
      <SwipeableDrawer
        open={opendrawer}
        onClose={() => setopendrawer(false)}
        anchor="left"
      >
        <List  style={{width:"270px"}} >
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
          {/* Dashboard */}
          <ListItem button>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          {/* Profile*/}
          <ListItem button >
            <ListItemIcon>
            <Group fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          {/* My Order */}
          <ListItem button >
            <ListItemIcon>
              <LocalMall />
            </ListItemIcon>
            <ListItemText primary="My Order" />
          </ListItem>
          {/* Price Calculator */}
          <ListItem button > 
            <ListItemIcon>
              <MarkunreadMailbox />
            </ListItemIcon>
            <ListItemText primary="Price Calculator" />
          </ListItem>
          
        </List>
      </SwipeableDrawer>
    </div>
  );
};

export default Drawer;
