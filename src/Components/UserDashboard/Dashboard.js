import React, { useEffect, useState } from "react";
import Drawer from "./Drawer";
import Filebase from "react-file-base64";
import { grey } from "@material-ui/core/colors";
import logo from "../../images/logo.png";
import { Menu, Create, MonetizationOn, Description } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { BeatLoader, ClipLoader } from "react-spinners";
import Iframe from "react-iframe";
import axios from "axios";
import { url } from "../../Api/ApiRoutes";
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
  Badge,
} from "@material-ui/core";
import { Edit, Delete, Close } from "@material-ui/icons";
import toast, { Toaster } from "react-hot-toast";
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

const Dashboard = () => {
  const user = localStorage.getItem("user");
  const [opendrawer, setopendrawer] = useState(null);
  const classes = useStyles();
  const history = useHistory();
  const [loadingtable, setloadingtable] = useState(null);
  useEffect(() => {
    getData();
  }, [user]);
  var min = 0;
  const [state, setstate] = useState([]);
  const [stateS, setstateS] = useState([]);
  const [loadingS, setloadingS] = useState(false);
  const [opentwo, setOpentwo] = useState(false);
  const [openthree, setOpenthree] = useState(false);
  const [image, setimage] = useState("");
  const [showimage, setshowimage] = useState(false);
  // this is for add hotel manager
  const [id, setid] = useState();
  const [update, setupdate] = useState();
  //show image
  const showimg = (link) => {
    setimage(link);
    setshowimage(true);
  };

  // add a new user
  async function addProduct(e) {
    e.preventDefault();
    try {
      setloadingS(true);
      // if (stateS.email === undefined) {
      //   toast.error("Don't left any field empty");
      // }

      const { data } = await axios.post(`${url}/user/addProduct`, stateS);
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
    setloadingtable(true);
    const { data } = await axios.get(`${url}/user/orders/${user}`);
    setstate(
      data.data.filter(
        (thing, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.title === thing.title &&
              t.price === thing.price &&
              t.image === thing.image
          )
      )
    );

    setloadingtable(false);
  };

  //   array of an object
  function handleCloseTwo() {
    setOpentwo(false);
  }
  async function edit(id) {
    setOpentwo(true);
    setid(id);
    const { data } = await axios.get(`${url}/user/findSingleProduct/${id}`);
    setupdate(data.data);
  }
  // UPDATE User
  async function updateProduct() {
    setloadingS(true);
    if (stateS.title === undefined && stateS.price === undefined) {
      toast.error("You must update all details!");
    }

    const { data } = await axios.put(`${url}/user/udpateProduct/${id}`, stateS);
    const userConfirmed = data.data.title;
    setloadingS(false);
    if (userConfirmed) {
      toast.success("User updated succeed");
      setloadingS(false);
      window.location.reload();
    }
  }

  //DELETE product
  async function delet(id) {
    const { data } = await axios.delete(`${url}/user/deleteProduct/${id}`);
    console.log(data.success);
    if (data.success) {
      toast.success("You delete the Product");
      //   localStorage.removeItem("user");
      window.location.reload();
    }
  }
  return (
    <div>
      <Drawer opendrawer={opendrawer} setopendrawer={setopendrawer} />

      <Dialog open={showimage} onClose={() => setshowimage(false)}>
        {/* <IconButton onClick={()=>setshowimage(false)}>Close</IconButton> */}
        <Box textAlign="center" my={3}>
          <Iframe
            url={image}
            width="100%"
            height="370px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
          />
        </Box>
      </Dialog>
      <AppBar position="relative" style={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton onClick={() => setopendrawer(true)} fontSize="small">
            <Menu style={{ color: "rgb(254,170,2)" }} />
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
              style={{ color: "hotpink", marginLeft: "15px" }}
              className={classes.titleTwo}
            >
              <img width="80px" src={logo} alt="" />
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>

      <Toaster />

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
                  onClick={() => setOpenthree(false)}
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
                endAdornment={<Create color="primary" fontSize="small" />}
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
              <Typography variant="body1" color="initial">
                Input Your Quantity:
              </Typography>
              <input
                min={min}
                type="number"
                onChange={(e) => setstateS({ ...stateS, qty: e.target.value })}
              />
              <br />
              <Input
                fullWidth
                onChange={(e) =>
                  setstateS({ ...stateS, description: e.target.value })
                }
                endAdornment={<Description color="primary" fontSize="small" />}
                type="text"
                placeholder="Enter description"
                style={{ marginBottom: "10px" }}
              />
              <br />
              Product Image:
              <Filebase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setstateS({ ...stateS, selectedFile: base64 })
                }
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
                  startIcon={<ClipLoader size="10" color="black" />}
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
                    placeholder="Update Product Title"
                    style={{ marginBottom: "10px" }}
                    defaultValue={
                      update.title === "" ? (
                        <ClipLoader size="5" />
                      ) : (
                        update.title
                      )
                    }
                  />
                  <br />
                  <Input
                    onChange={(e) =>
                      setstateS({ ...stateS, price: e.target.value })
                    }
                    type="text"
                    placeholder="Update Prodcut Price"
                    style={{ marginBottom: "10px" }}
                    defaultValue={
                      update.price === "" ? (
                        <ClipLoader size="5" />
                      ) : (
                        update.price
                      )
                    }
                  />
                  <br />
                  <Input
                    onChange={(e) => setstateS({ description: e.target.value })}
                    type="text"
                    placeholder="Update Prodcut description"
                    style={{ marginBottom: "10px" }}
                    defaultValue={
                      update.description === "" ? (
                        <ClipLoader size="5" />
                      ) : (
                        update.description
                      )
                    }
                  />
                  <Filebase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setstateS({ ...stateS, selectedFile: base64 })
                    }
                  />
                  <img
                    src={update.selectedFile}
                    width="50px"
                    height="50px"
                    style={{ borderRadius: "20px", marginLeft: "-120px" }}
                    alt=""
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
                  startIcon={<ClipLoader size="10" color="black" />}
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
                  Update Product
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
            <Typography
              variant="h4"
              style={{ color: "rgb(254,170,2)" }}
              component={Box}
            >
              My Orders
            </Typography>
          </Grid>
          {/* colomn2 */}
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            {/* <Button
      style={{ height: "37px",fontSize:"10px" ,marginLeft:"60px", color:"black",background:"rgb(254,170,2)"}}
      onClick={() => setOpenthree(true)}
      size="small"
      variant="contained"
    >
      <AddOutlined fontSize="small" 
        onClose={() => setOpenthree(true)}
      />
      Add new Product
    </Button> */}
          </Grid>

          <Divider />
        </Grid>
      </Container>
     {loadingtable?<Box textAlign="center"><BeatLoader/></Box>:
      <Container style={{ width: "80%" }} maxWidth="md">
        {/* <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead style={{ background: grey[900] }}>
              <TableRow>
                <TableCell
                  style={{ fontWeight: "bolder", color: "whitesmoke" }}
                >
                  Order
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bolder", color: "whitesmoke" }}
                  align="center"
                >
                  Total
                </TableCell>

                <TableCell
                  style={{ fontWeight: "bolder", color: "whitesmoke" }}
                  align="center"
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadingtable ? (
                <Box ml={40}>
                  <BeatLoader size="15" color="rgb(254,170,2)" />
                </Box>
              ) : (
                
                 

                  
               
              )}
            </TableBody>
          </Table>
        </TableContainer> */}

        <Box m={2}>
          <Paper elevation={3}>
            {state.map((val) => (
              <div>
                <li align="left">{val.title}</li>
                <li align="center">{val.price}</li>
                <li align="center">
                  <Badge badgeContent="Purchased" color="primary" />
                </li>
                <li align="center">
                  {val.pimage ? (
                    <Box ml={2}>
                      <Button
                        variant="contained"
                        onClick={() => showimg(val.pimage)}
                        color="primary"
                        size="small"
                      >
                        Show Image
                      </Button>
                    </Box>
                  ) : null}
                </li>
              </div>
            ))}
          </Paper>
        </Box>
      </Container>}
    </div>
  );
};

export default Dashboard;
