import React from 'react'
import {Button, Container,Grid,Typography,makeStyles} from "@material-ui/core";
const useStyeles = makeStyles(theme=>({
  responsive:{
    [theme.breakpoints.down('xs')]:{
      fontSize:"80%",
    }
  }
}))
const Body = () => {
  const classes = useStyeles()
  return (
      <div className="main" >
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{padding:"50px"}}>
      <Typography
        style={{marginBottom:"15px",color:"white"}}
        id="text"
        variant="h4"
      >
        Welcome to  <br/> HST Construction
      </Typography>
      <Typography
      className={classes.responsive}
      style={{width:"90%",marginBottom:"15px",color:"white"}}
        >
        {/* Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit.
        Vestibulum libero eget <br /> ligulaa nec, maximus interdum augue. */}
      </Typography>
      {/* <Button
      className={classes.responsive}
        variant="contained"
        size="small"
        id="text3"
        style={{
          backgroundColor: "rgb(254,181,2)",
          borderRadius: "0px",
          color: "black",
        }}
      >
        Learn more
      </Button> */}
      </Grid>
    </Grid>
    </div> 
   
  )
}

export default Body;