import React,{useState} from "react";
import { Box, Container, Input,Typography, Paper, Button,Dialog,DialogTitle,DialogContent,DialogActions,TextareaAutosize,makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme)=>({
DialogbackProps:{
backdropFilter:"blur(5px)"
}
}))
const Help = () => {
    const classes = useStyles();
    const [open, setopen] = useState(false)
    return (
    <div>
    {/* Send a message */}
    <Dialog
     open={open}
     BackdropProps={{
    classes:{root:classes.DialogbackProps}
     }}
     onClose={()=>setopen(false)}
    >
        <DialogTitle><Typography variant="h5" style={{color:"rgb(254,181,2)"}}>Send A Message</Typography></DialogTitle>
        <DialogContent>
<Box p={3}>
<Box mb={1}> <Input placeholder="Name"/></Box>
<Box mb={1}> <Input placeholder="Email"/></Box>
<Box mb={1}> <TextareaAutosize rowsMin={5} placeholder="Message"/></Box>
</Box>

        </DialogContent>
        <DialogActions>
            <Button variant="contained" style={{background:"rgb(254,181,2)",borderRadius:"0px"}}>Send Message</Button>
        </DialogActions>
    </Dialog>
      <Container maxWidth="md">
        <Paper elevation={2} style={{ borderRadius: "0px" }}>
          <Box p={1} my={2} textAlign="center">
            <Typography style={{ color: "rgb(254,181,2)" }} variant="h4">
              Help Center
            </Typography>
          </Box>
        </Paper>
      </Container>

      <Container maxWidth="md">
        <Paper elevation={2} style={{ borderRadius: "0px" }}>
          <Box my={2} ml={3}>
            <Typography variant="h6">Welcome to the Help Center</Typography>
          </Box>
          <Box ml={3}>
            <Typography style={{ paddingBottom: "5px" }} variant="body2">
              We're available 24 hours a day.
            </Typography>
          </Box>
        </Paper>
      </Container>

      <Container maxWidth="md">
        <Paper elevation={2} style={{ borderRadius: "0px" }}>
          <Box my={2} ml={3}>
            <Typography variant="h6">Contact Customer Service</Typography>
          </Box>
          <Box ml={3} mb={3}>
            <Typography style={{ paddingBottom: "5px" }} variant="body2">
              Sign in to call or chat with us – we’re always available.
            </Typography>
          </Box>
          <Container maxWidth="md">
            <Button
              onClick={()=>setopen(true)}
              variant="contained"
              fullWidth
              style={{
                backgroundColor: "rgb(254,181,2)",
                borderRadius: "0px",
                fontSize: "18px",
              }}
            >
              Contact Us
            </Button>
          </Container>
        </Paper>
      </Container>
    </div>
  );
};

export default Help;
