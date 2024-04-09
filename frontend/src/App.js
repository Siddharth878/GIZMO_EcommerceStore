import "./App.css";
// import Header from "./components/layout/Header.js";
// import Footer from "./components/layout/Footer.js";
import Home from "./components/home/Home.js";
import ProductDetails from "./components/products/ProductDetails";
import ShopProducts from "./components/products/shopProducts";

import LoginSignUp from "./components/users/loginSignUp"
import UserAccount from './components/users/userAccount'
import UpdateProfile from './components/users/updateProfile'
import UpdatePassword from './components/users/updatePassword'
import ForgotPassword from './components/users/forgotPassword'
import ResetPassword from './components/users/resetPassword'
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/confirmOrder'
import Payment from './components/cart/payment'
import OrderSuccess from './components/cart/orderSuccess'
import MyOrders from './components/orders/myOrders'
import OrderDetails from './components/orders/orderDetails'
import AboutMeCard from './components/layout/aboutMeCard'


import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AlertMessagesProvider from "react-alert-messages";
import axios from "axios";






/*  now react - router update hogya tha
import {
  BrowserRouter as Router,
  Routes,// Switch is replaced with Routes -- in v6 
  Route,
  // Link,
  // createBrowserRouter,
  // RouterProvider,
} from "react-router-dom";*/


import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes
} from "react-router-dom";
import { loadUser } from "./actions/userActions";
import { createBrowserHistory } from "@remix-run/router";








const history = createBrowserHistory({});

// yeh hard code isley krdi kyunki hoisting walla scene kaam nahi kr rha ( router pehle define hua h , wahn usne stripeApiKey mangi thi -- wahn empty thi )
let stripeApiKey = "pk_test_51OaO5fSA2MkXqf1K8eK0rC9pUYyzTrru70uSR4kiF4JZSNVifRJSm4WSLAmEQZKOw9pyn550ex7flx0rSwPKp7Eb00qAIKCoaW";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    
  },

  {
    path:'/products/:id',
    element:<ProductDetails/>,
    
  },

  {
    path:'/products',
    element:<ShopProducts/>,
  },
  // {
  //   path:'/products/Tech',
  //   element:<ShopProducts category = {'Tech'}/>,
  // },
  // {
  //   path:'/products/Audio',
  //   element:<ShopProducts category = {'Audio'}/>,
  // },
  // {
  //   path:'/products/Gear',
  //   element:<ShopProducts category = {'Gear'}/>,
  // },
  // {
  //   path:'/products/Computers',
  //   element:<ShopProducts category = {'Computers'}/>,
  // },
  {
    path:'/login',
    element:<LoginSignUp history = {history}/>,
  },
  {
    path:'/account',
    element:<UserAccount  history = {history} />
  },
  {
    path:'/me/updateMe',
    element : <UpdateProfile history = {history} />
  },
  {
    path:'/me/updatePassword',
    element : <UpdatePassword history = {history} />
  },
  {
    path:'/login/forgotPassword',
    element:<ForgotPassword history = {history} />
  },
  {
    path:'/login/resetPassword/:token',
    element:<ResetPassword history = {history} />
  },
  {
    path:'/cart',
    element:<Cart history = {history} />
  },
  {
    path:'/shipping',
    element:<Shipping history = {history} />
  },
  {
    path:'/OrderConfirm',
    element:<ConfirmOrder history = {history} />
  },
  {
    path:'/payment',
    element:<Elements stripe = {loadStripe(stripeApiKey)}><Payment history = {history}/></Elements>
  },
  {
    path:'/success',
    element:<OrderSuccess history = {history} />
  },
  {
    path:'/myOrders',
    element:<MyOrders history = {history} />
  },
  {
    path:'/order/:id',
    element:<OrderDetails history = {history} />
  },
  {
    path:'/about-me',
    element:<AboutMeCard />
  },
 
]);



// import WebFont from "webfontloader";
// import { useEffect } from "react";





function App() {



  

  // not Working
  // React.useEffect(() => {
  //   WebFont.load({
  //     google: {
  //       families: ["Public sans","Roboto"],
  //     },
  //   });
  // },[]);
   


  
  
  const dispatch = useDispatch();
  const [stripeApiKey,setStripeApiKey] = useState("");



  async function getStripeApiKey(){
    // const {data} = await axios.get("api/v1/stripeApiKey");
    // setStripeApiKey(data.stripeApiKey);

  }



  useEffect(()=>{

    // store se bhi load user dispatch kr skte hein -> store.dispatch(loadUser()) -- aise
    
    dispatch(loadUser())

    getStripeApiKey();
  },[dispatch]);




  



  return(
    <> 

        {/* <Header/> */}

        <AlertMessagesProvider position="top-right" timeout={4000} >
          <RouterProvider router={router}/>
        </AlertMessagesProvider>


        {/* <Footer/> */}
      
    </>
  )
  


}

export default App;
