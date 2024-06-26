import React from 'react'
import {Grid,Typography,Divider, Container, IconButton,Box} from "@material-ui/core";
import {Person} from "@material-ui/icons"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const Client = () => {
    return (
        <div style={{marginTop:"10%",paddingBottom:"5%",backgroundColor:"rgb(254,181,2)"}}>
      <Grid container style={{padding:"20px"}}> 
        {/* services heading */}
        <Grid style={{textAlign:"center"}} item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Typography style={{fontWeight:"bolder"}} variant="h4" color="initial">Our Clients Testimonial</Typography>
        <Divider style={{backgroundColor:"black",width:"10%",height:"3px",marginLeft:"auto",marginRight:"auto",marginTop:"10px",marginBottom:"10px"}}/>
        </Grid>
        </Grid>
        <Container maxWidth="sm">
        {/* carasoul */}
          <Carousel>
          {/* Here One Box One importanat */}
          {/* box1 */}
           <Box>
           <IconButton>
              <Person fontSize="large"/>
            </IconButton>
            <Typography variant="h5" style={{fontWeight:"bold"}}>
            Client 1
            </Typography>
            <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
            </Typography>
            <Typography style={{marginTop:"40px"}}></Typography>
           </Box>
            {/* box 2*/}
           <Box>
           <IconButton>
              <Person fontSize="large"/>
            </IconButton>
            <Typography variant="h5"    style={{fontWeight:"bold"}}>
            Client 2
            </Typography>
            <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
            </Typography>
            <Typography style={{marginTop:"40px"}}></Typography>
           </Box>
            {/* box3 */}
            <Box>
           <IconButton>
              <Person fontSize="large"/>
            </IconButton>
            <Typography variant="h5"    style={{fontWeight:"bold"}}>
            Client 3
            </Typography>
            <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
            </Typography>
            <Typography style={{marginTop:"40px"}}></Typography>
           </Box>
          </Carousel>
          {/* carasoul end */}
        </Container>
        </div>
    )
}

export default Client
