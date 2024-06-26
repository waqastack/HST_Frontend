import React, { useEffect, useState } from "react";
 import {  grey } from "@material-ui/core/colors";
import logo from "../../images/logo.png";
import {
  AddOutlined,
  Menu, Create, MonetizationOn, Description, SaveAlt, Update,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { ClipLoader} from "react-spinners";
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
  TextField,  
  Hidden,
  CircularProgress
} from "@material-ui/core";
import { Edit, Delete, Close } from "@material-ui/icons";
import toast, { Toaster } from "react-hot-toast";
import DrawerData from "../DrawerData/DrawerData";
import Loader from "react-spinners/ClipLoader";
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
  
const PriceCalculator = () => {
    const classes = useStyles();
    const [opendrawer,setopendrawer] = useState(false);
    const [state,setstate] = useState({})
    const [loading,setloading] = useState(false)
    const [updaterates,setupdaterates] = useState(false)
    const history = useHistory();
    console.log(state);
    // set updaterates
   const updateRates = async () =>{
    setupdaterates(true)
    
try {
const {data} =  await axios.put(`${url}/user/updatePrice`,state)
 if(data.nModified===0){
  toast.error("All fields are necassary to fill")
  setupdaterates(false)
 }
if(data.nModified===1){
 toast.success("Data updated")
 setupdaterates(false)
}
console.log(data)
} catch (error) {
 console.log(error) 
}
   }
  
    return (
        <div>
        <Toaster/>
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
      <DrawerData opendrawer={opendrawer} setopendrawer={setopendrawer}/>
       {/* navbar ends here */}
       <Grid container style={{padding:"20px"}}> 
        {/*Price calcultor heading */}
        <Grid style={{textAlign:"center"}} item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Typography style={{fontWeight:"bolder",color:"rgb(254,181,2)"}} variant="h4" color="initial">Price Caculator</Typography>
        <Divider style={{backgroundColor:"rgb(254,181,2)",width:"10%",height:"2px",marginLeft:"auto",marginRight:"auto",marginTop:"10px",marginBottom:"10px"}}/>
        </Grid>
        </Grid> 
        {/* price calculator functionality */}
        <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
<Container maxWidth="sm">
<Paper p={3} elevation={9} component={Box}>
{/* 1 marla price field,hidden only on large screens */}
<Hidden only={['md','lg','xl']}>
<br />
<Box>
<Box><Typography variant="h6" color="primary" style={{marginRight:"10px" }}>1 Marla Price:</Typography></Box>  
 <Box ml={4}><TextField onChange={(e)=>setstate({...state,OneMarlaPrice:e.target.value})} placeholder="Price" /></Box>
</Box>
</Hidden>
{/* 1 marla price field:hidden only for small screens */}
<Hidden only={['xs','sm']}>
<Box style={{display:"flex",marginLeft:"60px",marginBottom:"20px"}}>
<Box ><Typography variant="h6" color="primary" style={{marginRight:"10px",maxWidth:"130px"}}>1 Marla Price:</Typography></Box>  
 <Box ml={4}><TextField onChange={(e)=>setstate({...state,OneMarlaPrice:e.target.value})} placeholder="Price" style={{height:"35px",width:"200px"}}/></Box>
</Box>
</Hidden>


{/* 1 marla price small stones:hidden only for large screens */}
<Hidden only={['md','lg','xl']}>
<br />
<Box>
<Box><Typography variant="h6" color="primary" style={{marginRight:"10px"}}>1 Marla Price Bricks:</Typography></Box>  
<Box ml="auto"><TextField onChange={(e)=>setstate({...state,qtyForSmallStones:e.target.value})} InputProps={{ inputProps: { min: 0} }} type="number" placeholder="Quantity Kg" style={{height:"35px",width:"120px",marginRight:"5px"}}/></Box> 
<Box ml="auto"><TextField onChange={(e)=>setstate({...state,SmallStonesPrice:e.target.value})} placeholder="Price" style={{height:"35px",width:"120px"}}/></Box>
</Box>
{/* <Box textAlign="center" style={{border:"1px solid black",marginBottom:"5px"}}><Typography variant="subtitle1" color="secondary">Stones Cost:{state.OneMarlaPrice*state.qtyForSmallStones*state.SmallStonesPrice}/-</Typography></Box> */}
</Hidden>
{/* 1 marla price small stones:hidden only for small screens */}
<Hidden only={['xs','sm']}>
<Box style={{display:"flex",marginLeft:"60px",marginBottom:"20px"}}>
<Box><Typography variant="subtitle1" color="primary" style={{marginRight:"10px",maxWidth:"130px" }}>1 Marla Price Bricks:</Typography></Box>  
<Box ml="auto"><TextField onChange={(e)=>setstate({...state,qtyForSmallStones:e.target.value})} InputProps={{ inputProps: { min: 0} }} type="number" placeholder="Quantity Kg" style={{height:"35px",width:"120px",marginRight:"5px"}}/></Box> 
<Box ml="auto"><TextField onChange={(e)=>setstate({...state,SmallStonesPrice:e.target.value})} placeholder="Price" style={{height:"35px",width:"120px"}}/></Box>
</Box>
{/* <Box textAlign="center" style={{border:"1px solid black",marginBottom:"5px"}}><Typography variant="subtitle1" color="secondary">Stones Cost:{state.OneMarlaPrice*state.qtyForSmallStones*state.SmallStonesPrice}/-</Typography></Box> */}
</Hidden>


{/* 1 marla price for cement:hidden only for large screens  */}
<Hidden only={['md','lg','xl']}>
<br />
<Box>
<Box><Typography variant="h6" color="primary" style={{maxWidth:"130px"}} >1 Marla Price Cement:</Typography></Box>  
<Box ml="auto"><TextField onChange={(e)=>setstate({...state,qtyForCement:e.target.value})} InputProps={{ inputProps: { min: 0} }} type="number" placeholder="Quantity Kg" style={{height:"35px",width:"120px",marginRight:"5px"}}/></Box> 
<Box ml="auto"><TextField onChange={(e)=>setstate({...state,CementPrice:e.target.value})} placeholder="Price" style={{height:"35px",width:"120px"}}/></Box>
</Box>
{/* <Box textAlign="center" style={{border:"1px solid black",marginBottom:"5px"}}><Typography variant="subtitle1" color="secondary">Cement Cost:{state.OneMarlaPrice*state.qtyForCement*state.CementPrice}/- </Typography></Box> */}
</Hidden>
{/* 1 marla price for cement:hidden only for small screens  */}
<Hidden only={['xs','sm']}>
<Box style={{display:"flex",marginLeft:"60px",marginBottom:"20px"}}>
<Box><Typography variant="subtitle1" color="primary" style={{maxWidth:"130px"}} >1 Marla Price Cement:</Typography></Box>  
<Box ml="auto"><TextField onChange={(e)=>setstate({...state,qtyForCement:e.target.value})} InputProps={{ inputProps: { min: 0} }} type="number" placeholder="Quantity Kg" style={{height:"35px",width:"120px",marginRight:"5px"}}/></Box> 
<Box ml="auto"><TextField onChange={(e)=>setstate({...state,CementPrice:e.target.value})} placeholder="Price" style={{height:"35px",width:"120px"}}/></Box>
</Box>
{/* <Box textAlign="center" style={{border:"1px solid black",marginBottom:"5px"}}><Typography variant="subtitle1" color="secondary">Cement Cost:{state.OneMarlaPrice*state.qtyForCement*state.CementPrice}/- </Typography></Box> */}

</Hidden>



{/* 1 marla price for sand:hidden only for large screens  */}
<Hidden only={['md','lg','xl']}>
<br />
<Box>
<Box><Typography variant="h6" color="primary" style={{marginRight:"10px",maxWidth:"130px"}}>1  Marla Price Sand:</Typography></Box>  
<Box ml="auto"><TextField onChange={(e)=>setstate({...state,qtyForSand:e.target.value})} InputProps={{ inputProps: { min: 0} }} type="number" placeholder="Quantity Kg" style={{height:"35px",width:"120px",marginRight:"5px"}}/></Box> 
<Box ml="auto"><TextField onChange={(e)=>setstate({...state,SandPrice:e.target.value})} placeholder="Price" style={{height:"35px",width:"120px"}}/></Box>
</Box>
{/* <Box style={{border:"1px solid black",marginBottom:"5px"}} textAlign="center"><Typography variant="subtitle1" color="secondary">Sand Cost:{state.OneMarlaPrice*state.qtyForSand*state.SandPrice}/- </Typography></Box> */}

</Hidden>
{/* 1 marla price for sand hidden only for small screens */}
<Hidden only={['xs','sm']}>
<Box style={{display:"flex",marginLeft:"60px",marginBottom:"20px"}}>
<Box><Typography variant="subtitle1" color="primary" style={{marginRight:"10px",maxWidth:"130px"}}>1  Marla Price Sand:</Typography></Box>  
<Box ml="auto"><TextField onChange={(e)=>setstate({...state,qtyForSand:e.target.value})} InputProps={{ inputProps: { min: 0} }} type="number" placeholder="Quantity Kg" style={{height:"35px",width:"120px",marginRight:"5px"}}/></Box> 
<Box ml="auto" ><TextField onChange={(e)=>setstate({...state,SandPrice:e.target.value})} placeholder="Price" style={{height:"35px",width:"120px"}}/></Box>
</Box>
{/* <Box style={{border:"1px solid black",marginBottom:"5px"}} textAlign="center"><Typography variant="subtitle1" color="secondary">Sand Cost:{state.OneMarlaPrice*state.qtyForSand*state.SandPrice}/- </Typography></Box> */}

</Hidden>
{/* save your record */}
<Box textAlign="right"
>

&nbsp;
{updaterates?<Button
startIcon={<Loader size="10"/>}
style={{backgroundColor:"rgb(254,181,2)"}}
variant="contained"
>Saving...</Button>:<Button
onClick={updateRates}
startIcon={<Update fontSize="small"/>}
style={{backgroundColor:"rgb(254,181,2)"}}
variant="contained"
>Update Rates</Button>}
</Box>
</Paper>
</Container>
            </Grid>
        </Grid>
        </div>
    )
}

export default PriceCalculator
