import React, { useEffect, useState } from 'react'
import { Divider, Grid, Typography,Container, Button,Dialog,DialogTitle, Card,CardMedia, CardContent, CardActionArea, CardActions, IconButton, Box, makeStyles} from "@material-ui/core";
import { ShoppingCart,Grade, CheckCircle, Close, PriorityHigh} from "@material-ui/icons";
import {useHistory} from "react-router-dom"
import {useDispatch} from "react-redux";
import * as action from "../Redux/actions/Actions"
import axios from "axios";
import {url} from "../../Api/ApiRoutes"
import { ClipLoader } from 'react-spinners';
import _ from 'lodash';
const useStyles = makeStyles(theme=>({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },

  card: {
    height:"100%"
  },

  media: {
    height: 140
  },
  buttonResp:{
   [theme.breakpoints.down('sm')]:{
    fontSize:"60%"
   }
  },
  titleResp:{
    [theme.breakpoints.down('sm')]:{
      fontSize:"100%"
    }
  }

}));
const SimilarProducts = () => {
  const classes=useStyles()
const user = localStorage.getItem("user")
  useEffect(()=>{
    getDataOne();
    getDataTwo();
    window.scrollTo(0, 0)
  },[])
  // states
  const[loading,setloading] = useState(false)
  const [state, setstate] = useState([])
  const [statetwo, setstatetwo] = useState([])
  const [id, setid] = useState()
  const [addtocart, setaddtocart] = useState(null);
  const [addtocarttwo, setaddtocarttwo] = useState(null);
 const history = useHistory();
  // show available products
  const getDataOne = async () => {
    setloading(true);
    const { data } = await axios.post(`${url}/user/getProduct`);
    setstate(data.data);
    setloading(false);
  };
  function BuyProduct(id) {
    history.push("/BuyProducts")
  }//  adding a single product && checking that user is login/not
const dispatch = useDispatch()

// get all added to cart products from database
const getDataTwo = async () => {
  // setloadingtable(true)
  const { data } = await axios.get(`${url}/user/getallcartSingle`);
  setstatetwo(data.data);
  // setloadingtable(false)
};
// comparing two arrays and filter them
var result = state.filter((code) => 
statetwo.every((balanceCode) => balanceCode._id !== code._id));

console.log(result);

// add to cart functionality
  //  adding a single product in the database
  async function addSingleProduct(ourdata) {
    try {
      // setloadingS(true);
  
      const { data } = await axios.post(
        `${url}/user/addtocartSingle`,
        ourdata
      );
      // setloadingS(false);
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
 
  function showProductDetails(id) {

    history.push(`/BuyProducts/${id}`);
    window.location.reload()
  }
    return (
        <div style={{paddingTop:"12px",backgroundColor:"white"}}>
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
        {/* first line */}
        <Grid container style={{padding:"20px"}}> 
        {/* our Products heading */}
        <Grid style={{textAlign:"center"}} item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Typography style={{fontWeight:"bolder",color:"rgb(254,181,2)"}} variant="h4" color="initial">Similar Products</Typography>
        <Divider style={{backgroundColor:"rgb(254,181,2)",width:"10%",height:"2px",marginLeft:"auto",marginRight:"auto",marginTop:"10px",marginBottom:"10px"}}/>
        </Grid>
        </Grid>

        {
         loading?<Box textAlign="center" mb={9}><ClipLoader size="10"/></Box>:
         <Container maxWidth="md">
       <Grid container spacing={5}>
      { result.map((val)=>(
        <Grid item xs={12} sm={4} md={4} lg={4} xl={3}>
        <Card className={classes.card}>
       <CardActionArea>
     <CardMedia
     className={classes.media}
    //  style={{width:"320px",height:"180px"}}
     image={val.selectedFile}
     title="shopping"
     />
     <CardContent>
         <Typography className={classes.titleResp} variant="h5">
            {val.title}
         </Typography>
       
     <Grade style={{color:"rgb(254,181,2)"}}/>
     <Grade style={{color:"rgb(254,181,2)"}}/>
     <Grade style={{color:"rgb(254,181,2)"}}/>
     <Grade style={{color:"rgb(254,181,2)"}}/>
     <Grade style={{color:"rgb(254,181,2)"}}/>
     </CardContent>
     </CardActionArea> 
         <CardActions>
        
         <Button 
          className={classes.buttonResp}
          style={{ backgroundColor:"rgb(0,8,45)",
          color:"rgb(254,170,2)",borderRadius:"0px"}}
         fullWidth size="small" color="primary"
         onClick={()=>showProductDetails(val._id)}
         >
          Details
        </Button>
       <Button
          className={classes.buttonResp}
          startIcon={<ShoppingCart fontSize="small"/>}
          style={{ backgroundColor:"rgb(254,170,2)",
          color:"black",borderRadius:"0px"}} 
          fullWidth size="small" color="primary"
          onClick={()=>addToCart(val._id)}
          >
          Add to cart
        </Button>
        
         </CardActions>
   
       </Card>
       </Grid>
     
      ))}
  
      </Grid> 
        </Container>   
       } 
        
        
        {/* 3rd line for the button */}
         <Grid>
             {/* now its button item */}
             <Grid style={{textAlign:"center"}}>
                 {/* <Button
                  size="small"
                  variant="contained"
                  style={{color:"black",
                  backgroundColor:"rgb(254,170,2)"
                  ,marginTop:"40px",
                  marginBottom:"40px",
                  borderRadius:"0px",

                  }}>
                  See All Products</Button> */}
             </Grid>
          </Grid>
        
       

      
            
        </div>
    )
}

export default SimilarProducts;