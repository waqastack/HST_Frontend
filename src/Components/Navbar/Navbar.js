import React, { useEffect, useState } from "react";
import logo from "../../images/logo.png";
import { useHistory, NavLink } from "react-router-dom";
import { grey, yellow } from "@material-ui/core/colors";
import { Zoom } from "@material-ui/core";
import { ClipLoader } from "react-spinners";
import { Menu, PowerSettingsNew } from "@material-ui/icons";
import axios from "axios";
import { url } from "../../Api/ApiRoutes";
import Register from "../RegisterDialog/Register";
import {
  Close,
  ExpandMore,
  Home,
  PhoneIphone,
  Search,
  ShoppingCart,
  ContactSupport,
} from "@material-ui/icons";
import {
  AppBar,
  Badge,
  Tooltip,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  IconButton,
  Box,
  CssBaseline,
  Grid,
  OutlinedInput,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import DrawerData from "../DrawerData/DrawerData";
import LoginDialog from "../LoginDialog/LoginDialog";
// const realWidth = 205;
const useStyles = makeStyles((theme) => ({
  responsiveNav: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // marginRight: "auto",
    fontWeight: "bold",
  },
  titleTwo: {
    color: "white",
    fontStyle: "bold",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "90%",
    },
  },
  alignLeft: {
    textAlign: "left",
  },
  appBar: {
    marginBottom: "5px",
  },

  resposive: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  hover: {
    "&:hover": {
      background: grey[200],
    },
  },
  activeClass: {
    borderBottom: "1px solid white",
    borderRadius: "0px",
  },
  outlinedInput: {
    fontSize: "12px",
    width: "180px",
    height: "35px",
    background: "white",
  },
}));
//main component starts here
const Navbar = () => {
  const history = useHistory();
  const user = localStorage.getItem("user");
  const [open, setOpen] = useState(false);
  const [opentwo, setOpentwo] = useState(false);
  const [opendrawer, setopendrawer] = useState(false);
  const [search, setsearch] = useState(false);
  const [checked, setChecked] = React.useState(true);
  //accessing global state

  const [length, setlength] = useState([]);
  // const [state, setstate] = useState()

  useEffect(() => {
    getlenghtData();
  }, [length]);

  const getlenghtData = async () => {
    const email = { user };
    const { data } = await axios.get(`${url}/user/getallcartSingle/${user}`);
    if (data.data.length !== 0) {
      setlength(data.data[0].products);
    }
  };
  // here is the sign in functionality
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
// const verifyUser = async () =>{
// const {data} = await axios.get(`${url}/user/verifyUser/${user}`)
// console.log(data)

// }
  //logout
  function logout() {
    localStorage.removeItem("user");
    window.location.reload();
  }
  const classes = useStyles();
  //FOR dialgoue signup functionality starts here
  // const user = localStorage.getItem("user");
  useEffect(() => {}, [user]);
  const showAddedToCartItems = () => {
    history.push("/YourItems");
  };

  return (
    // here is our component that which is used without condition
    <div>
      {/*Start dialogue for sign in functionality */}
      <CssBaseline />
      {/* Register dialogue is here */}
      <Register setOpentwo={setOpentwo} opentwo={opentwo} />
      <LoginDialog
        setOpentwo={setOpentwo}
        opentwo={opentwo}
        setOpen={setOpen}
        open={open}
      />

      {/* End functionality for sign in dialouge */}

      {/* Here we have the drawere functionality */}
      <DrawerData opendrawer={opendrawer} setopendrawer={setopendrawer} />
      {/* first navbar */}
      <Grid container style={{ marginTop: "50px" }}>
        {/* logo */}
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Box mx="auto" to="/" component={NavLink}>
            {" "}
            <img
              style={{
                marginLeft: "50px",
                marginTop: "-30px",
                marginBottom: "10px",
              }}
              src={logo}
              width="100px"
              height="60px"
              alt=""
            />
          </Box>
        </Grid>
        {/* show menu icon when sreen size is small */}
        <Box
          //  box dislplay:Box also works for showing the breaks points also:"inline/block>>sameline/newline" property we have to tell all the breakpoints
          display={{
            xs: "inline",
            sm: "inline",
            md: "none",
            lg: "none",
            xl: "none",
          }}
          ml="auto"
          mt="-30px"
        >
          <IconButton onClick={() => setopendrawer(true)}>
            <Menu />
          </IconButton>
        </Box>

        {/* Phone */}
        <Grid
          item
          xs={3}
          sm={3}
          md={3}
          lg={3}
          xl={3}
          className={classes.responsiveNav}
        >
          <Box display="flex">
            <PhoneIphone style={{ color: "rgb(254,181,2)" }} />
            <Typography
              style={{ fontWeight: "bold", marginLeft: "10px" }}
              variant="body2"
              color="initial"
            >
              Phone
            </Typography>
          </Box>
          <Typography
            style={{ marginLeft: "34px", fontWeight: "lighter" }}
            variant="body2"
            color="initial"
          >
            +92 306 5880145
          </Typography>
        </Grid>

        {/* Address */}
        <Grid
          item
          xs={3}
          sm={3}
          md={3}
          lg={3}
          xl={3}
          className={classes.responsiveNav}
        >
          <Box display="flex">
            <Home style={{ color: "rgb(254,181,2)" }} />
            <Typography
              style={{ fontWeight: "bold", marginLeft: "10px" }}
              variant="body2"
              color="initial"
            >
              Address
            </Typography>
          </Box>
          <Typography
            style={{ marginLeft: "34px", fontWeight: "lighter" }}
            variant="body2"
            color="initial"
          >
            Your Address goes here
          </Typography>
        </Grid>
      </Grid>
      {/* second navbar */}
      <AppBar
        position="static"
        color="inherit"
        style={{ backgroundColor: "rgb(254,181,2)", marginBottom: "5px" }}
        // className={classes.appBar}
        className={classes.responsiveNav}
      >
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Button
            style={{ fontSize: "10px" }}
            size="small"
            className={classes.title}
            exact
            activeClassName={classes.activeClass}
            to="/"
            component={NavLink}
          >
            Home
          </Button>
          <Button
            type="submit"
            style={{ fontSize: "10px" }}
            size="small"
            className={classes.title}
            activeClassName={classes.activeClass}
            exact
            to="/about us"
            component={NavLink}
          >
            About Us
          </Button>
          <Button
            style={{ fontSize: "10px" }}
            size="small"
            className={classes.title}
            activeClassName={classes.activeClass}
            to="/services"
            component={NavLink}
          >
            Services
          </Button>
          <Button
            style={{ fontSize: "10px" }}
            size="small"
            className={classes.title}
            activeClassName={classes.activeClass}
            to="/products"
            component={NavLink}
          >
            Products
          </Button>
          

          <>
            <Box style={{ marginLeft: "auto" }}>
              {!user ? (
                <>
                  {" "}
                  <Button
                    size="small"
                    onClick={() => setOpentwo(true)}
                    style={{ fontSize: "10px", fontWeight: "bold" }}
                  >
                    Register
                  </Button>
                  <Button
                    style={{
                      fontSize: "10px",
                      marginLeft: "-10px",
                      marginRight: "15px",
                      fontWeight: "bold",
                    }}
                    size="small"
                    onClick={() => setOpen(true)}
                  >
                    Sign in
                  </Button>
                </>
              ) : null}
              {/* <Tooltip title="Customer Support Service" arrow="top">
                <IconButton onClick={() => history.push("/help")}>
                  <ContactSupport
                    fontSize="large"
                    style={{ color: "rgb(0,7,44)" }}
                  />
                </IconButton>
              </Tooltip> */}
              {user ? (
                <Button
                  onClick={() => history.push("/userDashboard")}
                  style={{
                    backgroundColor: "rgb(0,7,44)",
                    color: "white",
                    fontSize: "10px",
                    marginRight: "15px",
                    borderRadius: "0px",
                    height: "35px",
                  }}
                  size="small"
                >
                  User Dashboard
                </Button>
              ) : null}

              <Button
                style={{
                  backgroundColor: "rgb(0,7,44)",
                  color: "white",
                  fontSize: "10px",
                  marginRight: "15px",
                  borderRadius: "0px",
                  height: "35px",
                }}
                size="small"
                onClick={() => history.push("/calculatePrice")}
              >
                Price Calculator
              </Button>

              {search ? (
                <Zoom in={checked} appear={true} onExit={{ padding: "100px" }}>
                  <OutlinedInput
                    autoComplete={false}
                    placeholder="Search Products.."
                    className={classes.outlinedInput}
                    startAdornment={
                      <IconButton
                        onClick={() => setsearch(false)}
                        size="small"
                        style={{ cursor: "pointer" }}
                      >
                        <Close color="secondary" style={{ fontSize: "15px" }} />
                      </IconButton>
                    }
                    endAdornment={
                      <IconButton size="small" style={{ cursor: "pointer" }}>
                        <Search fontSize="small" />
                      </IconButton>
                    }
                  />
                </Zoom>
              ) : (
                <IconButton
                  onMouseOver={() => setsearch(true)}
                  style={{ marginRight: "15px" }}
                  size="small"
                >
                  <Search style={{ color: "black" }} fontSize="small" />
                </IconButton>
              )}
              {user ? (
                <span>
                  <IconButton
                    size="small"
                    onClick={showAddedToCartItems}
                    aria-label="cart"
                  >
                    <Badge badgeContent={length.length} color="secondary">
                      <ShoppingCart
                        style={{ color: "black" }}
                      />
                    </Badge>
                  </IconButton>
                </span>
              ) : null}
              {user ? (
                <Button
                  size="small"
                  onClick={logout}
                  style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    marginLeft: "10px",
                  }}
                >
                  <PowerSettingsNew fontSize="small" /> &nbsp;Logout
                </Button>
              ) : null}
            </Box>
          </>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
