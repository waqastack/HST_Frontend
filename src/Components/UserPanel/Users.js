import React, { useEffect, useState } from "react";
import { grey } from "@material-ui/core/colors";
import logo from "../../images/logo.png";
import {
  HelpOutline,
  LockOutlined,
  AddOutlined,
  MailOutline,
  VisibilityOff, Menu,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { BeatLoader, ClipLoader } from "react-spinners";
import axios from "axios";
import {url} from "../../Api/ApiRoutes"
import {
  IconButton,
  Box,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Container,
  Typography,
  Divider,
  Dialog,
  Button,
  Input,
  DialogContentText,
  DialogTitle,
  makeStyles,
  AppBar,
  Toolbar,
 
} from "@material-ui/core";
import { Edit, Delete, Close } from "@material-ui/icons";
import toast, { Toaster } from "react-hot-toast";
import DrawerData from "../DrawerData/DrawerData";
// import AddHotelManager from "../AddHotelManger/AddHotelManager";
const useStyles = makeStyles((theme) => ({
  root: {},
  // menuButton: {
  //   marginRight: theme.spacing(2),
  // },
  title: {
    marginRight: "auto",
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
}));

const Users = () => {
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    getData();
  }, []);
  const [state, setstate] = useState([]);
  const [stateS, setstateS] = useState([]);
  const [loadingS, setloadingS] = useState(false);
  const [opentwo, setOpentwo] = useState(false);
  const [openthree, setOpenthree] = useState(false);
  // this is for add hotel manager
  const [openfour, setopenfour] = useState(false);
  const [id, setid] = useState();
  const [update, setupdate] = useState();
  const [emailpattern, setemailpattern] = useState(true);
const [opendrawer,setopendrawer] = useState(false);
const [opendrawertwo,setopendrawertwo] = useState(false);
  // add a new user
  async function userSignsUp(e) {
    e.preventDefault();
    try {
      setloadingS(true);
      // if (stateS.email === undefined) {
      //   toast.error("Don't left any field empty");
      // }

      const { data } = await axios.post(
        `${url}/user/signup`,
        stateS
      );
      console.log(data);
      setloadingS(false);
      //here is the error to check whether response data is coming
      //handle this one
      //  setdupUser(data.driver)
      if (data.passerr) {
        toast.error("Password and confirm password must be same");
      }
      if (data.code) {
        toast.error("User already exists try different one");
      }
      if (data.name === "ValidationError") {
        setemailpattern(false);
        toast.error("Put a valid email");
      }
      if (!data.errors && !data.passerr && !data.code) {
        localStorage.setItem("user", data);
        setloadingS(false);
        toast.success("New user Added");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setloadingS(false);
      toast.error("All fields are mandatory to fill");
    }
  }
  // getall data
  const [loadingtable, setloadingtable] = useState(null)
  //notice that data which is coming from the backend is always inside an object
  //show full list data get
  const getData = async () => {
    setloadingtable(true)
    const { data } = await axios.get(`${url}/user/getData`);
    setstate(data.data);
    setloadingtable(false)
  };
  //   array of an object
  function handleCloseTwo() {
    setOpentwo(false);
  }
  async function edit(id) {
    setOpentwo(true);
    setid(id);
    const { data } = await axios.get(
      `${url}/user/findSingleUser/${id}`
    );
    // console.log(data.data);
    const totalData = data.data;
    setupdate(totalData);
  }
  // UPDATE User
  async function updateUser() {
    setloadingS(true);
    if(stateS.password===undefined){
      toast.error("This data already exists! Do some changes!")
    }
    if(stateS.password!==stateS.cpassword){
      toast.error("Password and Confirm password did not macthed!")
    }
   
    const { data } = await axios.put(
      `${url}/user/udpateUser/${id}`,
      stateS
    );
    const userConfirmed = data.data.email;
    setloadingS(false);
    if (userConfirmed && stateS.password!==undefined && stateS.password===stateS.cpassword) {
      toast.success("User updated succeed");
      setloadingS(false);
      window.location.reload();
    }
  }

  //DELETE USER
  async function delet(id) {
    const { data } = await axios.delete(
      `${url}/user/deleteUser/${id}`
    );
    console.log(data.success);
    if (data.success) {
      toast.success("User deleted");
      localStorage.removeItem("user");
      window.location.reload();
    }
  }
  return (
    <div>
      <Toaster />
<DrawerData opendrawer={opendrawer} setopendrawer={setopendrawer}/>
   {/* add the hotel manager */}
{/* <AddHotelManager openfour={openfour} setopenfour={setopenfour}/> */}
    {/* navbar */}
      <AppBar position="static" color="inherit" >
        <Toolbar>
        {/* menu icon button */}
  <IconButton  onClick={()=>setopendrawer(true)}>
     <Menu style={{color:"rgb(254,170,2)"}}/>
         </IconButton> 
         {/* logo */}
          <Button
            style={{ width: "10%" }}
            size="small"
            onClick={() => history.push("/")}
            className={classes.title}
          >
            <Typography
              variant="h6"
              color="secondary"
              style={{ color: "hotpink" }}
              className={classes.titleTwo}
            >
          <img width="80px" src={logo} alt="" />
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      {/* Add new user by admin dialgue */}
      <Dialog
        onClose={() => setOpenthree(false)}
        aria-labelledby="simple-dialog-title"
        open={openthree}
      >
        <Toaster />
        <DialogTitle>
          <Grid container>
            <Grid item>
              <Typography
                variant="h4"
                color="primary"
                style={{ textAlign: "left" }}
              >
                Register
              </Typography>
              <Box style={{ marginLeft: "300px", marginTop: "-35px" }}>
                <IconButton
                  style={{ padding: "0px" }}
                  onClick={() =>  setOpenthree(false)}
                >
                  <Close />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContentText>
          <Divider />
          <Container>
            <Box mt={1} textAlign="center">
              
              <br />
              <Input
                fullWidth
                onChange={(e) =>
                  setstateS({ ...stateS, email: e.target.value })
                }
                endAdornment={
                  <MailOutline color="primary" fontSize="small" />
                }
                type="email"
                placeholder="Enter Email"
                style={{ marginBottom: "10px" }}
                required="true"
              />
              <br />
              <Input
                fullWidth
                onChange={(e) =>
                  setstateS({ ...stateS, password: e.target.value })
                }
                endAdornment={
                  <VisibilityOff color="primary" fontSize="small" />
                }
                type="password"
                placeholder="Enter Password"
                style={{ marginBottom: "10px" }}
                required="true"
              />
              <br />
              <Input
                fullWidth
                onChange={(e) =>
                  setstateS({ ...stateS, cpassword: e.target.value })
                }
                endAdornment={
                  <VisibilityOff color="primary" fontSize="small" />
                }
                type="password"
                placeholder="Confirm Password"
              />

              <br />
              <br />
              {loadingS ? (
                <Button
                  fullWidth
                  style={{
                    marginBottom: "10px",
                    backgroundColor: "rgb(254,181,2)",
                    color: "black",
                  }}
                  color="primary"
                 startIcon={<ClipLoader size="10" color="black"/>}
                >
                  Adding...
                </Button>
              ) : (
                <Button
                  fullWidth
                  style={{
                    marginBottom: "10px",
                    backgroundColor: "rgb(254,181,2)",
                    color: "black",
                  }}
                  color="primary"
                  onClick={userSignsUp}
                >
                 Add User
                </Button>
              )}
            </Box>
          </Container>
        </DialogContentText>
      </Dialog>
      
       
      {/* update a user dialouge */}
      <Dialog
        onClose={handleCloseTwo}
        aria-labelledby="simple-dialog-title"
        open={opentwo}
      >
        <Toaster />
        <DialogTitle>
          <Grid container>
            <Grid item>
              <Typography
                variant="h4"
                color="primary"
                style={{ textAlign: "left" }}
              >
                Register
              </Typography>
              <Box style={{ marginLeft: "300px", marginTop: "-35px" }}>
                <IconButton
                  style={{ padding: "0px" }}
                  onClick={() => setOpentwo(false)}
                >
                  <Close />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContentText>
          <Divider />

          <Container>
            <Box mt={1} textAlign="center">
              
              <br />

              {update === undefined ? (
                <ClipLoader />
              ) : (
                <>
                  <Input
                    onChange={(e) =>
                      setstateS({ ...stateS, email: e.target.value })
                    }
                    type="email"
                    placeholder="Update User Email"
                    style={{ marginBottom: "10px" }}
                    defaultValue={update.email}
                    required="true"
                  />
                  <br />
                  <Input
                    onChange={(e) =>
                      setstateS({ ...stateS, password: e.target.value })
                    }
                    type="password"
                    placeholder="Update Password"
                    style={{ marginBottom: "10px" }}
                    defaultValue={update.password}
                    required="true"
                  />
                  <br />
                  <Input
                    onChange={(e) =>
                      setstateS({ ...stateS, cpassword: e.target.value })
                    }
                    defaultValue={update.cpassword}
                    type="password"
                    placeholder="Update Confirm Password"
                  />
                </>
              )}

              <br />
              <br />
              {loadingS ? (
                <Button
                  fullWidth
                  style={{
                    marginBottom: "10px",
                    backgroundColor: "rgb(254,181,2)",
                    color: "black",
                  }}
                  color="primary"
                 startIcon={<ClipLoader size="10" color="black"/>}
                >
                  Adding...
                </Button>
              ) : (
                <Button
                  fullWidth
                  style={{
                    marginBottom: "10px",
                    backgroundColor: "rgb(254,181,2)",
                    color: "black",
                  }}
                  color="primary"
                  onClick={updateUser}
                >
                 Add User
                </Button>
              )}
            </Box>
          </Container>
        </DialogContentText>
      </Dialog>
    <Container>
    <Grid container component={Box} ml={1} mt={3} textAlign="center">
       {/* colomn1 */}
       <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
    <Typography variant="h4" style={{color:"rgb(254,170,2)"}} component={Box}>
      User Panel
    </Typography>
    </Grid>
    {/* colomn2 */}
    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
    <Button
      style={{ height: "37px",fontSize:"10px",color:"black" ,marginLeft:"60px",background:"rgb(254,170,2)"}}
      onClick={() => setOpenthree(true)}
      size="small"
      variant="contained"
    >
      <AddOutlined fontSize="small" 
        onClose={() => setOpenthree(true)}
      />
      Add new user
    </Button>
    </Grid>
    
    
 
  <Divider />
     
     </Grid>
    </Container>
      <Container style={{ width: "70%" }} maxWidth="md">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead style={{background:grey[900]}}>
              <TableRow >
                <TableCell style={{ fontWeight: "bolder" ,color:"whitesmoke"}}>ID</TableCell>
                <TableCell style={{ fontWeight: "bolder",color:"whitesmoke" }} align="center">
                  Email
                </TableCell>
                <TableCell style={{ fontWeight: "bolder",color:"whitesmoke" }} align="center">
                  Password
                </TableCell>
                <TableCell style={{ fontWeight: "bolder",color:"whitesmoke" }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadingtable?<Box ml={40}><BeatLoader size="15" color="rgb(254,170,2)"/></Box>:
                state.map((row) => (
                <TableRow>
                  <TableCell>{row._id}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.password}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => edit(row._id)}>
                      <Edit color="primary" />
                    </IconButton>
                    <IconButton onClick={() => delet(row._id)}>
                      <Delete color="secondary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default Users;
