

import React ,{useEffect,useRef,useContext} from 'react'
import StepperComp from './Stepper';

import {useSelector,useDispatch} from "react-redux";
import MetaData from "../layout/metaData";
import  { AlertMessagesContext } from 'react-alert-messages';
import {motion} from "framer-motion";

import axios from "axios";


import {
   CardNumberElement,
   CardCvcElement,
   CardExpiryElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { clearErrors, createOrder} from '../../actions/orderActions';



// 4000003560000008  use this card number (indian)


export default function Payment({history}) {



    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const payBtn = useRef(null);
     
    const elements = useElements();
    const stripe = useStripe();
    const dispatch = useDispatch();
    const {shippingInfo,cartItems} = useSelector((state)=>state.cart);
    const {user} = useSelector((state)=>state.user);
    const {error} = useSelector((state)=>state.newOrder);
    const { postAlertMessage } = useContext(AlertMessagesContext);

    
    // console.log(user);

    

    const paymentData = {
      amount: Math.round(orderInfo.totalPrice * 100),
    };

    const order = {
      shippingInfo,
      orderItems:cartItems,
      itemsPrice: orderInfo.subtotal,
      taxPrice:orderInfo.tax,
      shippingPrice:orderInfo.shippingCharges,
      totalPrice:orderInfo.totalPrice
      // paymentInfo niche h woh (jab paymentIntent is true)
    }

    const submitHandler = async (e) =>{
      e.preventDefault();

      payBtn.current.disabled = true;

      try {
         const config = {
           headers:{
             "Content-Type":"application/json",
           },
         };

         const {data} = await axios.post("api/v1/payment/process",
          paymentData,
          shippingInfo,
          config
         );


         const client_secret = data.client_secret;


         if(!stripe || !elements) return ;

         const result = await stripe.confirmCardPayment(client_secret,{
           payment_method:{
             card:elements.getElement(CardNumberElement),
             billing_details:{
               name:user.name,
               email:user.email,
               address:{
                 line1:shippingInfo.address,
                 city:shippingInfo.city,
                 state:shippingInfo.state,
                 postal_code:shippingInfo.pinCode,
                 country:shippingInfo.country,
               }
             }
           }
         });

          

         if(result.error){
          payBtn.current.disabled = false;
         }else{

           
           if(result.paymentIntent){
             
             
             order.paymentInfo = {
               id:result.paymentIntent.id,
               status:result.paymentIntent.status
             }

             console.log(order);

             dispatch(createOrder(order));


             history.push('/success');
             window.location.reload(true);
           }
           else{
            postAlertMessage({ text: "There is some issue , while processing the payment"});
           }
         }

      }catch(error){
        
        payBtn.current.disabled = false;
        postAlertMessage({ text: error.response.data.message});
        console.log(error);

      }

    }

    useEffect(()=>{

      if(error){
        postAlertMessage({ text:error.response.data.message});
        dispatch(clearErrors())
      }
    },[dispatch,postAlertMessage,error])


  return (
      <>
      <MetaData title = "Payment"/>
    <div className = "container mx-auto py-[9.6rem] text-[2.4rem] flex flex-col justify-center items-center gap-[4.4rem]">
        <h2 className = "text-[4.4rem] z-[1000] font-semibold ">Payment</h2>
        <StepperComp activeStep= {2}/>

        <section className = "">
            <form className = "paymentForm flex flex-col justify-center items-center gap-[2.4rem] max-w-screen-lg bg-[#fbfbfb] rounded-[5rem] p-[2.4rem]" onSubmit = {(e)=>submitHandler(e)}>
                
                <h3 className = "text-[#777] text-[2.4rem]">Card Info</h3>
                <div className = " flex justify-center items-center gap-[1.6rem] w-[450px]">
                  <ion-icon class = "h-[3.2rem] w-[3.2rem]"name="card-outline"></ion-icon>
                  <CardNumberElement className = "border-[1px] w-[300px] h-[3.2rem] rounded-[5rem] " />
                </div>
                <div className = "flex justify-center items-center gap-[1.6rem]">
                 <ion-icon class = "h-[3.2rem] w-[3.2rem]"name="card-outline"></ion-icon>
                 <CardExpiryElement className = "border-[1px] w-[300px] h-[3.2rem] rounded-[5rem]" />
                </div>
                <div className = "flex justify-center items-center gap-[1.6rem]">
                 <ion-icon class = "h-[3.2rem] w-[3.2rem]"name="card-outline"></ion-icon>
                 <CardCvcElement  className = "border-[1px] w-[300px] h-[3.2rem] rounded-[5rem]"/>
                </div>

                <motion.input whileHover= {{scale:1.04}} className = "add-to-cart login--btn h-[5.4rem] w-[200px] bg-[rgb(14,14,14)] text-[#fff] rounded-[5rem] hover:bg-[#c7d6d5] hover:text-[rgb(14,14,14)]  mb-[4.4rem] cursor-pointer"
                        // onClick = {(e)=>switchTabs(e,"login")}
                        type = "submit"
                        value = {`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref = {payBtn}
                />
            </form>

        </section>
    </div>
    </>
  )
}
