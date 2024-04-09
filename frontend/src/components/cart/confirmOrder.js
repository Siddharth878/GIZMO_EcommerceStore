
import React, { useEffect, useState ,useContext } from 'react'

import  { AlertMessagesContext } from 'react-alert-messages';
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';



import Meta from '../layout/metaData';
import StepperComp from './Stepper';
import OverlayNavbar from '../layout/overlayNavbar';



import { loadUser } from "../../actions/userActions";


export default function ConfirmOrder({history}) {

    
  
    const [bg,setBg] = useState(false);
    const {cartItems,shippingInfo} = useSelector((state)=>state.cart);
    

    const user = useSelector((state)=>state.user.user);
    


    /// Is reduce function ko aur padhna h 
    const subtotal = cartItems.reduce((acc,item)=>acc+item.quantity*item.price,0);
     
    const shippingCharges = subtotal>1000?0:200;
    const tax = subtotal*0.18;

    const totalPrice = subtotal+tax+shippingCharges;


    const proceedToPayment = () =>{
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        }
        


        // Same as local storage bus ( tab close krne pe session reset hojata h)
        sessionStorage.setItem('orderInfo',JSON.stringify(data));
        history.push('/payment');
        window.location.reload(true);


    }

    



  return (
    <div>
      <Meta title = "Confirm Order" />
      <figure className = "" onClick={() => setBg((bg) => !bg)}>
         <OverlayNavbar />
      </figure>

      <div class = {`container max-w-screen-xl flex flex-col justify-center items-center gap-[9.6rem] mx-auto mt-[-17.2rem] mb-[9.6rem] ${bg?"blur-xl":"blue-none"}`}>

        <h2 className = "text-[4.4rem] z-[1000] font-semibold ">Confirm Order</h2>

        <StepperComp activeStep= {1}/>

        <section className = " flex  w-[100%] justify-center items-center gap-[2.4rem]">
            <div className = "shipping-info-cart  w-[60%] flex  flex-col justify-center items-start gap-[2.4rem] border-r-[2px]  border-[rgb(187,187,187)]">
              <h3 className = "text-[4.4rem] mb-[1.6rem] ">Shipping Info</h3>
              <figure className = "user-info flex flex-col items-start justify-center gap-[1.6rem] mb-[2.4rem]">
                  <div className = "flex justify-center items-center gap-[1.6rem] text-[2.4rem]">
                    <p className ="font-semibold">
                        Name : 
                    </p>
                    <p className  = "">
                        {user?user.name:""}
                    </p>
                  </div>
                  <div className = "flex justify-center items-center gap-[1.6rem] text-[2.4rem]">
                    <p className ="font-semibold">
                       Phone No : 
                    </p>
                    <p className  = "">
                        {shippingInfo.phoneNo}
                    </p>
                  </div>
                  <div className = "flex justify-center items-center gap-[1.6rem] text-[2.4rem]">
                    <p className ="font-semibold">
                        Address : 
                    </p>
                    <p className  = "leading-[1.5]">
                        {shippingInfo.address} , {shippingInfo.city},{shippingInfo.state}
                    </p>
                  </div>
              </figure>

               <hr className = "block mb-[2.4rem] w-[90%] container mx-[auto]"/>
            
            
            
              <figure className = " w-[100%] flex flex-col justify-center items-start gap-[2.4rem] ">
                  <h4 className = "text-[3.2rem]">Your Cart</h4>
                  <div className = " w-[100%] flex flex-col items-start justify-center gap-[1.6rem] ">
                        {cartItems && cartItems.map((item)=>(
                          
                       <Link to  = {`/product/${item.product}`}>
                         <figure className = "flex  justify-between  items-center gap-[1.6rem] text-[1.6rem] ">

                             {/* Iski jagh db se nikal ke deni hogi bhai */}
                             <img className  = " h-[14.4rem] w-auto rounded-xl" src = {`IMG/products/${item.image}.jpg`}/> 
                             
                             <div className = "pro-info flex  flex-col items-start justify-center ">

                                 <div className ="flex justify-center items-center gap-[1.6rem]">
                                    <p className = "font-[500]">
                                        Name :
                                    </p>
                                    <p className = "">
                                        {item.name}
                                    </p>
                                 </div>
                                 <div className ="flex justify-center items-center gap-[1.6rem]">
                                    <p className = "font-[500]">
                                        Quantity :
                                    </p>
                                    <p className = "">
                                        {item.quantity}
                                    </p>
                                 </div>
                                 <div className ="flex justify-center items-center gap-[1.6rem]">
                                    <p className = "font-[500]">
                                        Total Price :
                                    </p>
                                    <p className = "">
                                        {item.price*item.quantity}
                                    </p>
                                 </div>
                             </div>
                         </figure>
                       </Link>      
                    ))}
                  </div>
              </figure>
            </div>
            
            
            
            <div className = "order-summary  px-[3.2rem] flex flex-col justify-center items-center gap-[3.2rem]">
                <h3 className = "text-[4.4rem] text-center ">Order Summary</h3>
                <div className = "text-[2.0rem] flex flex-col justify-center items-start gap-[2.4rem]">
                    <div className ="flex justify-center items-center gap-[1.6rem]">
                       <p className = "font-[500]">
                         Subtotal :
                        </p>
                       <p className = "">
                          {subtotal}
                        </p>
                    </div>
                    <div className ="flex justify-center items-center gap-[1.6rem]">
                       <p className = "font-[500]">
                         Shipping Charges :
                        </p>
                       <p className = "">
                          {shippingCharges}
                        </p>
                    </div>
                    <div className ="flex justify-center items-center gap-[1.6rem]">
                       <p className = "font-[500]">
                         GST :
                        </p>
                       <p className = "">
                          {tax}
                        </p>
                    </div>

                    <hr className = "block container mx-[auto]"/>

                    <div className ="flex justify-center items-center gap-[1.6rem] mb-[2.4rem]">
                       <p className = "font-[600]">
                         Total :
                        </p>
                       <p className = "">
                          {totalPrice}
                        </p>
                    </div>
                   

                    <motion.button whileHover= {{scale:1.04}} className = "add-to-cart h-[6.4rem] w-[300px] bg-[rgb(14,14,14)] text-[#fff] rounded-[5rem] hover:bg-[#c7d6d5] hover:text-[rgb(14,14,14)]  mb-[4.4rem]" 
                       onClick = {proceedToPayment}>
                        Proceed To Payment
                    </motion.button>

                
                </div>
            </div>

        </section>
      </div>  
    </div>
  )
}
