import React, { useEffect, useState } from "react";
import {  grey } from "@material-ui/core/colors";
import ReactTOPdf from "react-to-pdf"
import {
   Timer,Print
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {url} from "../../Api/ApiRoutes"
import {
  Box,
  Grid,
  Paper,
  Container,
  Typography,
  Divider,
  Button,
  makeStyles,
  TextField,  
  Hidden,
  CircularProgress
} from "@material-ui/core";
import toast, { Toaster } from "react-hot-toast";
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
  
const UserPriceCalculator = () => {
    const classes = useStyles();
     const [state,setstate] = useState({})
     const [data,setdata] = useState({})
    const [loading,setloading] = useState(false)
    const [loadings,setloadings] = useState(false)
    const ref = React.createRef();
    useEffect(()=>{
        getCalData()
    },[])
    var nan = isNaN(state.mymarlas*data.SmallStonesPrice*data.SmallStonesPrice)
    var nan1 = isNaN(state.mymarlas*data.CementPrice*data.CementPrice )
    var nan2 = isNaN(state.mymarlas*data.SandPrice*data.SandPrice)
    var nan3 = isNaN(state.mymarlas*data.SmallStonesPrice*data.SmallStonesPrice+state.mymarlas*data.CementPrice*data.CementPrice+state.mymarlas*data.SandPrice*data.SandPrice)
    
    async function getCalData (){
  try {
    setloadings(true)
    const {data} = await axios.get(`${url}/user/getDataCalc`)
    setdata(data[0])
    setloadings(false)

  } catch (error) {
    console.log(error)
}
    }
    const history = useHistory();
    console.log(state);
// total amount
    const calculate = () => {
    setloading(true)     
  }

// main
    return (
        <div>
        <Toaster/>
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
<Paper ref={ref} p={3} elevation={9} component={Box}>
{/* 1 marla price field,hidden only on large screens */}
<Hidden only={['md','lg','xl']}>
<br />

</Hidden>
{/* 1 marla price field:hidden only for small screens */}

<Hidden only={['xs','sm']}>
<Box style={{display:"flex",marginLeft:"60px",marginBottom:"20px"}}>
<Box ><Typography variant="h6" color="primary" style={{marginRight:"10px",maxWidth:"130px"}}>1 Marla Price:</Typography></Box>  
{
 loadings?<p><CircularProgress/></p>:
  <Box ml={4}><TextField disabled defaultValue={data.OneMarlaPrice} placeholder="Price" style={{height:"35px",width:"200px"}}/></Box>

}
</Box>
</Hidden>
<Hidden only={['md','lg','xl']}>
<Box style={{display:"flex",marginLeft:"60px",marginBottom:"20px"}}>
<Box ><Typography variant="h6" color="primary" style={{marginRight:"10px",maxWidth:"130px"}}>1 Marla Price:</Typography></Box>  
{
 loadings?<p><CircularProgress/></p>:
  <Box ml={4}><TextField disabled defaultValue={data.OneMarlaPrice} placeholder="Price" style={{height:"35px",width:"200px"}}/></Box>
}
</Box>
</Hidden>

<Hidden only={['md','lg','xl']}>
<Box textAlign="center"><Typography variant="h6" color="primary" >Enter your marlas:</Typography></Box>  
<Box textAlign="center"><TextField onChange={(e)=>setstate({...state,mymarlas:e.target.value})} InputProps={{ inputProps: { min: 0} }} type="number" placeholder="Your Marla" style={{height:"35px",width:"120px",marginRight:"5px"}}/></Box> 
</Hidden>
{/* 1 marla price small stones:hidden only for large screens */}
<Hidden only={['md','lg','xl']}>
<br />
<Box>
<Box><Typography variant="h6" color="primary" style={{marginRight:"10px"}}>1 Marla Price Bricks:</Typography></Box>  
<Box ml="auto"><TextField placeholder="No of bricks" onChange={(e)=>setstate({...state,qtyForSmallStones:e.target.value})} value={state.mymarlas*100} InputProps={{ inputProps: { min: 0} }} type="number" placeholder="Quantity Kg" style={{height:"35px",width:"120px",marginRight:"5px"}}/></Box> 
{loadings?<CircularProgress/>:<Box ml="auto"><TextField disabled defaultValue={data.SmallStonesPrice}   placeholder="Price" style={{height:"35px",width:"120px"}}/></Box>
}
 </Box>
<Box textAlign="center" style={{border:"1px solid black",marginBottom:"5px"}}><Typography variant="subtitle1" color="secondary">
Bricks Cost:{nan?0:state.mymarlas*data.SmallStonesPrice*data.SmallStonesPrice}/-</Typography></Box>
</Hidden>

<Box mb={5}>
{/* enter how many marlas you have */}


<Hidden only={['xs','sm']}>
<Box textAlign="center"><Typography variant="h6" color="primary" >Enter your marlas:</Typography></Box>  
<Box textAlign="center"><TextField onChange={(e)=>setstate({...state,mymarlas:e.target.value})} InputProps={{ inputProps: { min: 0} }} type="number" placeholder="Your Marla" style={{height:"35px",width:"120px",marginRight:"5px"}}/></Box> 
</Hidden>
{/* end enter how many marlas do u have */}
 </Box>

{/* 1 marla price small stones:hidden only for small screens */}
<Hidden only={['xs','sm']}>
<Box style={{display:"flex",marginLeft:"60px",marginBottom:"20px"}}>
<Box><Typography variant="subtitle1" color="primary" style={{marginRight:"10px",maxWidth:"130px" }}>1 Marla Price Bricks:</Typography></Box>  
<Box ml="auto"><TextField  placeholder="No of bricks"
onChange={(e)=>setstate({...state,qtyForSmallStones:e.target.value})} InputProps={{ inputProps: { min: 0} }} type="number" value={state.mymarlas*100} disabled style={{height:"35px",width:"120px",marginRight:"5px"}}/></Box> 
{/* {loadings?<CircularProgress/>:<Box ml="auto"><TextField disabled defaultValue={data.SmallStonesPrice}   placeholder="Price" style={{height:"35px",width:"120px"}}/></Box>
} */}
</Box>
<Box textAlign="center" style={{border:"1px solid black",marginBottom:"5px"}}><Typography variant="subtitle1" color="secondary">Bricks Cost:{nan?0:state.mymarlas*data.SmallStonesPrice*data.SmallStonesPrice}/-</Typography></Box>
</Hidden>

{/* 1 marla price for cement:hidden only for large screens  */}
<Hidden only={['md','lg','xl']}>
<br />
<Box>
<Box><Typography variant="h6" color="primary" style={{maxWidth:"130px"}} >1 Marla Price Cement:</Typography></Box>  
<Box ml="auto"><TextField onChange={(e)=>setstate({...state,qtyForCement:e.target.value})} disabled value={state.mymarlas*data.CementPrice} InputProps={{ inputProps: { min: 0} }} type="number"   disabled style={{height:"35px",width:"120px",marginRight:"5px"}}/></Box> 
{/* {loadings?<p>l<CircularProgress/></p>:<Box ml="auto"><TextField disabled defaultValue={data.CementPrice}  placeholder="Price" style={{height:"35px",width:"120px"}}/></Box>
} */}
 </Box>
<Box textAlign="center" style={{border:"1px solid black",marginBottom:"5px"}}><Typography variant="subtitle1" color="secondary">
Cement Cost:{nan1?0:state.mymarlas*data.CementPrice*data.CementPrice }/- </Typography></Box>
</Hidden>
{/* 1 marla price for cement:hidden only for small screens  */}
<Hidden only={['xs','sm']}>
<Box style={{display:"flex",marginLeft:"60px",marginBottom:"20px"}}>
<Box><Typography variant="subtitle1" color="primary" style={{maxWidth:"130px"}} >1 Marla Price Cement:</Typography></Box>  
<Box ml="auto"><TextField onChange={(e)=>setstate({...state,qtyForCement:e.target.value})} disabled value={state.mymarlas*data.CementPrice} InputProps={{ inputProps: { min: 0} }} type="number" placeholder="Quantity Kg" style={{height:"35px",width:"120px",marginRight:"5px"}}/></Box> 
{/* {loadings?<p>l<CircularProgress/></p>:<Box ml="auto"><TextField disabled defaultValue={data.CementPrice}  placeholder="Price" style={{height:"35px",width:"120px"}}/></Box>
} */}



</Box>
<Box textAlign="center" style={{border:"1px solid black",marginBottom:"5px"}}><Typography variant="subtitle1" color="secondary">
Cement Cost:{nan1?0:state.mymarlas*data.CementPrice*data.CementPrice}/- </Typography></Box>

</Hidden>



{/* 1 marla price for sand:hidden only for large screens  */}
<Hidden only={['md','lg','xl']}>
<br />
{/* state.mymarlas*data.CementPrice*data.CementPrice */}
<Box>
<Box><Typography variant="h6" color="primary" style={{marginRight:"10px",maxWidth:"130px"}}>1  Marla Price Sand:</Typography></Box>  
<Box ml="auto"><TextField disabled value={state.mymarlas*data.SandPrice} onChange={(e)=>setstate({...state,qtyForSand:e.target.value})} InputProps={{ inputProps: { min: 0} }} type="number" placeholder="Quantity Kg" style={{height:"35px",width:"120px",marginRight:"5px"}}/></Box> 
{/* {loadings?<p>l<CircularProgress/></p>:<Box ml="auto" ><TextField  disabled defaultValue={data.SandPrice} placeholder="Price" style={{height:"35px",width:"120px"}}/></Box>
} */}
</Box>
<Box style={{border:"1px solid black",marginBottom:"5px"}} textAlign="center"><Typography variant="subtitle1" color="secondary">Sand Cost:{ nan2 ?0:state.mymarlas*data.SandPrice*data.SandPrice}/- </Typography></Box>

</Hidden>
{/* 1 marla price for sand hidden only for small screens */}
<Hidden only={['xs','sm']}>
<Box style={{display:"flex",marginLeft:"60px",marginBottom:"20px"}}>
<Box><Typography variant="subtitle1" color="primary" style={{marginRight:"10px",maxWidth:"130px"}}>1  Marla Price Sand:</Typography></Box>  
<Box ml="auto"><TextField disabled value={state.mymarlas*data.SandPrice}  onChange={(e)=>setstate({...state,qtyForSand:e.target.value})} InputProps={{ inputProps: { min: 0} }} type="number" placeholder="Quantity Kg" style={{height:"35px",width:"120px",marginRight:"5px"}}/></Box> 
{/* {loadings?<p>l<CircularProgress/></p>:<Box ml="auto" ><TextField  disabled defaultValue={data.SandPrice} placeholder="Price" style={{height:"35px",width:"120px"}}/></Box>
} */}
</Box>
<Box style={{border:"1px solid black",marginBottom:"5px"}} textAlign="center"><Typography variant="subtitle1" color="secondary">
Sand Cost:{nan2 ?0:state.mymarlas*data.SandPrice*data.SandPrice}/- </Typography></Box>

</Hidden>
{/* save your record */}
<Box textAlign="right"
>
<Button
onClick={calculate}
startIcon={<Timer fontSize="small"/>}
style={{backgroundColor:"rgb(254,181,2)",borderRaduis:"0px"}}
variant="contained"
>Calculate Total</Button>

</Box>
{ !loading?null:
<div>
<Box my={2} style={{border:"1px solid black"}}> <Typography variant="subtitle1" color="secondary">
Total amount:
{nan3?0:state.mymarlas*data.SmallStonesPrice*data.SmallStonesPrice+state.mymarlas*data.CementPrice*data.CementPrice+state.mymarlas*data.SandPrice*data.SandPrice}</Typography>
</Box>
<ReactTOPdf targetRef={ref} >
          {({ toPdf }) => 
          <Button
          startIcon={<Print fontSize="small"/>}
          style={{borderRaduis:"0px"}}
          onClick={toPdf}
      size="small"
      variant="outlined"
       color="primary">Print PDF</Button>
          }
        </ReactTOPdf>
        </div>
}
</Paper>
</Container>
            </Grid>
        </Grid>
        </div>
    )
}

export default UserPriceCalculator;
