import React, { useEffect, useState } from "react";
 import {  grey } from "@material-ui/core/colors";
import logo from "../../images/logo.png";
import {
  AddOutlined,
  Menu, Create, MonetizationOn, Description,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { BeatLoader, ClipLoader} from "react-spinners";
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

const AdminServices = () => {
  const classes = useStyles();
  const history = useHistory();
  const [loadingtable, setloadingtable] = useState(null)
  useEffect(() => {
    getData();
  }, []);
  const [state, setstate] = useState([]);
  const [stateS, setstateS] = useState([]);
  const [loadingS, setloadingS] = useState(false);
  const [opentwo, setOpentwo] = useState(false);
  const [openthree, setOpenthree] = useState(false);
  const [id, setid] = useState();
  const [update, setupdate] = useState();
const [opendrawer,setopendrawer] = useState(false);
  // add a new user
  async function addProduct(e) {
    e.preventDefault();
    try {
      setloadingS(true);
    

      const { data } = await axios.post(
        `${url}/user/addservice`,
        stateS
      );
      console.log(data);
      setloadingS(false);
      //here is the error to check whether response data is coming
      //handle this one
      //  setdupUser(data.driver)
     
      if (data.name === "ValidationError") {
        toast.error("Put a valid details");
      }
      if (!data.errors) {
        // localStorage.setItem("user", data);
        setloadingS(false);
        toast.success("New Service Added");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setloadingS(false);
      toast.error("All fields are mandatory to fill");
    }
  }
  // getall data
  //notice that data which is coming from the backend is always inside an object
  //show full list data get
  const getData = async () => {
    setloadingtable(true)
    const { data } = await axios.get(`${url}/user/getServices`);
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
      `${url}/user/findSingleservice/${id}`
    );
    setupdate(data.data);
  }
  // UPDATE User
  async function updateProduct() {
    setloadingS(true);
   
    const { data } = await axios.put(
      `${url}/user/udpateservice/${id}`,
      stateS
    );
    const userConfirmed = data.data.title;
    setloadingS(false);
    if (userConfirmed ) {
      toast.success("Service updated succeed");
      setloadingS(false);
      window.location.reload();
    }
  }

  //DELETE USER
  async function delet(id) {
    const { data } = await axios.delete(
      `${url}/user/deleteservice/${id}`
    );
    console.log(data.success);
    if (data.success) {
      toast.success("You delete the Service");
    //   localStorage.removeItem("user");
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
      {/* Add new product by admin dialgue */}
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
                Add Service
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
                  setstateS({ ...stateS, title: e.target.value })
                }
                endAdornment={
                  <Create color="primary" fontSize="small" />
                }
                type="text"
                placeholder="Enter Title"
                style={{ marginBottom: "10px" }}
                
              />
              <br />
              
              <Input
                fullWidth
                onChange={(e) =>
                  setstateS({ ...stateS, description: e.target.value })
                }
                endAdornment={
                  <Description color="primary" fontSize="small" />
                }
                type="text"
                placeholder="Enter description"
                style={{ marginBottom: "10px" }}
               
              />
              <br />
              <Input
                fullWidth
                onChange={(e) =>
                  setstateS({ ...stateS, price: e.target.value })
                }
                endAdornment={
                  <Description color="primary" fontSize="small" />
                }
                type="text"
                placeholder="Enter Price"
                style={{ marginBottom: "10px" }}
               
              />
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
                  onClick={addProduct}
                >
                 Add service
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
                Update Service
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
                      setstateS({ ...stateS, title: e.target.value })
                    }
                    type="text"
                    placeholder="Update Service Title"
                    style={{ marginBottom: "10px" }}
                    defaultValue={update.title===""?<ClipLoader size="5"/>:update.title}
                  />
                  <br />
                  <Input
                    onChange={(e) =>
                      setstateS({ ...stateS, price: e.target.value })
                    }
                    type="text"
                    placeholder="Update Service Price"
                    style={{ marginBottom: "10px" }}
                    defaultValue={update.title===""?<ClipLoader size="5"/>:update.price}
                  />
                  <br />
                  
                  <Input
                    onChange={(e) =>
                      setstateS({ description: e.target.value })
                    }
                    type="text"
                    placeholder="Update Prodcut description"
                    style={{ marginBottom: "10px" }}
                    defaultValue={update.description===""?<ClipLoader size="5"/>:update.description}
                  />
                   
                </>
              )}

              <br />
              <br />
              {loadingS ? (
                <Button
                  
                  style={{
                    marginBottom: "10px",
                    backgroundColor: "rgb(254,181,2)",
                    color: "black",
                  }}
                  color="primary"
                 startIcon={<ClipLoader size="10" color="black"/>}
                >
                  Updating...
                </Button>
              ) : (
                <Button
                  
                  style={{
                    marginBottom: "10px",
                    backgroundColor: "rgb(254,181,2)",
                    color: "black",
                  }}
                  color="primary"
                  onClick={updateProduct}
                >
                 Update Service
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
      Service Panel
    </Typography>
    </Grid>
    {/* colomn2 */}
    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
    <Button
      style={{ height: "37px",fontSize:"10px" ,marginLeft:"60px", color:"black",background:"rgb(254,170,2)"}}
      onClick={() => setOpenthree(true)}
      size="small"
      variant="contained"
    >
      <AddOutlined fontSize="small" 
        onClose={() => setOpenthree(true)}
      />
      Add new Service
    </Button>
    </Grid>
    
    
 
  <Divider />
     
     </Grid>
    </Container>
      <Container style={{ width: "80%" }} maxWidth="md">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead style={{background:grey[900]}}>
              <TableRow >
                <TableCell style={{ fontWeight: "bolder" ,color:"whitesmoke"}}>ServiceID</TableCell>
               
                <TableCell style={{ fontWeight: "bolder",color:"whitesmoke" }} align="center">
                  Title
                </TableCell>
                <TableCell style={{ fontWeight: "bolder",color:"whitesmoke" }} align="center">
                  Price
                </TableCell>
                <TableCell style={{ fontWeight: "bolder",color:"whitesmoke" }} align="center">
                  Description
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
                  <TableCell align="center">{row.title}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">{row.description}</TableCell>
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

export default AdminServices;
