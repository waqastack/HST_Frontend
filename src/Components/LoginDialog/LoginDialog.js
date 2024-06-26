import React, { useEffect, useState } from "react";
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

const LoginDialog = ({open,setOpen,Opentwo,setOpentwo}) => {
    const [state, setstate] = useState();
    const [loading, setloading] = useState(false);
   const user = localStorage.getItem("user")
useEffect(()=>{
},[user])
    const setupsignup =()=>{
        setOpen(false)
        setOpentwo(true)
      }
 //singn in user
 const userSignsin = async () => {
    setloading(true);
    const { data } = await axios.post(
      `${url}/user/signin`,
      state
    );
    setloading(false);
    if (data.success) {
      localStorage.setItem("user", data.user);
      toast.success("Thanks for login");
      setOpen(false)
      window.location.reload()
    }
    if (data.err) {
      toast.error("Invalid email or passoword");
    }
  };
  

    return (
        <div>
            <Dialog
        onClose={()=> setOpen(false)}
        aria-labelledby="simple-dialog-title"
        open={open}
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
                Sign In
              </Typography>
              <Box style={{ marginLeft: "300px", marginTop: "-35px" }}>
                <IconButton
                  style={{ padding: "0px" }}
                  onClick={() => setOpen(false)}
                >
                  <Close />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </DialogTitle>

        <Divider />
        <DialogContentText>
          <div>
            <Container maxWidth="md">
              <Box mt={1} textAlign="center">
                <br />
                <Input
                  fullWidth
                  onChange={(e) =>
                    setstate({ ...state, email: e.target.value })
                  }
                  type="email"
                  endAdornment={
                    <MailOutlineIcon color="primary" fontSize="small" />
                  }
                  placeholder="Enter Email"
                  style={{ marginBottom: "15px" }}
                  required="true"
                />
                <br />
                <Input
                  style={{ marginBottom: "5px" }}
                  fullWidth
                  onChange={(e) =>
                    setstate({ ...state, password: e.target.value })
                  }
                  endAdornment={
                    <VisibilityOffIcon color="primary" fontSize="small" />
                  }
                  type="password"
                  placeholder="Enter Password"
                />
                <br />
                <br />
                {loading ? (
                  <Button
                    style={{
                      marginBottom: "10px",
                      color: "black",
                      backgroundColor: "rgb(254,181,2)",
                    }}
                    color="primary"
                    fullWidth
                    startIcon={<ClipLoader size="10" color="black" />}
                  >
                    Signing in...
                  </Button>
                ) : (
                  <Button
                    style={{
                      marginBottom: "10px",
                      color: "black",
                      backgroundColor: "rgb(254,181,2)",
                    }}
                    color="primary"
                    fullWidth
                    onClick={userSignsin}
                  >
                    Sign in
                  </Button>
                )}
                <br />
                <Typography variant="body1h1" color="initial">
                  Not Already have an account?
                </Typography>{" "}
                &nbsp;
                <Button
                  onClick={setupsignup}
                  color="primary"
                  size="small"
                  style={{ marginBottom: "10px" }}
                  variant="outlined"
                >
                  Sign up
                </Button>
              </Box>
            </Container>
          </div>
        </DialogContentText>
      </Dialog>
        </div>
    )
}

export default LoginDialog
