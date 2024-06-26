import React from "react";
import {
  Button,
  Grid,
  Typography,
  CssBaseline,
  makeStyles,
  Container,
} from "@material-ui/core";
import img from "../../images/thump.png";
const useStyles = makeStyles((theme) => ({
  respMarginButton: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: "10px",
    },
  },
}));
const About = () => {
  const classes = useStyles();
  return (
    <div>
      <CssBaseline />
      <Grid container style={{ marginTop: "35px" }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          style={{ textAlign: "center" }}
        >
          <Typography
            variant="h4"
            color="initial"
            style={{ fontWeight: "bolder" }}
          >
            About Us
          </Typography>
          <Container maxWidth="xs">
            <Typography
              variant="subtitle1"
              color="initial"
              style={{ marginBottom: "3px", textAlign: "justify" }}
            >
              HST software is providing services of selling building material
              and construction services and consultancy. We will be building a
              web and mobile app for HTS which will help both the Customer and
              the organization in a better way through android app. We will
              build a system that provide all the necessary facilities like
              ordering different construction material online and delivering the
              money according to the order prize through online medium.
            </Typography>

          </Container>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          style={{ marginBottom: "20px", textAlign: "center" }}
        >
          <img src={img} width="300px" height="auto" alt="" />
        </Grid>
      </Grid>
    </div>
  );
};

export default About;
