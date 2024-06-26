import React,{useEffect,useState} from 'react'
import {useParams} from "react-router-dom"
import axios from "axios";
import {url} from "../../Api/ApiRoutes"
import Navbar from '../Navbar/Navbar';
import Footer from "../Footer/Footer"
import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import { FavoriteBorder } from '@material-ui/icons';
import { ClipLoader } from 'react-spinners';

const SingleServiceDetails = () => {
    const [loading, setloading] = useState(null)
    const [update, setupdate] = useState("")
    useEffect(()=>{
        findSingle();
    },[])
    const {id} = useParams();
    async function findSingle() {
        setloading(true);
        const { data } = await axios.get(
          `${url}/user/findSingleservice/${id}`
        );
        setupdate(data.data);
        setloading(false)
      }
      console.log(update);
    return (
        <>
         <Navbar/>
      
        <div style={{background:"rgb(0,8,45)",marginTop:"15px"}}>
       
        <Container maxWidth="">
        {/* first main line */}
        {loading ? (
          <Box textAlign="center" style={{padding:"20px"}}><ClipLoader size="10" color="white" /></Box>
        ) : (
          <Grid container spacing={5} style={{}}>
            {/* first item */}
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
                      {update.title}{" "}
                    </Typography>
                  </Box>
                  <Box ml={4} mt={2}>
                    <Typography
                      style={{ color: "white" }}
                      variant="captionh1"
                      color="initial"

                    >
                      {update.description}
                    </Typography>
                  </Box>
                  <Button variant="contained"
                //   onClick={()=>singleService(val._id)}
                   style={{background:"rgb(254,170,2)",fontSize:"10px",borderRadius:"0px",marginTop:"10px"}}>Details</Button>
                </Box>
              </Grid>
         
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
        <Footer/>
        </>
    )
}

export default SingleServiceDetails
