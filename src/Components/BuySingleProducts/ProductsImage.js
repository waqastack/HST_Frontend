import React,{useEffect} from "react";
import { Grid, Typography } from "@material-ui/core";
import "../BuySingleProducts/ProductsImg.css";
const ProductsImage = () => {
  useEffect(()=>{
    window.scrollTo(0, 0)
  },[])
  return (
    <div className="main2">
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{ padding: "50px" }}
        >
          <Typography
            style={{
              marginBottom: "15px",
              color: "white",
              textAlign: "center",
            }}
            id="text"
            variant="h3"
          >
            Products Details
          </Typography>
          
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductsImage;
