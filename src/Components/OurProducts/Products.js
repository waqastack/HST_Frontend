import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Divider,
  Grid,
  Typography,
  Container,
  Button,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  CardActionArea,
  CardActions,
  Box,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import {
  ShoppingCart,
  Grade,
  Close,
  CheckCircle,
  PriorityHigh,
  CheckCircleOutline,
} from "@material-ui/icons";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { url } from "../../Api/ApiRoutes";
import Register from "../RegisterDialog/Register";
import LoginDialog from "../LoginDialog/LoginDialog";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    height: "100%",
  },

  media: {
    height: 140,
  },
  buttonResp: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "60%",
    },
  },
  titleResp: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "100%",
    },
  },
}));
//main
const Products = () => {
  const classes = useStyles();
  // states
  const [loading, setloading] = useState(false);
  const [state, setstate] = useState([]);
  const [open, setOpen] = useState(false);
  const [opentwo, setOpentwo] = useState(false);
  const [addtocart, setaddtocart] = useState(null);
  const [addtocarttwo, setaddtocarttwo] = useState(null);
  const [loadingaddtocart, setloadingaddtocart] = useState(null);
  const [loadingaddingcart, setloadingaddingcart] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [toloading, settoloading] = useState(null);
  const history = useHistory();
  const user = localStorage.getItem("user");

  //get all data of products
  useEffect(() => {
    getData();
  }, [user, pageNumber]);

  //storing a single product in the database that we finded from old database
  async function addSingleProduct(ourdata) {
    try {
      setloadingaddingcart(true);
      settoloading(true);
      const { data } = await axios.post(`${url}/user/addtocartSingle`, ourdata);
      setloadingaddingcart(false);
      if (data.data) {
        settoloading(false);
        setaddtocart(true);
        setaddtocarttwo(false);
      }
      if (data.Err) {
        // item error if it duplicates in new database
        setaddtocart(false);
        setaddtocarttwo(true);
      }
    } catch (error) {
      console.log(error);

      toast.error("Something is'nt right!");
    }
  }
  // getting single product from the old database
  const addToCart = async (itemID) => {
    if (user) {
      setloadingaddtocart(true);
      const { data } = await axios.get(
        `${url}/user/findSingleProduct/${itemID}`
      );
      const email = { email: user };
      var newData = data.data;
      const ourdata = { ...newData, ...email };
      setloadingaddtocart(false);
      // write error here for duplicate data
      addSingleProduct(ourdata);
    }
    // open dialog for subscribe a user
    else if (!user) {
      setOpen(true);
    }
  };

  //api call for all data but/limited by three only of products
  const getData = async () => {
    setloading(true);
    const { data } = await axios.post(`${url}/user/getProduct`,{
      pageNumber:pageNumber
    });
    setstate([...state,...data.data]);
    setloading(false);
  };
  console.log("state", state)
  // close dislgoue
  const closeDialog = () => {
    setaddtocart(false);
  };
  const closeDialogtwo = () => {
    setaddtocarttwo(false);
  };
  // we are going to disable button when user added an item to vat

  function showProductDetails(id) {
    history.push(`/BuyProducts/${id}`);
  }
  return (
    <div style={{ paddingTop: "12px", backgroundColor: "white" }}>
      <Toaster />
      {/* Dialogue for succeed added to cart the items */}
      <Register setOpentwo={setOpentwo} opentwo={opentwo} />
      <LoginDialog
        setOpentwo={setOpentwo}
        opentwo={opentwo}
        setOpen={setOpen}
        open={open}
      />

      <Dialog open={addtocart} onClose={closeDialog}>
        <DialogTitle>
          <IconButton onClick={closeDialog} style={{ marginLeft: "160px" }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <CheckCircle
          fontSize="small"
          style={{
            color: "rgb(254,181,2)",
            marginLeft: "60px",
            fontSize: "130px",
          }}
        />
        <Typography
          variant="h6"
          style={{ padding: "30px", textAlign: "center" }}
        >
          Added to cart
        </Typography>
      </Dialog>
      {/* Dialogue for duplicate added cart item */}
      <Dialog open={addtocarttwo} onClose={closeDialogtwo}>
        <DialogTitle>
          <IconButton onClick={closeDialogtwo} style={{ marginLeft: "100px" }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <PriorityHigh
          fontSize="large"
          style={{
            color: "rgb(254,181,2)",
            marginLeft: "75px",
            fontSize: "150px",
          }}
        />
        <Typography variant="h6" style={{ padding: "30px" }}>
          You have already this item!
        </Typography>
      </Dialog>
      {loadingaddingcart ? (
        <Dialog open={toloading} onClose={() => settoloading(false)}>
          <DialogTitle>
            <Box textAlign="center">
              <CircularProgress />
            </Box>
            <Typography textAlign="center" component={Box} variant="h6">
              Checking ...
            </Typography>
          </DialogTitle>{" "}
        </Dialog>
      ) : null}
      {/* first line */}
      <Grid container style={{ padding: "20px" }}>
        {/* our Products heading */}
        <Grid
          style={{ textAlign: "center" }}
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <Typography
            style={{ fontWeight: "bolder", color: "rgb(254,181,2)" }}
            variant="h4"
            color="initial"
          >
            Our Products
          </Typography>
          <Divider
            style={{
              backgroundColor: "rgb(254,181,2)",
              width: "10%",
              height: "2px",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
        </Grid>
      </Grid>
      {loading ? (
        <Box textAlign="center" mb={9}>
          <ClipLoader size="10" />
        </Box>
      ) : (
        <Container maxWidth="md">
          <Grid container spacing={5}>
            {console.log("state123",state)}
            {state && state.map((val, index) => (
              <Grid item xs={12} sm={4} md={4} lg={4} xl={3} key={index}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={val.selectedFile}
                      title="shopping"
                    />
                    <CardContent>
                      <Typography className={classes.titleResp} variant="h5">
                        {val.title}
                      </Typography>

                      <Grade style={{ color: "rgb(254,181,2)" }} />
                      <Grade style={{ color: "rgb(254,181,2)" }} />
                      <Grade style={{ color: "rgb(254,181,2)" }} />
                      <Grade style={{ color: "rgb(254,181,2)" }} />
                      <Grade style={{ color: "rgb(254,181,2)" }} />
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      className={classes.buttonResp}
                      style={{
                        backgroundColor: "rgb(0,8,45)",
                        color: "rgb(254,170,2)",
                        borderRadius: "0px",
                      }}
                      fullWidth
                      size="small"
                      color="primary"
                      onClick={() => showProductDetails(val._id)}
                    >
                      Details
                    </Button>

                    <Button
                      className={classes.buttonResp}
                      startIcon={<ShoppingCart fontSize="small" />}
                      style={{
                        backgroundColor: "rgb(254,170,2)",
                        color: "black",
                        borderRadius: "0px",
                      }}
                      fullWidth
                      size="small"
                      color="primary"
                      onClick={() => addToCart(val._id)}
                    >
                      Add to cart
                    </Button>

                    {/* {cookies.price} we can show cookies data like this almost like a localstorage */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {/* 3rd line for the button */}
      <Grid>
        {/* now its button item */}
        <Grid style={{ textAlign: "center" }}>
          <Button
            size="small"
            variant="contained"
            style={{
              color: "black",
              backgroundColor: "rgb(254,170,2)",
              marginTop: "30px",
              marginBottom: "10px",
              borderRadius: "0px",
            }}
            onClick={() => history.push("/seeAllProducts")}
          >
            See All Products
          </Button>

          <Button
            size="small"
            variant="contained"
            style={{
              color: "black",
              backgroundColor: "rgb(254,170,2)",
              marginTop: "30px",
              marginBottom: "10px",
              borderRadius: "0px",
            }}
            onClick={() => setPageNumber(2)}
          >
            Load more
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Products;
