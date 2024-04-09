import React, { useState } from 'react'
import{ motion} from 'framer-motion'
import { useDispatch } from 'react-redux'
import {addItemsToCart,removeItemsFromCart} from '../../actions/cartActions';




export default function CartItemCard(props) {
   

    const {item} = props;
    const heading = props.heading;
    const dispatch = useDispatch();


    
  
    

    if(heading){

        return (
            <figure className = "container mx-auto flex   mb-[1.6rem] items-center justify-between text-[2.4rem] px-[4.4rem]">
            <div className = "container flex justify-center w-[33%] items-center gap-[3.2rem]">
                <p className = "product--name font-semibold ">NAME</p>
            </div>
            <p className = "product--name font-semibold ">Price</p>
            <p className = "product--name font-semibold ">Quantity</p>
            <p className = 'product-price font-semibold'>Total</p>
         </figure>
        )
    }
    
        
    


        const increaseQuantity = (id,quantity,stock) =>{

            if(stock===quantity){
                return;
            }
            
            const newQty = quantity+1;
            dispatch(addItemsToCart(id,newQty))

            // window.location.reload(true);
        

        }

        const decreaseQuantity = (id,quantity,) =>{

            if(quantity==1){
                return;
            }
            
            const newQty = quantity-1;
            dispatch(addItemsToCart(id,newQty))
            // window.location.reload(true);
        }


        const removeItem = (id) =>{
             

            dispatch(removeItemsFromCart(id));

        }

    
        console.log(item)
    return (
        
        <figure className = "container mx-auto flex  items-center justify-between text-[2.4rem] px-[4.4rem]">
            <div className = "container flex  w-[33%] items-center gap-[3.2rem]">
                <img className = " h-[16.0rem] w-auto rounded-xl" src = {`/IMG/products/${item.image}.jpg`}/>
                <div>
                <p className = "product--name font-semibold ">{item.name}</p>
                <motion.button whileHover= {{scale:1.04}} className = "remove--btn text-[1.6rem] text-[#666] h-[3.2rem] w-[150px] bg-[#c7d6d5]  rounded-[5rem]  hover:text-[#fbfbfb] hover:bg-[#cb0115] mb-[4.4rem]"
                                onClick = {()=>{removeItem(item.product)}}>
                    remove
                </motion.button>
                </div>
            </div>
            <div className = "">
              <p className = 'total-product-price font-semibold'>₹{item.price}</p>
            </div>
            <div className = 'quantity--box flex justify-start items-center text-[3.2rem] mb-[2.0rem]'>
                <button className = "p-4 hover:bg-[rgb(173,243,188)] hover:text-[#fff] transition-all" onClick  ={()=>{decreaseQuantity(item.product,item.quantity)}} >-</button>
                <input  className = "w-[7.2rem] h-[3.2rem] rounded-xl"  readOnly id="quantity" name="quantity" min="1"max = "100" value = {item.quantity} type = "number"/>
                <button className = "p-4 hover:bg-[rgb(151,193,255)] hover:text-[#fff] transition-all" onClick  ={()=>{increaseQuantity(item.product,item.quantity,item.stock)}} >+</button>
            </div>

            <p className = 'total-product-price font-semibold'>₹{item.price*item.quantity}</p>
        </figure>
    )
}
