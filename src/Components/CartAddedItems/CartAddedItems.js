import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Divider,
  Typography,
  Button,
  Box,
  Container,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  Grid,
  DialogActions,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import {
  Cancel,
  CheckCircleOutline,
  Close,
  ExpandLess,
  ExpandMore,
  LocalOffer,
  ShoppingBasketOutlined,
} from "@material-ui/icons";
import toast, { Toaster } from "react-hot-toast";
import StripeCheckout from "react-stripe-checkout";
import { url } from "../../Api/ApiRoutes";
import _ from "lodash";
import { BeatLoader, ClipLoader } from "react-spinners";
import axios from "axios";
import Loader from "react-spinners/ClipLoader";
import Slip from "./Slip";

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
  blur: {
    backdropFilter: "blur(4px)",
  },
}));

const CartAddedItems = () => {
  const classes = useStyles();
  const [state, setstate] = useState([]);
  const [update, setupdate] = useState([]);
  const [input, setinput] = useState();
  const [open, setopen] = useState(null);
  const [openfour, setopenfour] = useState(false);
  const [loading, setloading] = useState(null);
  const [stripe, setstripe] = useState("");
  const [newdata, setnewdata] = useState("");
  const [openthree, setopenthree] = useState(null);
  const [removeloading, setremoveloading] = useState(false);
  const [loader, setloader] = useState(false);
  const [toloading, settoloading] = useState(null);
  const [sliploading, setsliploading] = useState(false);
  const [getslip, setgetslip] = useState(false);
  const [thanks, setthanks] = useState(false);
  const [findLoader, setfindLoader] = useState(false);

  // const [data, setdata] = useState('')
  const [loadingtable, setloadingtable] = useState(null);
  // calaclute total price
  //  make payment
  // const totalPrice = () =>{
  //  _.sum(state.map((val)=>setOutprice(val.price*val.qty)))
  //  console.log( _.sum(state.map((val)=>setOutprice(val.price*val.qty))));
  // }

  const makePayment = (token) => {
    console.log(token);
    //this shows body contains token and
    const body = {
      token,
      totalPrice,
    };
    //inside the headers we have our content type will be json
    const headers = {
      "Content-Type": "application/json",
    };
    //if we use the axios then we don't need to pass these credetials alright..
    fetch(`${url}/user/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        setgetslip(true);
        setsliploading(true);
        setTimeout(() => {
          setstripe(response);
        }, 3000);
      })
      .catch((err) => console.log(`err is here: ${err}`));
  };

  // update data directly to the database
  async function findRecord(id) {
    const email = { user };
    setloading(true);
    setopen(true);
    const { data } = await axios.post(
      `${url}/user/findSingleCartProduct/${id}`,
      email
    );
    setupdate(data.data);
    setloading(false);
  }
  useEffect(() => {}, [state]);
  // get all added to cart products from database
  const getData = async () => {
    const email = user;
    // setloadingtable(true)
    setloader(true);
    settoloading(true);
    try {
      const { data } = await axios.get(`${url}/user/getallcartSingle/${email}`);
      // console.log(data.data.length)
      if (data.data.length !== 0) {
        setstate(data.data[0].products);
      }

      if (data !== null) {
        setloader(false);
        settoloading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  var totalPrice = _.sum(state.map((val) => val.price * val.qty));
  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
    if (stripe.ok) {
      setsliploading(false);
      setgetslip(false);
      window.scrollTo(0, 0);
      setopenfour(true);
    }
    setnewdata({ useremail: user, totalprice: totalPrice });
  }, [stripe]);

  const user = localStorage.getItem("user");

  // setting up price
  function settingPrice(e) {
    setinput({ ...input, qty: e.target.value, email: user });
  }
  // proceed to update the record
  async function proceed(id) {
    setloading(true);
    const { data } = await axios.put(`${url}/user/cartqtyUpdate/${id}`, input);
    setloading(false);
    setopen(false);
    window.location.reload();

    // const userConfirmed = data.data.title;
    // if (userConfirmed ) {
    //   toast.success("Your changes succeed");
    //   setloading(false);
    // }
  }
  //  this is the function for remove the items
 
  async function remove(id) {
    setremoveloading(true);
    const email = { user };
    const { data } = await axios.post(
      `${url}/user/cartSingleRemove/${id}`,
      email
    );
    console.log(data.success);
    if (data.success) {
      setremoveloading(false);
      toast.success("You removed the Product");
      window.location.reload();
    }
  }

  // console.log(data);
  return (
    <div>
      {/* just show a load message to user while slip comes*/}
      {sliploading ? (
        <Dialog
          open={getslip}
          onClose={() => setgetslip(false)}
          BackdropProps={{
            classes: { root: classes.blur },
          }}
        >
          <Box style={{ padding: "10px", color: "#c51162" }}>
            <Typography variant="h6">Just Take Your Slip...</Typography>
          </Box>
        </Dialog>
      ) : null}
      {/* slip for the user */}
      <Slip
        openfour={openfour}
        setopenfour={setopenfour}
        state={state}
        thanks={thanks}
        setthanks={setthanks}
      />
      {/* DIALOG FOR THE QTY*/}
      <Toaster toastOptions={{ displayTime: "30" }} />
      {loader ? (
        <Dialog open={toloading} onClose={() => settoloading(false)}>
          <DialogTitle>
            <Box textAlign="center">
              <CircularProgress />
            </Box>
            <Typography textAlign="center" component={Box} variant="h6">
              Getting Products ...
            </Typography>
          </DialogTitle>{" "}
        </Dialog>
      ) : null}

      {/*  checkout summary*/}

      <Dialog open={open} onClose={() => setopenthree(false)}>
        <DialogTitle>
          {/* one row */}
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <IconButton
                onClick={() => setopen(false)}
                style={{ marginLeft: "300px" }}
              >
                <Close />
              </IconButton>
              <Typography
                variant="h5"
                style={{
                  marginTop: "-40px",
                  color: "rgb(254,170,2)",
                  textTransform: "capitalize",
                }}
              >
                {update.title}
              </Typography>
            </Grid>
          </Grid>
        </DialogTitle>

        <Box>
          <Typography variant="body2" style={{ marginLeft: "30px" }}>
            Price: {update.price}/-
          </Typography>
        </Box>

        <Box>
          <Typography variant="body2" style={{ marginLeft: "30px" }}>
            Selected Quantity: {update.qty} items
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" style={{ marginLeft: "30px" }}>
            Total amount: {update.price * update.qty}/-
          </Typography>
        </Box>

        <Box>
          {update.selectedFile?<img
            src={update.selectedFile}
            width="100px"
            height="100px"
            alt=""
            style={{ margin: "30px" }}
          />:null}
        </Box>
        {loading?<p style={{textAlign:"center"}}>...</p>:<Container>
          <Typography>Select a quantity</Typography>
          <input
            type="number"
            min="0"
            onChange={settingPrice}
            defaultValue={update.qty}
            style={{ width: "50px" }}
          />
        </Container>}

        <DialogActions>
          {loading ? (
            <Button
              variant="contained"
              startIcon={<ClipLoader size="12" color="black" />}
              fullWidth
              style={{ borderRadius: "0px", background: "rgb(254,170,2)" }}
            >
              Proceeding...
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => proceed(update._id)}
              fullWidth
              style={{ borderRadius: "0px", background: "rgb(254,170,2)" }}
            >
              Proceed
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* dialogue for the cart summary */}
      <Dialog open={openthree} onClose={() => setopenthree(false)}>
        <DialogTitle>
          <Box textAlign="center">
            <Typography variant="h5" color="secondary">
              Cart Summary
            </Typography>
          </Box>
          <Divider />
          {/* one row */}
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <IconButton
                onClick={() => setopenthree(false)}
                style={{ marginLeft: "300px" }}
              >
                <Close />
              </IconButton>
              <Typography
                variant="h5"
                style={{
                  marginTop: "-40px",
                  color: "rgb(254,170,2)",
                  textTransform: "capitalize",
                }}
              >
                {" "}
              </Typography>
            </Grid>
          </Grid>
        </DialogTitle>

        <Box>
          <Typography variant="body2" style={{ marginLeft: "30px" }}>
            Products:
          </Typography>
        </Box>
        {state.map(
          (val) =>
            val.qty > 0 && (
              <Button style={{ textAlign: "left", width: "100px" }}>
                <CheckCircleOutline fontSize="small" />
                {val.selectedFile?<img src={val.selectedFile} width="50px" height="50px" alt="" />:val.title}
                <Divider />
              </Button>
            )
        )}
        <Divider />
        <Box>
          <Typography variant="body2" style={{ marginLeft: "30px" }}>
            Total amount: {totalPrice} /-
          </Typography>
        </Box>
        <Container></Container>

        <DialogActions>
          <StripeCheckout
            stripeKey="pk_test_51IsiGeERaO9lvsvDPuC3K4mxPf0HwBIZXt5bE3f0XArZE6yFTs9ETnr5bOFfhp2hNNM5CImOCzXaIybketwxF6wZ00uzqnWqUP"
            // name:pass it dynamically
            token={makePayment}
            amount={totalPrice * 100}
            currency="pkr"
            shippingAddress
            billingAddress
          >
            <Button
              startIcon={<ShoppingBasketOutlined fontSize="small" />}
              variant="contained"
              color="secondary"
              style={{ color: "white", fontSize: "13px", borderRadius: "0px" }}
              onClick={() => setopenthree(false)}
              size="meduim"
            >
              {" "}
              Buy Now !
            </Button>
          </StripeCheckout>
        </DialogActions>
      </Dialog>

      {/* ending for the summary dialougue*/}
      {removeloading ? (
        <Typography
          variant="h6"
          style={{ marginLeft: "500px", position: "absolute" }}
        >
          <ClipLoader size="100" color="white" />
        </Typography>
      ) : null}
      <Typography variant="h4" style={{ textAlign: "center" }}>
        Your Items({state.length})
      </Typography>
      <Divider />
      {state.length === 0 ? (
        <Box textAlign="center">No items in the cart</Box>
      ) : null}
      {/* table */}
      <Container style={{ width: "70%", marginTop: "10px" }} maxWidth="md">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead style={{ background: "rgb(254,170,2)" }}>
              <TableRow>
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
                  Title
                </TableCell>

                <TableCell
                  style={{ fontWeight: "bolder", color: "whitesmoke" }}
                  align="center"
                >
                  Price
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bolder", color: "whitesmoke" }}
                  align="center"
                >
                  Quantity
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bolder", color: "whitesmoke" }}
                  align="center"
                >
                  Remove
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadingtable ? (
                <Box ml={40}>
                  <BeatLoader size="15" color="rgb(254,170,2)" />
                </Box>
              ) : (
                state.map((row, index) => (
                  <>
                    <TableRow key={index}>
                      <TableCell align="center">
                       {row.selectedFile? <img
                          src={row.selectedFile}
                          alt=""
                          width="70px"
                          height="70px"
                        />:<Typography variant="body1" color="primary">No Image</Typography>}
                        {/* <img
                          src={row.selectedFile}
                          alt=""
                          width="70px"
                          height="70px"
                        /> */}
                      </TableCell>
                      <TableCell align="center">{row.title}</TableCell>
                      <TableCell align="center">{row.price}</TableCell>
                      {/* qty */}
                      <TableCell align="center">
                        <input
                          min="0"
                          value={row.qty}
                          style={{ width: "25px" }}
                        />
                        <ExpandLess
                          onClick={() => findRecord(row._id)}
                          style={{ cursor: "pointer" }}
                        />
                        <ExpandMore
                          onClick={() => findRecord(row._id)}
                          disabled
                          style={{ cursor: "pointer" }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          style={{
                            borderRadius: "0px",
                            background: "rgb(254,170,2)",
                            color: "white",
                          }}
                          size="small"
                          startIcon={<Cancel size="small" />}
                          variant="contained"
                          onClick={() => remove(row._id)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  </>
                ))
              )}

              <TableRow>
                <TableCell rowSpan={3} />

                <TableCell colSpan={1}>Total Price:</TableCell>
                <TableCell align="center">
                  {_.sum(state.map((val) => val.price * val.qty))}/-
                </TableCell>
                <TableCell colSpan={1}>
                  <Button
                    onClick={() => setopenthree(true)}
                    startIcon={<LocalOffer fontSize="small" />}
                    variant="contained"
                    style={{
                      background: "black",
                      color: "white",
                      fontSize: "13px",
                      borderRadius: "0px",
                    }}
                    size="meduim"
                  >
                    {" "}
                    Purchase !
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default CartAddedItems;
