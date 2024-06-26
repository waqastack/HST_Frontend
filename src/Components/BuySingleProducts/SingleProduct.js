import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import Iframe from 'react-iframe'
import * as action from "../Redux/actions/Actions"
import {
  Button,
  Grid,
  Typography,
  CssBaseline,
  makeStyles,
  Container,
  Divider,
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import img from "../../images/sampleProduct.jpg";
import { CheckCircle, Close, PriorityHigh, ShoppingCart } from "@material-ui/icons";
import axios from "axios";
import {url} from "../../Api/ApiRoutes"
import { ClipLoader } from "react-spinners";
const useStyles = makeStyles((theme) => ({
  respMarginButton: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: "10px",
    },
  },
  hover: {
    "&:hover": {
      cursor: "zoom-in",
    },
  },
}));
// main
const SingleProduct = () => {
const user = localStorage.getItem("user")
  const classes = useStyles();
  const [state, setstate] = useState([]);
  const [loading, setloading] = useState(false);
  const [open, setopen] = useState(null);
  const [newid, setnewid] = useState()
  const [addtocart, setaddtocart] = useState(null);
  const [toloading,settoloading] = useState(null)
  const [loadingaddingcart,setloadingaddingcart] = useState(null)
  const [addtocarttwo, setaddtocarttwo] = useState(null);
  useEffect(() => {
    getSingleProduct();
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  // const selector = useSelector()
const dispatch = useDispatch()
  async function getSingleProduct() {
    setloading(true);
    const { data } = await axios.get(
      `${url}/user/findSingleProduct/${id}`
    );
    setstate(data.data);
    setloading(false);
  }
  //  adding a single product in the database
async function addSingleProduct(ourdata) {
  try {
    settoloading(true);
    setloadingaddingcart(true)
    const { data } = await axios.post(
      `${url}/user/addtocartSingle`,
      ourdata
    );
    // setloadingS(false);
    settoloading(true);
    setloadingaddingcart(false)
     if (data.err === "err") {
      setaddtocart(false)
      setaddtocarttwo(true)
    }
    else {
      setaddtocart(true)
      window.location.reload();
    }
    
  } catch (error) {
    console.log(error);
    // setloadingS(false);
    // toast.error("Something is'nt right!");
  }
}
// find single product from the old database
const addToCart = async (itemID)=>{
    const { data } = await axios.get(
      `${url}/user/findSingleProduct/${itemID}`
    );
   const ourdata = data.data
    // write error here for duplocate data
    addSingleProduct(ourdata);
   

}

  return (
    <div>
      <CssBaseline />
      {/* this dialougue for added to cart */}
      {loadingaddingcart?<Dialog open={toloading} onClose={()=>settoloading(false)}><DialogTitle><Box textAlign="center"><CircularProgress /></Box><Typography textAlign="center" component={Box} variant="h6">Checking ...</Typography></DialogTitle> </Dialog>:null}
      <Dialog
        open={addtocart}
        onClose={()=>setaddtocart(false)}
        >
          <DialogTitle>
         <IconButton onClick={()=>setaddtocart(false)} style={{marginLeft:"230px"}}>
         <Close/>
         </IconButton>
          </DialogTitle>
          <CheckCircle fontSize="large" style={{color:"rgb(254,181,2)",marginLeft:"80px",fontSize:"150px"}}/>
          <Typography      
         variant="h4" style={{padding:"50px"}}>Added to cart</Typography>
        </Dialog>
      {/* this dialgoue for product image view */}
      <Dialog open={open} onClose={() => setopen(false)}>
        <DialogTitle>
          <IconButton
            style={{ marginLeft: "500px", marginTop: "-20px" }}
            onClick={() => setopen(false)}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <img src={state.selectedFile} width="80%" height="80%" alt="" />
      </Dialog>
       {/* Dialogue for duplicate added cart item */}
       <Dialog
        open={addtocarttwo}
        onClose={()=>setaddtocarttwo(false)}
        >
          <DialogTitle>
         <IconButton onClick={()=>setaddtocarttwo(false)} style={{marginLeft:"100px"}}>
         <Close/>
         </IconButton>
          </DialogTitle>
          <PriorityHigh fontSize="large" style={{color:"rgb(254,181,2)",marginLeft:"75px",fontSize:"150px"}}/>
          <Typography      
         variant="h6" style={{padding:"30px"}}>You have already this item!</Typography>
        </Dialog>
      <Grid container style={{ marginTop: "35px" }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          style={{ textAlign: "center" }}
        >
          {/* make width and hieght same to avoid image to be stretched */}
          {loading ? (
            <h2>
              <ClipLoader size="40" />
            </h2>
          ) : (
            <img
              src={state.selectedFile}
              className={classes.hover}
              onClick={() => setopen(true)}
              width="80%"
              height="80%"
              alt=""
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          style={{ textAlign: "center" }}
        >
          {loading ? null : (
            <>
             
              <Typography
                variant="h5"
                style={{
                  color: "rgb(254,181,2)",
                  marginRight: "114px",
                  display: "inline",
                }}
              >
          Product Name:     {state.title}
              </Typography>
              <br />
              <br />
          
              <Container maxWidth="xs">
                <Typography
                  variant="subtitle1"
                  color="initial"
                  style={{
                    marginBottom: "3px",
                    marginTop: "16px",
                    marginLeft:"10px",
                    textAlign: "justify",
                  }}
                >
                
            <Typography variant="h6">Details:  </Typography>  {state.description}
                </Typography>
              </Container>
              <br />
              <Typography
                variant="h5"
                style={{
                  color: "rgb(254,181,2)",
                  marginRight: "250px",
                  display: "inline",
                }}
              >

               Rs. {state.price}/-
              </Typography>

              <Box mt={5} style={{marginLeft:"-270px"}}>
              <Button
                startIcon={<ShoppingCart fontSize="small" />}
                style={{
                  backgroundColor: "rgb(254,170,2)",
                  color: "black",
                  borderRadius: "0px",

                }}
                size="small"
                color="primary"
                onClick={()=>addToCart(state._id)}
              >
                Add to cart
              </Button>
              </Box>
               
            </>
          )}
        </Grid>
      </Grid>
      
        {/* iframe */}
        <Box textAlign="center" my={3}>
        <Iframe url={state.view}
        width="100%"
        height="370px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"/>
              </Box>
     
      <Divider
        style={{ marginTop: "10px", height: "1px", background: "grey" }}
      />
    </div>
  );
};

export default SingleProduct;
