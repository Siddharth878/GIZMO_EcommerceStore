

import React, { useEffect, useState ,useContext } from 'react'
import OverlayNavbar from '../layout/overlayNavbar';
import StepperComp from './Stepper';
import Meta from '../layout/metaData';

import  { AlertMessagesContext } from 'react-alert-messages';
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';

import {Country,State} from "country-state-city";
import { useDispatch, useSelector } from 'react-redux';
import {saveShippingInfo} from '../../actions/cartActions';



export default function Shipping({history}) {




  const dispatch = useDispatch();
  const { postAlertMessage } = useContext(AlertMessagesContext);
  
  const {shippingInfo} = useSelector((state)=>state.cart);


  const [bg,setBg] = useState(false);

  const [address,setAddress] = useState(shippingInfo.address);
  const [city,setCity] = useState(shippingInfo.city);
  const [state,setState] = useState(shippingInfo.state);
  const [country,setCountry] = useState(shippingInfo.country);
  const [pinCode,setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo,setPhoneNo] = useState(shippingInfo.phoneNo);
  


  const shippingSubmit = (e) =>{
     

    e.preventDefault();

    if(phoneNo.length<10 || phoneNo.length>10){
      postAlertMessage({ text: "Phone Number should be 10 digits" });
      return;
    }


    dispatch(
      saveShippingInfo({address,city,state,country,pinCode,phoneNo})
    );

    history.push('/OrderConfirm');
    window.location.reload(true);
  }

  
  return (
    <div>

      <Meta title = "Shipping" />
      <figure className = "" onClick={() => setBg((bg) => !bg)}>
       <OverlayNavbar />
      </figure>

      <div class = {`container flex flex-col justify-center items-center gap-[9.6rem] mx-auto mt-[-17.2rem]  ${bg?"blur-xl":"blue-none"}`}>

        <h2 className = "text-[4.4rem] z-[1000] font-semibold ">Shipping details</h2>

        <StepperComp activeStep= {0}/>

        <form className = "Shippin--form flex flex-col gap-[2.4rem] justify-center items-center"
              encType = "multipart/form-data"
              onSubmit = {shippingSubmit}>
         

         <div className = "shipping-input-cont   flex justify-center items-center gap-[1.6rem]">
            <ion-icon className ="" name="location-outline"></ion-icon>             
            <input 
                type = "text"
                placeholder = "Address"
                required
                value = {address}
                onChange = {(e)=>setAddress(e.target.value)}
                />
         </div>
         <div className = "shipping-input-cont flex justify-center items-center gap-[1.6rem]">
           <ion-icon className = "" name="home-outline"></ion-icon>
            <input 
                type = "text"
                placeholder = "city"
                required
                value = {city}
                onChange = {(e)=>setCity(e.target.value)}
                />
         </div>
         <div className = "shipping-input-cont flex justify-center items-center gap-[1.6rem]">
            <ion-icon className = "" name="pin-outline"></ion-icon>
            <input 
                type = "number"
                placeholder = "pinCode"
                required
                value = {pinCode}
                onChange = {(e)=>setPinCode(e.target.value)}
                />
         </div>
         <div className = "shipping-input-cont flex justify-center items-center gap-[1.6rem]">
            <ion-icon className = "" name="call-outline"></ion-icon>
            <input 
                type = "tel"
                placeholder = "phoneNo"
                required
                value = {phoneNo}
                onChange = {(e)=>setPhoneNo(e.target.value)}
                />
         </div>
         <div className = "shipping-input-cont flex justify-center items-center gap-[1.6rem]">
         <ion-icon name="earth-outline"></ion-icon>
           <select 
             required
             value = {country}
             onChange = {(e)=>setCountry(e.target.value)}
             >
               <option value = "Select Country" >Select Country</option>
               {Country && Country.getAllCountries().map((item)=>(
                 <option className = "flex items-center justify-center" key  = {item.isoCode} value = {item.isoCode}>
                    {item.name}
                   </option>
               ))}
             </select>
         </div>

         {country && <div className ="shipping-input-cont flex justify-center items-center gap-[1.6rem]">
          <ion-icon  name="locate-outline"></ion-icon>
           <select 
             required
             value = {state}
             onChange = {(e)=>setState(e.target.value)}
             >
               <option value = "Select state" >Select state</option>
               {State && State.getStatesOfCountry(country).map((item)=>(
                 <option className = "flex items-center justify-center" key  = {item.isoCode} value = {item.isoCode}>
                    {item.name}
                   </option>
               ))}
             </select>
           </div>}


           <motion.input whileHover= {{scale:1.04}} className = "add-to-cart login--btn h-[5.4rem] w-[200px] bg-[rgb(14,14,14)] text-[#fff] rounded-[5rem] hover:bg-[#c7d6d5] hover:text-[rgb(14,14,14)]  mb-[4.4rem] cursor-pointer"
                        // onClick = {(e)=>switchTabs(e,"login")}
                        type = "submit"
                        value = "Continue"
                        disabled = {state?false:true}
                      />
            
        </form>
      </div>
    </div>
  )
}
