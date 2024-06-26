import React from 'react'
import img from "../../images/front.png";
import "./Body.css";
import Typography from "@material-ui/core/Typography";
import { CssBaseline, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  overlay: {
    width: "100%",
    height: "10%",
    top: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 2,
  },
//   color: {
//     position: "absolute",
//     left: "190px",
//     textAlign:"center",
//       },
}));
const BodySingleProduct = () => {
    const classes = useStyles();

    return (
        <div style={{ marginTop: "-10px"}}>
      <CssBaseline />
      <img src={img} className={classes.overlay} alt="" />
      <Typography
        className={classes.color}
        id="text"
        variant="h5"
        color="initial"
      >
        Product Details
      </Typography>
     
    </div>
    )
}

export default BodySingleProduct
