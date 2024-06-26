import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { CheckCircleOutline, Close, RateReview } from "@material-ui/icons";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ReactTOPdf from "react-to-pdf";
import { url } from "../../Api/ApiRoutes";
import _ from "lodash";

const Slip = ({ openfour, setopenfour, state }) => {
  const [SlipData, setSlipData] = useState();
  const email = localStorage.getItem("user");
  const ref = React.createRef();
  var dataSet = [];
  useEffect(() => {}, []);

  const closeSlip = async () => {
    saveSlip();
    setopenfour(false);
    toast.success("Thank you for buying our products.Good Luck!");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    try {
      const { data } = await axios.put(
        `${url}/user/aftersalesemptycart/${email}`
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
 

  const saveSlip = async () => {
    // const {data} = await axios.put(`${url}/user/aftersalesemptycart/${email}`)
    try {
      state.map((val, index) => val.qty > 0 && dataSet.push(val));
      toast.success("Thank you for buying our products.Good Luck!");
      const data = await axios.post(`${url}/user/saveSlip/${email}`, dataSet);
      setopenfour(false);
    } catch (error) {
      console.log(error);
    }
  };

  var totalPrice = _.sum(state.map((val) => val.price * val.qty));
  return (
    <div>
      <Toaster />
      <Dialog open={openfour} onClose={closeSlip} ref={ref}>
        <DialogTitle>
          <Box textAlign="left">
            <Typography variant="h5" color="Primary">
              <RateReview />
              Purchased Slip
            </Typography>
            <IconButton
              onClick={closeSlip}
              style={{ marginLeft: "300px", marginTop: "-70px" }}
            >
              <Close />
            </IconButton>
          </Box>
          <Divider style={{ marginTop: "-24px" }} />
          {/* one row */}
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Typography
                variant="h5"
                style={{
                  marginTop: "-40px",
                  color: "rgb(254,170,2)",
                  textTransform: "capitalize",
                }}
              >
                {" "}
              </Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead color="primary">
              <TableRow>
                <TableCell
                  style={{
                    fontSize: "17px",
                    color: "white",
                    background: "#3F51B5",
                  }}
                >
                  Product Image
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "17px",
                    color: "white",
                    background: "#3F51B5",
                  }}
                >
                  Product Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.map(
                (row, index) =>
                  row.qty > 0 && (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        <CheckCircleOutline fontSize="large" color="primary" />{" "}
                        {row.selectedFile ? (
                          <img
                            src={row.selectedFile}
                            width="70px"
                            height="70px"
                            alt=""
                          />
                        ) : (
                          row.title
                        )}
                      </TableCell>
                      <TableCell align="left">Rs.{row.price}/-</TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* {
  state.map((val)=> val.qty>0 && <><Button style={{textAlign:"left",width:"100px"}}><CheckCircleOutline fontSize="small" color="primary"/><img src={val.selectedFile} width="50px" height="50px" alt="" />
  <Divider/></Button>
  <Box ml={2}>Price:<li>{val.price}</li></Box>
   
 <Divider/></>
)
} */}
        {/* thanks message */}

        <Divider />
        <Box>
          <Typography
            variant="body1"
            color="primary"
            style={{ marginLeft: "30px" }}
          >
            Charged amount: {totalPrice} /-
          </Typography>
        </Box>
        <Container></Container>

        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={saveSlip}
          >
            Save
          </Button>

          <ReactTOPdf targetRef={ref}>
            {({ toPdf }) => (
              <Button
                onClick={toPdf}
                size="small"
                variant="outlined"
                color="primary"
              >
                Print PDF
              </Button>
            )}
          </ReactTOPdf>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Slip;
