import React,{useState,useEffect} from 'react'
import { useHistory, NavLink } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import {url} from "../../Api/ApiRoutes"
import {
  Close,
} from "@material-ui/icons";
import {
  Typography,
  Button,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContentText,
  Input,
  Divider,
  Container,
  Grid,
} from "@material-ui/core";
const Register = ({opentwo,setOpentwo}) => {

    const [emailpattern, setemailpattern] = useState(true);
    // const [opentwo, setOpentwo] = useState(false);
    const [stateS, setstateS] = useState();
    const [loadingS, setloadingS] = useState(false);
    const history = useHistory()
    const user = localStorage.getItem("user")
  useEffect(()=>{},[user])
    async function userSignsUp(e) {
        e.preventDefault();
        try {
          setloadingS(true);
          if (stateS.email === undefined) {
            toast.error("Don't left any field empty");
          }
    
          const { data } = await axios.post(
            `${url}/user/signup`,
            stateS
          );
          console.log(data);
          setloadingS(false);
          //here is the error to check whether response data is coming
          //handle this one
          //  setdupUser(data.driver)
          if (data.passerr) {
            toast.error("Password and confirm password must be same");
          }
          if (data.code) {
            toast.error("User already exists try different one");
          }
          if (data.name === "ValidationError") {
            setemailpattern(false);
            toast.error("Put a valid email");
          }
          if (!data.errors && !data.passerr && !data.code) {
            localStorage.setItem("user", data);
            setloadingS(false);
            window.location.reload()
          }
        } catch (error) {
          console.log(error);
          setloadingS(false);
          toast.error("All fields are mandatory to fill");
        }
      }
   


    return (
        <div>
            <Dialog
        onClose={()=>setOpentwo(false)}
        aria-labelledby="simple-dialog-title"
        open={opentwo}
      >
        <Toaster />
        <DialogTitle>
          <Grid container>
            <Grid item>
              <Typography
                variant="h4"
                color="primary"
                style={{ textAlign: "left" }}
              >
                Register
              </Typography>
              <Box style={{ marginLeft: "300px", marginTop: "-35px" }}>
                <IconButton
                  style={{ padding: "0px" }}
                  onClick={() => setOpentwo(false)}
                >
                  <Close />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContentText>
          <Divider />

          <Container>
            <Box mt={1} textAlign="center">
              <br />

              <Input
                fullWidth
                onChange={(e) =>
                  setstateS({ ...stateS, email: e.target.value })
                }
                endAdornment={
                  <MailOutlineIcon color="primary" fontSize="small" />
                }
                type="email"
                placeholder="Enter Email"
                style={{ marginBottom: "10px" }}
                required="true"
              />
              <br />
              <Input
                fullWidth
                onChange={(e) =>
                  setstateS({ ...stateS, password: e.target.value })
                }
                endAdornment={
                  <VisibilityOffIcon color="primary" fontSize="small" />
                }
                type="password"
                placeholder="Enter Password"
                style={{ marginBottom: "10px" }}
                required="true"
              />
              <br />
              <Input
                fullWidth
                onChange={(e) =>
                  setstateS({ ...stateS, cpassword: e.target.value })
                }
                endAdornment={
                  <VisibilityOffIcon color="primary" fontSize="small" />
                }
                type="password"
                placeholder="Confirm Password"
              />

              <br />
              <br />
              {loadingS ? (
                <Button
                  fullWidth
                  style={{
                    marginBottom: "10px",
                    backgroundColor: "rgb(254,181,2)",
                    color: "black",
                  }}
                  color="primary"
                  startIcon={<ClipLoader size="10" color="black" />}
                >
                  Signing up...
                </Button>
              ) : (
                <Button
                  fullWidth
                  style={{
                    marginBottom: "10px",
                    backgroundColor: "rgb(254,181,2)",
                    color: "black",
                  }}
                  color="primary"
                  onClick={userSignsUp}
                >
                  Sign up
                </Button>
              )}
            </Box>
          </Container>
        </DialogContentText>
      </Dialog>
        </div>
    )
}

export default Register
