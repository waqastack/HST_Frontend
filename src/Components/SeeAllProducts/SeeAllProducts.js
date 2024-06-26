import React, { useState,useEffect } from 'react'
import {makeStyles, Divider, Grid, Typography,Container, Button, Card,CardMedia, CardContent, Dialog,DialogTitle,CardActionArea, CardActions, Box, IconButton} from "@material-ui/core";
import { ShoppingCart,Grade, Close, CheckCircle, PriorityHigh, CheckCircleOutline} from "@material-ui/icons";
import toast, {Toaster} from "react-hot-toast";
import {useHistory} from "react-router-dom";
 import {ClipLoader} from "react-spinners"
import axios from "axios";
import {url} from "../../Api/ApiRoutes"
import Register from '../RegisterDialog/Register';

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
const SeeAllProducts = () => {
    const classes=useStyles()
    const user = localStorage.getItem("user");

    useEffect(()=>{
        getData(); 
        },[user])
    const [state, setstate] = useState([])
    const [open, setOpen] = useState(false);
    const [opentwo, setOpentwo] = useState(false);
    const [addtocart, setaddtocart] = useState(null);
    const [addtocarttwo, setaddtocarttwo] = useState(null);
    const [loadingaddtocart,setloadingaddtocart] =useState(null)
    const[loading,setloading] = useState(false)
     const history = useHistory();
    const getData = async () => {
        setloading(true);
        const { data } = await axios.get(`${url}/user/getAllTheProduct`);
        console.log(data);
        setstate(data.data);
        setloading(false);
      };


      function showProductDetails(id) {

        history.push(`/BuyProducts/${id}`);
      }

      async function addSingleProduct(ourdata) {
        try {
          // setloadingaddingcart(true)
          // settoloading(true)
          const { data } = await axios.post(
            `${url}/user/addtocartSingle`,
            ourdata
          );
       
          if(data.data){
            // settoloading(false)
            setaddtocart(true)
            setaddtocarttwo(false)
          }
          if (data.Err) {
          // item error if it duplicates in new database
            setaddtocart(false)
            setaddtocarttwo(true)
          }
          
        } catch (error) {
          console.log(error);
         
          toast.error("Something is'nt right!");
        }
      }
      // getting single product from the old database
      const addToCart = async (itemID)=>{
        
        if(user){
          setloadingaddtocart(true);
          const { data } = await axios.get(
            `${url}/user/findSingleProduct/${itemID}`
          );
          const email = {email:user}
          var newData = data.data
          const ourdata = {...newData , ...email}
          console.log(ourdata);
          setloadingaddtocart(false);
          // write error here for duplicate data
          addSingleProduct(ourdata);
        }
        // open dialog for subscribe a user
        else if(!user){
          setOpen(true)
        }
      }
    return (
        <div>
         <Grid container style={{padding:"20px"}}> 
        {/* our Products heading */}
        <Grid style={{textAlign:"center"}} item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Typography style={{fontWeight:"bolder",color:"rgb(254,181,2)"}} variant="h4" color="initial">See All Products</Typography>
        <Divider style={{backgroundColor:"rgb(254,181,2)",width:"10%",height:"2px",marginLeft:"auto",marginRight:"auto",marginTop:"10px",marginBottom:"10px"}}/>
        </Grid>
        </Grid>
 {
         loading?<Box textAlign="center" mb={9}><ClipLoader size="10"/></Box>:
         <Container maxWidth="md">
       <Grid container spacing={5}>
       
      
      { state.map((val)=>(
        <Grid item xs={12} sm={4} md={4} lg={4} xl={3}>
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
         <Typography className={classes.titleResp} variant="h5">
           {val.veiw}
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

        {/* {cookies.price} we can show cookies data like this almost like a localstorage */}
         </CardActions>
   
       </Card>
       </Grid>
      ))}
  
    
       </Grid> 
        </Container>   
       }         </div>
    )
}

export default SeeAllProducts
