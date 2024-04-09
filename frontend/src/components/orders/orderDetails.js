import React ,{useEffect,useState,useRef,useContext} from 'react'

import {useSelector,useDispatch} from "react-redux";
import MetaData from "../layout/metaData";

import {getOrderDetails,clearErrors} from '../../actions/orderActions'
import  { AlertMessagesContext } from 'react-alert-messages';
// import {motion} from "framer-motion";
// import { DataGrid } from '@material-ui/data-grid';
// import ReactLoading from "react-loading";
import { Link ,useParams } from 'react-router-dom';

import OverlayNavbar from '../layout/overlayNavbar';

export default function OrderDetails() {
  
    const [bg,setBg] = useState(false);
    const { postAlertMessage } = useContext(AlertMessagesContext);
    const dispatch = useDispatch();
    const params = useParams();



    const {loading,error,orders} = useSelector((state)=>state.orderDetails);
    const {user} = useSelector((state)=>state.user);



    console.log(orders);

   

    





    useEffect(()=>{
        if(error){
            postAlertMessage({text:error});
            dispatch(clearErrors());
        }

        dispatch(getOrderDetails(params.id));
       

    },[dispatch,error,getOrderDetails]);
  
    return (
    <div>
        <figure className = "" onClick={() => setBg((bg) => !bg)}>
         <OverlayNavbar />
        </figure>
        <MetaData title = "Order-Details"/>
        <div className = {`h-screen max-w-screen-xl container mx-auto flex flex-col items-center ${bg?"blur-xl":"blue-none"} gap-[2.4rem]`}>
         



        <section className = " flex  w-[100%] justify-center items-center gap-[2.4rem]">
            <div className = "shipping-info-orders  w-[100%] flex  flex-col justify-center items-start gap-[2.4rem]  ">
              <h3 className = "text-[4.4rem] mb-[1.6rem] ">Order Shipping Info</h3>
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
                      {orders&&orders.shippingInfo.phoneNo}
                    </p>
                  </div>
                  <div className = "flex justify-center items-center gap-[1.6rem] text-[2.4rem]">
                    <p className ="font-semibold">
                        Address : 
                    </p>
                    <p className  = "leading-[1.5]">
                    {orders&&orders.shippingInfo.address} , {orders&&orders.shippingInfo.city},{orders&&orders.shippingInfo.state}
                    </p>
                  </div>
              </figure>

               <hr className = "block mb-[2.4rem] w-[90%] container mx-[auto]"/>
            
            
            
              <figure className = " w-[100%] flex flex-col justify-center items-start gap-[2.4rem] mb-[2.4rem]">
                  <h4 className = "text-[3.2rem]">Your orders</h4>
                  <div className = " w-[100%] flex flex-col items-start justify-center gap-[1.6rem] ">
                        {orders && orders.orderItems.map((item)=>(
                       <Link to  = {`/products/${item.product}`} className = "w-[1280px]"> 
                         <figure className = "flex  justify-start items-center gap-[7.2rem] text-[2.0rem] ">

                             {/* Iski jagh db se nikal ke deni hogi bhai */}
                             <img className  = " h-[14.4rem] w-auto rounded-xl" src = '/IMG/iphpne.jpg'/> 
                             
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
            <div className = "flex justify-center items-center gap-[1.6rem] text-[2.4rem]">
                <p className = "status font-[500]">
                    Payment Status
                </p>
                <p className = " text-[2.0rem] bg-[#c7d6d5] text-[#555]  p-[1.6rem] rounded-[5rem]">
                    PAID VIA CARD
                </p>
            </div>
            </div>


            


            </section>

        </div>
    </div>
  )
}
