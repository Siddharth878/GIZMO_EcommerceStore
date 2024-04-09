import React,{useState,useEffect} from 'react'
import MetaData from '../layout/metaData'
import CartItemCard from '../cart/CartItemCard'
import { motion } from 'framer-motion'
import Footer from '../layout/Footer'
import NoItem from '../layout/noItem.js'
import OverlayNavbar from '../layout/overlayNavbar';


import { useSelector,useDispatch } from 'react-redux'

export default function Cart({history}) {

    // const dispatch = useDispatch();


    const {cartItems} = useSelector((state)=>state.cart);

     const [totalPrice,setTotalPrice] = useState(0);
     const [bg,setBg] = useState(false);
    

     

     const checkOutHandler = () =>{
      //   very important this is
       history.push('/login?redirect=shipping');
       window.location.reload(true);
     }

    //  const setBg = () =>{
    //    console.log(bg);
    //    if(bg==='none'){
    //      bg = 'sm';

    //    }else{
    //      bg = 'none';
    //    }
    //  }

    let res = 0;
    
    

    useEffect(()=>{

      if(cartItems.length!==0)
           cartItems.forEach((item)=>{
           res = res+(item.price*item.quantity)
           setTotalPrice(res)
      })
    },[cartItems,setTotalPrice])




    const head = {
        product:'Product',
        price:'Price',
        name:"amarajs",
        quantity:1,
    }



  return (

    <>

    <MetaData title = "Your Cart" />

    <figure className = "" onClick={() => setBg((bg) => !bg)}>
       <OverlayNavbar />
    </figure>
       


    {cartItems.length===0 && <NoItem bg ={bg}/>}
    
    
    {cartItems.length && <div className = {`container max-w-screen-xl mx-auto my-[9.6rem] flex flex-col ${bg?"blur-xl":"blue-none"} justify-center`}>
       
        <div className = {`flex flex-col justify-center items-center gap-[3.2rem]  mb-[5.4rem]`}>
            <CartItemCard heading = {head} className = ""/>
            {cartItems && cartItems.map((item)=>(
              <CartItemCard item = {item}/>
            ))}
       </div>
       

       <hr className = "p-4 container text-black"/>
       <div className = "px-[5.4rem] sub-total--section flex flex-col items-end self-end mb-[3.2rem]">
         <div className = "flex justify-center items-end gap-[1rem]">
            <p className = "text-[2.4rem]">
              SUBTOTAL
            </p>
            <p className = "total--price text-[3.2rem] font-semibold">
              {/* ₹{totalPrice} or we can use reduce method -> niche likha */}
              {/* ₹{cartItems.reduce((acc,item)=>acc+(item.quantity*item.price))}  --> doubt h samjh nahi aya  10hrs : 34 minutes  meh*/}
              ₹{totalPrice}
            </p>
         </div>

         <p className = "total-subhead text-[#555] text-[1.6rem] italic">
            Shipping & taxes calculated at checkout
         </p>
       </div>


       <motion.button whileHover= {{scale:1.04}} className = " self-center text-[2.4rem] add-to-cart h-[6.4rem] w-[300px] bg-[rgb(14,14,14)] text-[#fff] rounded-[5rem] hover:bg-[#fff] hover:text-[rgb(14,14,14)]  mb-[4.4rem]"
         onClick = {checkOutHandler} >
            checkout
        </motion.button>

      </div> }
    <Footer/>

    </>
  )
}
