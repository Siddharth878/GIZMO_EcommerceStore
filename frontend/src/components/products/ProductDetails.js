


import React,{useEffect,useState,useContext} from 'react'



import {clearErrors, getProductDetails, newReview} from "../../actions/productActions";
import { addItemsToCart } from '../../actions/cartActions';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';


import {useDispatch, useSelector} from "react-redux";
import {useParams } from 'react-router-dom';

import  { AlertMessagesContext } from 'react-alert-messages';

// import { match } from 'assert';
import MetaData from '../layout/metaData';


import Header from '../layout/Header.js';
import Footer from '../layout/Footer.js';
import ReviewCard from "../layout/reviewCard.js"



// import {
//   MagnifierContainer,
//   MagnifierPreview,
//   MagnifierZoom
// } from "react-image-magnifiers";
import { motion} from 'framer-motion';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from "@material-ui/core"
import Rating from '@mui/material/Rating';
import {
  Magnifier,
  GlassMagnifier,
 
} from "react-image-magnifiers";

// import {
  
//   overlayOpacity,
//   alwaysInPlace
// } from SideBySideMagnifier






export default function ProductDetails({match}) {
    



  
    const dispatch = useDispatch();
  
    const {id} = useParams();
    const {product,loading,error} = useSelector((state)=>state.productDetails);

    const {success,reviewError} = useSelector((state)=>state.newReview);

    const { postAlertMessage } = useContext(AlertMessagesContext);











  
     
    const [activeImg,setActiveImage] = useState(``);
    const [quantity,setQuantity] = useState(1);
    const [stock,setStock] = useState('In Stock');

    const [open,setOpen] = useState(false);
    const [rating,setRating] = useState(0);
    const [comment,setComment] = useState("");

    


   




    const increaseQuantity = () =>{
     

     // console.log(product.stock,quantity);
      
      if(product.Stock<=quantity) return;
  
      const qty = quantity+1;
      setQuantity(qty);
    }

    const decreaseQuantity = () =>{
         
       if(quantity<=1) return;

      const qty = quantity-1;
      setQuantity(qty);
    }


    const addToCartHandler = () =>{
      
      dispatch(addItemsToCart(id,quantity));
      postAlertMessage({ text: "Item Added to Cart"});
    }

    

    const submitReviewToggle = () =>{
         open?setOpen(false):setOpen(true);
    }

     
    const reviewSubmitHandler = () =>{
        
        const myForm = new FormData();

        myForm.set('rating',rating);
        myForm.set('comment',comment);
        myForm.set('productId',id);
      

        dispatch(newReview(myForm));
        setOpen(false);

    }
    

    

    useEffect(()=>{

        dispatch(getProductDetails(id));

        // console.log("hasdl");

        
        
       
        if(product.Stock<1){
          setStock('Out of Stock');
        }

        if(reviewError){
          postAlertMessage({ text: reviewError});
          dispatch(clearErrors());
        }

        if(success){
          postAlertMessage({ text:"Review Submitted"});
          dispatch({type:NEW_REVIEW_RESET});
        }
    },[dispatch,id,product,product.Stock,setStock,postAlertMessage,clearErrors,success,getProductDetails,NEW_REVIEW_RESET,activeImg]);
        




  return (
    
    <div className = "">
      <Header/>


      <MetaData title = {product.name}/>
      <div className = "flex flex-row justify-center items-center mt-[10.2rem] mb-[12.8rem]  lg:flex-row px-[3.2rem]">
        
        
        <div className = "flex flex-row gap-[2.4rem] px-[4.4rem] w-[50%] self-start">
        <div className = "flex flex-col items-center justify-around  gap-[1.6rem] w-[25%] ">
          
          {product.images && product.images.map((img)=>( 
                     <img src = {`/IMG/products/${img}.jpg`} 
                     alt = "product-image" className = "bg-[rgba(187,187,187,0.25)] w-[120px] h-[120px] rounded-[5rem] cursor-pointer" 
                      onMouseEnter = {()=>setActiveImage(`/IMG/products/${img}.jpg`)} />
            ))}
            {/* <img src = {images.img1} alt = "" className = "bg-[rgba(187,187,187,0.25)] w-[120px] h-[120px] rounded-[5rem] cursor-pointer" onMouseEnter = {()=>setActiveImage(images.img1)} />
            <img src = {images.img2} alt = "" className = "bg-[rgba(187,187,187,0.25)] w-[120px] h-[120px] rounded-[5rem] cursor-pointer" onMouseEnter= {()=>setActiveImage(images.img2)} />
            <img src = {images.img3} alt = "" className = "bg-[rgba(187,187,187,0.25)] w-[120px] h-[120px] rounded-[5rem] cursor-pointer" onMouseEnter= {()=>setActiveImage(images.img3)} />
            <img src = {images.img4} alt = "" className = "bg-[rgba(187,187,187,0.25)] w-[120px] h-[120px] rounded-[5rem] cursor-pointer" onMouseEnter= {()=>setActiveImage(images.img4)} />
            <img src = {images.img4} alt = "" className = "bg-[rgba(187,187,187,0.25)] w-[120px] h-[120px] rounded-[5rem] cursor-pointer" onMouseEnter= {()=>setActiveImage(images.img4)} />
            <img src = {images.img4} alt = "" className = "bg-[rgba(187,187,187,0.25)] w-[120px] h-[120px] rounded-[5rem] cursor-pointer" onMouseEnter= {()=>setActiveImage(images.img4)} /> */}

          </div>
          <div className = "flex flex-col  items-center gap-[2.4rem] w-[75%]">
           <img src = {activeImg?activeImg:`/IMG/products/${product.images&&product.images[0]}.jpg`} alt = "product" className = "w-[450px] h-[550px]  object-cover bg-[rgba(187,187,187,0.25)] rounded-[5rem]"/>
           
          </div>
        </div>


        <div className = "productDetails w-[50%] px-4">
          
          <h2 className = "text-[4.4rem] mb-[1.0rem]">{product.name}</h2> 
          <p className = "text-[1.8rem] text-[#666] mb-[1.8rem] leading-[1.5]">{product.description}</p>
          
          <div className = "priceContainer mb-[1.8rem]">
            <span className = "text-[3.2rem] font-semibold ">₹{product.price}</span> 
          </div>

          <div className = "quantity--box flex justify-start items-center text-[3.2rem] mb-[2.0rem]">
            <button className = "p-4 hover:bg-[rgb(173,243,188)] hover:text-[#fff] transition-all" onClick = {decreaseQuantity}>-</button>
              <input  className = "w-[9.6rem] h-[5.4rem] rounded-xl"  readOnly id="quantity" name="quantity" min="1"max = "100" value = {quantity} type = "number"/>
            <button className = "p-4 hover:bg-[rgb(151,193,255)] hover:text-[#fff] transition-all" onClick = {increaseQuantity}>+</button>
          </div>


          <motion.button 
            disabled = {product.Stock<1?true:false}
            whileHover= {{scale:1.04}} className = "add-to-cart h-[6.4rem] w-[300px] bg-[rgb(14,14,14)] text-[#fff] rounded-[5rem] hover:bg-[#fff] hover:text-[rgb(14,14,14)]  mb-[4.4rem]" onClick={addToCartHandler}>
            Add To Cart
          </motion.button>

          <div className= "product-info flex flex-col justify-center items-center gap-[3.2rem] text-[2.4rem] mb-[6.4rem]">
              <div className= "product-brand flex justify-between items-center w-[600px]">
                <p className = "font-semibold ">
                      Product Brand
                </p>
                <p className = "">
                    {product.brand}
                  </p>
              </div>
              

              <div className= "product-size flex justify-between items-center w-[600px]">
              <p className = "font-semibold ">
                Product Size
              </p>
              <p className = "">
                  5.12 x 3.54 x 1.97 Inches
                </p>
              </div>
              


              <div className= "product-weight flex justify-between items-center w-[600px]">
              <p className = "font-semibold ">
                  Product Weight
              </p>
              <p className = "">
                  6.3 ounces
                </p>
              </div>

          </div>


          <div className= "status flex justify-start items-center gap-[2.4rem] text-[2.4rem] mb-[4.4rem]">
            <p className= "status-head font-semibold"> Status</p>
            <p className= "status-info">{stock}</p>
            <p className = {`${stock[0]==='I'?'bg-green-500':'bg-red-500'} p-4 rounded-[50%]` }></p>
          </div>


          <hr className = "p-4 text-black"/>

          <div className= "payment-option flex justify-between items-center w-[600px]">
              <p className = "text-[2.0rem] font-semibold" >Accepted Payment Option</p>

              <div className = "payment-partners flex justify-center gap-[2.4rem] items-center">
               <ion-icon name="logo-paypal" style = {{height:"3.2rem",width:"3.2rem",color:'rgb(14,14,14)'}} ></ion-icon>
               <ion-icon name="card-outline" style = {{height:"3.2rem",width:"3.2rem",color:'rgb(14,14,14)'}} ></ion-icon>
              </div>
          </div>
        
        </div>
      </div>



        <hr className = "block mb-[11.2rem] container mx-[auto]"/>
         


         <div className = "container mx-[auto]  max-w-screen-xl  flex justify-start mb-[3.2rem]">
          <motion.button
           onClick = {submitReviewToggle}
           whileHover= {{scale:1.04}} className = "sumbit-review text-[1.8rem] text-[#666] h-[6.4rem] w-[300px] bg-[rgba(255,223,186,0.66)]  rounded-[5rem] hover:bg-[#fff] hover:text-[rgb(14,14,14)]  mb-[4.4rem]">
             Sumbit review
            </motion.button>
         </div>

         <Dialog
          aria-labelledby = "simple-dialog-title"
          open = {open}
          onClose = {submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className = "submit-dialog">

              <div className  = "flex justify-center items-center gap-[2.4rem]">
                <Rating
                  
                  name="simple-controlled"
                  onChange = {(e)=>setRating(e.target.value)}
                  value={rating}
                  size = "large"
                />
                <textarea
                  className = "submit-dialog-text-area"
                  cols = "45"
                  rows = "10"
                  value = {comment}
                  onChange = {(e)=>setComment(e.target.value)}
                >
                </textarea>
              </div>

              <DialogActions>
                <Button>Cancel</Button>
                <Button onClick = {reviewSubmitHandler}>Submit</Button>
              </DialogActions>
            </DialogContent>
           </Dialog>

        <div className = "reviews flex flex-col items-center justify-center gap-[5.6rem] mb-[14.4rem]">
          {/* <ReviewCard/> */}

          {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard review={review} />
                ))}
        </div>


        <Footer/>
    </div>
  )
}
