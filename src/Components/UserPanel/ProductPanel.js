import React, { useEffect, useState } from "react";
import Filebase from "react-file-base64";
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
  DialogContent,
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

const ProductPanel = () => {
  const classes = useStyles();
  const history = useHistory();
  const [loadingtable, setloadingtable] = useState(null)
  useEffect(() => {
    getData();
  }, []);
  var min = 0;
  const [state, setstate] = useState([]);
  const [stateS, setstateS] = useState([]);
  const [loadingS, setloadingS] = useState(false);
  const [opentwo, setOpentwo] = useState(false);
  const [openthree, setOpenthree] = useState(false);
  const [id, setid] = useState();
  const [update, setupdate] = useState();
  const [editload, seteditload] = useState(null);
  const [opendrawer,setopendrawer] = useState(false);
 
  // add a new user
  async function addProduct(e) {
    e.preventDefault();
    try {
      setloadingS(true);
      // if (stateS.email === undefined) {
      //   toast.error("Don't left any field empty");
      // }

      const { data } = await axios.post(
        `${url}/user/addProduct`,
        stateS
      );
      console.log(data);
      setloadingS(false);
      //here is the error to check whether response data is coming
      //handle this one
      //  setdupUser(data.driver)
     
      if (data.name === "ValidationError") {
        toast.error("Put a valid email");
      }
      if (!data.errors) {
        // localStorage.setItem("user", data);
        setloadingS(false);
        toast.success("New Product Added");
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
    const { data } = await axios.get(`${url}/user/getAllTheProduct`);
    setstate(data.data);
    setloadingtable(false)
  };
  //   array of an object
  function handleCloseTwo() {
    setOpentwo(false);
  }
  async function edit(id) {
    seteditload(true)
    setOpentwo(true);
    setid(id);
    const { data } = await axios.get(
      `${url}/user/findSingleProduct/${id}`
    );
    setupdate(data.data);
    seteditload(false)
  }
  // UPDATE User
  async function updateProduct() {
    setloadingS(true);
    if(stateS.title===undefined && stateS.price===undefined){
      toast.error("You must update all details!")
    }
  
   
    const { data } = await axios.put(
      `${url}/user/udpateProduct/${id}`,
      stateS
    );
    const userConfirmed = data.data.title;
    setloadingS(false);
    if (userConfirmed ) {
      toast.success("User updated succeed");
      setloadingS(false);
      window.location.reload();
    }
  }

  //DELETE product
  async function delet(id) {
    const { data } = await axios.delete(
      `${url}/user/deleteProduct/${id}`
    );
    console.log(data.success);
    if (data.success) {
      toast.success("You delete the Product");
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
                Add Product
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
                  setstateS({ ...stateS, price: e.target.value })
                }
                endAdornment={
                  <MonetizationOn color="primary" fontSize="small" />
                }
                type="text"
                placeholder="Enter price"
                style={{ marginBottom: "10px" }}
               
              />
              <br />
              <Typography variant="body1" color="initial">Input Your Quantity:</Typography>
              <input
                  min={min}
                  type="number"
                  onChange={(e) =>
                  setstateS({ ...stateS, qty: e.target.value })
                }

              />
              <br/>
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
             Product Image: 
              <Filebase type="file" multiple={false}
              onDone={({ base64 }) => setstateS({ ...stateS, selectedFile: base64 })} />
              <br />
               
              <Input
                fullWidth
                onChange={(e) =>
                  setstateS({ ...stateS,view: e.target.value })
                }
                endAdornment={
                  <Description color="primary" fontSize="small" />
                }
                type="text"
                placeholder="Enter image link for 360 view"
                style={{ marginBottom: "10px",marginTop:"9px" }}
               
              />
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
                 Add Product
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
                Update Product
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
        <DialogContent>
          <Divider />

          <Container>
            <Box mt={1} textAlign="center">
              <br />

              {update === undefined ? (
                <ClipLoader />
              ) : (
                <>
                  {
                    editload?<p>...</p>:
                    <div>
                    <Input
                    onChange={(e) =>
                      setstateS({ ...stateS, title: e.target.value })
                    }
                    type="text"
                    placeholder="Update Product Title"
                    style={{ marginBottom: "10px" }}
                    defaultValue={update.title===""?<ClipLoader size="5"/>:update.title}
                  />
                  <br />
                  <Input
                    onChange={(e) =>
                      setstateS({ ...stateS, price: e.target.value })
                    }
                    type="text"
                    placeholder="Update Prodcut Price"
                    style={{ marginBottom: "10px" }}
                    defaultValue={update.price===""?<ClipLoader size="5"/>:update.price}
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
                  
                   <Filebase type="file" multiple={false}
                   onDone={({ base64 }) => setstateS({ ...stateS, selectedFile: base64 })} />
                   <img src={update.selectedFile} width="50px" height="50px" style={{borderRadius:"20px",marginLeft:"-120px"}} alt=""/>
                <br />
                <Input
                    onChange={(e) =>
                      setstateS({ view: e.target.value })
                    }
                    type="text"
                    placeholder="Enter image link for 360 view"
                    style={{ marginBottom: "10px" }}
                    defaultValue={update.description===""?<ClipLoader size="5"/>:update.view}
                  />
                  </div>
                  }
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
                    borderRadius:"0px"
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
                    borderRadius:"0px"
                  }}
                  color="primary"
                  onClick={updateProduct}
                >
                 Update Product
                </Button>
              )}
            </Box>
          </Container>
        </DialogContent>
      </Dialog>
    <Container>
    <Grid container component={Box} ml={1} mt={3} textAlign="center">
       {/* colomn1 */}
       <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
    <Typography variant="h4" style={{color:"rgb(254,170,2)"}} component={Box}>
      Product Panel
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
      Add new Product
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
                <TableCell style={{ fontWeight: "bolder" ,color:"whitesmoke"}}>ProductID</TableCell>
                <TableCell style={{ fontWeight: "bolder",color:"whitesmoke" }} align="center">
                  Image
                </TableCell>
                <TableCell style={{ fontWeight: "bolder",color:"whitesmoke" }} align="center">
                  Title
                </TableCell>
                <TableCell style={{ fontWeight: "bolder",color:"whitesmoke" }} align="center">
                  Price
                </TableCell>
                <TableCell style={{ fontWeight: "bolder",color:"whitesmoke" }} align="center">
                  Qty
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
                  <TableCell align="center"><img src={row.selectedFile}
                  style={{borderRadius:"100px"}}
                   alt="" width="70px" height="70px"/></TableCell>
                  <TableCell align="center">{row.title}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">{row.qty}</TableCell>
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

export default ProductPanel;
