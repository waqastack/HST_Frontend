import React from 'react'
import {Button,Grid,Typography,makeStyles} from "@material-ui/core";
const useStyeles = makeStyles(theme=>({
  responsive:{
    [theme.breakpoints.down('xs')]:{
      fontSize:"80%",
    }
  }
}))
const Cost = () => {
  const classes = useStyeles()
  return (
      <div className="main" style={{marginTop:"20px"}}>
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{paddingLeft:"15%",marginTop:"5%"}}>
      <Typography
variant="h4"
style={{color:"white"}}    
  >
   Want to know the Cost of a Project?
  </Typography>
  <br/>
  <Typography variant="body2" style={{color:"white",fontSize:"10px",marginBottom:"40px"}}  >
  Lorem ipsum dolor sit amet, consectetur adipiscing elit
  , sed do eiusmod tempor <br/>  incididunt ut labore et 
  dolore magna aliqua.

  </Typography>
      
      <br/>
  <Button
    variant="contained"
    size="small"
    style={{
      backgroundColor: "rgb(254,181,2)",
      borderRadius: "0px",
      color: "black",
    }}
  >
    Calculate my Price
  </Button>
      </Grid>
    </Grid>
    </div> 
   
  )
}

export default Cost;