import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography,
  Container,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import {
  FavoriteBorder,
  Close,
  CheckCircle,
  PriorityHigh,
} from "@material-ui/icons";
import axios from "axios";
import { url } from "../../Api/ApiRoutes";
const Service = () => {
  const history = useHistory();
  useEffect(() => {
    getData();
  }, []);
  const [state, setstate] = useState([]);
  const [loading, setloading] = useState(false);
  const user = localStorage.getItem("user");
  const [open, setOpen] = useState(false);
  const [opentwo, setOpentwo] = useState(false);
  const [addtocart, setaddtocart] = useState(null);
  const [addtocarttwo, setaddtocarttwo] = useState(null);
  const [loadingaddtocart, setloadingaddtocart] = useState(null);
  const [loadingaddingcart, setloadingaddingcart] = useState(null);
  const [toloading, settoloading] = useState(null);

  // redirect to services
  const singleService = (id) => {
    history.push(`/singleservice/${id}`);
  };
  // get all the data
  const getData = async () => {
    setloading(true);
    const { data } = await axios.get(`${url}/user/getServices`);
    setstate(data.data);
    setloading(false);
  };
  // getting single service from the old database
  const addToCart = async (itemID) => {
    if (user) {
      setloadingaddtocart(true);
      const { data } = await axios.get(
        `${url}/user/findSingleservice/${itemID}`
      );
      console.log(data);
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
  const closeDialog = () => {
    setaddtocart(false);
  };
  const closeDialogtwo = () => {
    setaddtocarttwo(false);
  };
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

  return (
    <div
      style={{
        paddingTop: "12px",
        backgroundColor: "rgb(0,8,45)",
        marginTop: "-10px",
      }}
    >
      <Toaster />
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
        {/* services heading */}
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
            Services
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

      {/* service card 1/3:first line*/}
      <Container maxWidth="md">
        {/* first main line */}
        {loading ? (
          <Box textAlign="center">
            <ClipLoader size="10" color="white" />
          </Box>
        ) : (
          <Grid container spacing={5}>
            {/* first item */}
            {state.map((val) => (
              <Grid item xs={12} sm={4} md={4} lg={4} xl={3}>
                {/* 1 */}
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <FavoriteBorder style={{ color: "rgb(254,181,2)" }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" style={{ color: "white" }}>
                      {" "}
                      {val.title}{" "}
                    </Typography>
                  </Box>
                  <Box ml={4} mt={2}>
                    <Typography
                      style={{ color: "white" }}
                      variant="captionh1"
                      color="initial"
                    >
                      {val.description}
                    </Typography>
                  </Box>
                  <Box
                   mt={2}
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => singleService(val._id)}
                      style={{
                        background: "rgb(254,170,2)",
                        fontSize: "10px",
                        borderRadius: "0px",
                      }}
                    >
                      Details
                    </Button>
                    {/* <Button
                      variant="contained"
                      onClick={() => addToCart(val._id)}
                      style={{
                        background: "rgb(0,8,45)",
                        color: "white",
                        fontSize: "10px",
                        border: "1px solid white",
                        borderRadius: "0px",
                      }}
                    >
                      Add to cart
                    </Button> */}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}

        {/* last line for the button */}
        <Grid>
          {/* now its button item */}
          <Grid style={{ textAlign: "center" }}>
            <Button
              size="small"
              variant="contained"
              style={{
                color: "black",
                backgroundColor: "rgb(254,170,2)",
                marginTop: "40px",
                marginBottom: "40px",
                borderRadius: "0px",
              }}
            >
              See All Services
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Service;
