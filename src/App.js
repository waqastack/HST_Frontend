import "./App.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Navbar from "./Components/Navbar/Navbar";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Body from "./Components/Body/Body";
import About from "./Components/About us/About";
import Service from "./Components/Services/Service";
import Products from "./Components/OurProducts/Products";
import Cost from "./Components/Cost/Cost";
import Client from "./Components/ClientsTestominal/Client";
import Footer from "./Components/Footer/Footer";
import SimilarProducts from "./Components/BuySingleProducts/SimilarProducts";
import SingleProduct from "./Components/BuySingleProducts/SingleProduct";
import Admin from "./Components/Admin/Admin";
import Users from "./Components/UserPanel/Users";
import PriceCalcutor from "./Components/BuySingleProducts/CalculatePrice";
import ProductPanel from "./Components/UserPanel/ProductPanel";
import Dashboard from "./Components/UserDashboard/Dashboard";
import ProductsImage from "./Components/BuySingleProducts/ProductsImage";
import CardAddedItems from "./Components/CartAddedItems/CartAddedItems";
import AdminServices from "./Components/AdminServices/AdminServices";
import SingleServiceDetails from "./Components/Services/SingleServiceDetails";
import SeeAllProducts from "./Components/SeeAllProducts/SeeAllProducts";
import PriceCalculator from "./Components/PriceCalculator/PriceCalculator";
import UserPriceCalculator from "./Components/PriceCalculatorUser/UserPriceCalculator";
import Help from "./Components/Help/Help";
import PurchasedOrders from "./Components/Admin/PurchasedOrders";
import ImageCrud from "./Components/Admin/ImageCrud";
const font = "'Roboto', sans-serif;";
const theme = createMuiTheme({
  typography: {
    fontFamily: font,
    button: {
      textTransform: "capitalize",
    },
  },
});
function App() {
  const user = localStorage.getItem("user");
  useEffect(() => {}, [user]);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Route exact path="/">
            <Navbar />
            <Body />
            <About />
            <Service />
            <Products />
            <Cost />
            {/* <Client /> */}
            <Footer />
          </Route>
          <Route exact path="/BuyProducts/:id">
            <Navbar />
            <ProductsImage />
            <SingleProduct />
            <SimilarProducts />
            <PriceCalcutor />
            <Footer />
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route exact path="/admin/users">
            <Users />
          </Route>
          <Route exact path="/admin/products">
            <ProductPanel />
          </Route>
          <Route exact path="/userDashboard">
            <Dashboard />
          </Route>
          <Route exact path="/YourItems">
            <Navbar />
            <CardAddedItems />
          </Route>
          <Route exact path="/seeAllproducts">
            <Navbar />
            <SeeAllProducts />
            <Footer />
          </Route>

          {/* user price calculator */}

          <Route exact path="/calculatePrice">
            <Navbar />
            <UserPriceCalculator />
            <Footer />
            {/* see all pt */}
          </Route>

          <Route exact path="/admin/services">
            <AdminServices />
          </Route>
          <Route exact path="/admin/purchased">
            <PurchasedOrders />
          </Route>
          <Route exact path="/admin/priceCalculator">
            <PriceCalculator />
          </Route>
          <Route exact path="/singleservice/:id">
            <SingleServiceDetails />
          </Route>
          {/* about us nav page */}
          <Route exact path="/about us">
            <Navbar />
            <About />
            <Footer />
          </Route>
          <Route exact path="/help">
            <Navbar />
            <Help />
            <Footer />
          </Route>
          <Route exact path="/services">
            <Navbar />
            <Service />
            <Footer />
          </Route>
          <Route exact path="/products">
            <Navbar />
            <Products />
            <Footer />
          </Route>
          {/* image crud */}
          <Route exact path="/admin/image">
          <ImageCrud/>
          </Route>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
