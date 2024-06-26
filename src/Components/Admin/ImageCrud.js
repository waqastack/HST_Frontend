import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import DrawerData from "../DrawerData/DrawerData";
import toast, { Toaster } from "react-hot-toast";
import logo from "../../images/logo.png";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  IconButton,
  Grid,
  Divider,
  AppBar,
  Toolbar,
  makeStyles,
} from "@material-ui/core";
import { Delete, Edit, AddOutlined, Menu } from "@material-ui/icons";
import { url } from "../../Api/ApiRoutes";
import axios from "axios";
import { grey } from "@material-ui/core/colors";
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

const ImageCrud = () => {
  const classes = useStyles();
  const [image, setimage] = useState([]);
  const [file2, setfile2] = useState([]);
  const [imgIds, setimgId] = useState("");
  const [opentwo, setOpentwo] = useState(false);
  const [openthree, setopenthree] = useState(false);
  const [open, setopen] = useState(false);
  const [loadingtable, setloadingtable] = useState(null);
  const [opendrawer, setopendrawer] = useState(false);
  //   show images
  useEffect(() => {
    showImages();
  }, []);
  const history = useHistory();
  const filechangeupdate = (e) => {
    e.preventDefault();
    setfile2(e.target.files[0]);
  };
  //   0.update the images
  const updateimage = (imgId) => {
    setimgId(imgId);
    setopen(true);
  };
  //   update image to database
  const updateimgnow = async (e) => {
    var fdata = new FormData();
    fdata.append("image", file2);
    try {
      const { data } = await axios.patch(
        `${url}/user/updateImage/${imgIds}`,
        fdata
      );
      if (data) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  //1. show all images
  const showImages = async (e) => {
    try {
      const { data } = await axios.get(`${url}/user/showAllIamges`);
      console.log(data.data);
      setimage(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // 2.delete a single image
  const deleteImages = async (imgId) => {
    try {
      await axios.delete(`${url}/user/deleteImage/${imgId}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  //   setting out file
  const [file, setfile] = useState([]);
  const changeFile = (e) => {
    setfile(e.target.files[0]);
  };
  const uploadImage = async (e) => {
    e.preventDefault()
    var fdata = new FormData();
    fdata.append("image", file);
    await axios.post(`${url}/user/imageCrud`, fdata);
    window.location.reload()
  };
  return (
    <div>
      {/* appbar */}
      <Toaster />
      <DrawerData opendrawer={opendrawer} setopendrawer={setopendrawer} />
      {/* add the hotel manager */}
      {/* <AddHotelManager openfour={openfour} setopenfour={setopenfour}/> */}
      {/* navbar */}
      <AppBar position="static" color="inherit">
        <Toolbar>
          {/* menu icon button */}
          <IconButton onClick={() => setopendrawer(true)}>
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
              style={{ color: "hotpink" }}
              className={classes.titleTwo}
            >
              <img width="80px" src={logo} alt="" />
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        {/* image update dialog */}
        <Dialog open={open} onClose={() => setopen(false)}>
          <DialogTitle>Update Building</DialogTitle>
          <DialogContent>
            <Box>
              <form onSubmit={updateimgnow} enctype="multipart/form-data">
                <input onChange={filechangeupdate} type="file" />
                <input name="image" type="submit" onClick={updateimgnow} />
              </form>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setopen(false)}
              variant="contained"
              size="small"
              color="secondary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* upload  new image dialog */}
        {/* image update dialog */}
        <Dialog open={openthree} onClose={() => setopenthree(false)}>
          <DialogTitle>Upload Building</DialogTitle>
          <DialogContent>
            <Box>
              <form onSubmit={uploadImage} enctype="multipart/form-data">
                <input onChange={changeFile} type="file" />
                <input name="image" type="submit" onClick={uploadImage} />
              </form>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setopenthree(false)}
              variant="contained"
              size="small"
              color="secondary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* heading */}
        <Grid container component={Box} ml={1} mt={3} textAlign="center">
          {/* colomn1 */}
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Typography
              variant="h4"
              style={{ color: "rgb(254,170,2)" }}
              component={Box}
            >
              Buildings
            </Typography>
          </Grid>
          {/* colomn2 */}
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Button
              style={{
                height: "37px",
                fontSize: "10px",
                marginLeft: "60px",
                color: "black",
                background: "rgb(254,170,2)",
              }}
              onClick={() => setopenthree(true)}
              size="small"
              variant="contained"
            >
              <AddOutlined
                fontSize="small"
                onClose={() => setopenthree(true)}
              />
              Add new Buildings
            </Button>
          </Grid>

          <Divider />
        </Grid>
        {/* table setup */}
        <Container style={{ width: "80%" }} maxWidth="md">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead style={{ background: grey[900] }}>
                <TableRow>
                  <TableCell
                    style={{ fontWeight: "bolder", color: "whitesmoke" }}
                  >
                    Image ID
                  </TableCell>

                  <TableCell
                    style={{ fontWeight: "bolder", color: "whitesmoke" }}
                    align="center"
                  >
                    Image
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", color: "whitesmoke" }}
                    align="center"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loadingtable ? (
                  <Box ml={40}>
                    <BeatLoader size="15" color="rgb(254,170,2)" />
                  </Box>
                ) : (
                  image.map((row) => (
                    <TableRow>
                      <TableCell align="left">{row._id}</TableCell>
                      <TableCell align="center">
                        <img
                          src={`${url}/${row.image}`}
                          width="60px"
                          height="60px"
                          alt=""
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => updateimage(row._id)}>
                          <Edit color="primary" />
                        </IconButton>
                        <IconButton onClick={() => deleteImages(row._id)}>
                          <Delete color="secondary" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Container>
    </div>
  );
};

export default ImageCrud;
