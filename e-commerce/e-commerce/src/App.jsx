import React from 'react'

import Home from './Pages/Home/Home'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import Nav from "./components/nav/Nav"

import Footer from "./components/Footer/footer"

import Shop from './Pages/Shop/shop'

import Cart from './Pages/cart/cart'

import Contact from './Pages/Contact/Contact'

import ProductDetails from "./Pages/ProductDetails";

import Login from "./Pages/Login/Login";

import Checkout from "./Pages/Checkout.jsx"

import OrderSuccess from "./Pages/OrderSuccess"

import Signup from "./Pages/Signup/Signup";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {

  return (

    <>

      <BrowserRouter>

        <Nav />

        <Routes>

          <Route
            path='/'
            element={<Home />}
          />

          <Route
            path='/shop'
            element={<Shop />}
          />

          <Route
            path='/cart'
            element={<Cart />}
          />

          <Route
            path='/contact'
            element={<Contact />}
          />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/ordersuccess"
            element={<OrderSuccess />}
          />

        <Route
         path="/signup"
          element={<Signup />}
           />
        </Routes>

        <Footer />

        <ToastContainer />

      </BrowserRouter>

    </>
  )
}

export default App