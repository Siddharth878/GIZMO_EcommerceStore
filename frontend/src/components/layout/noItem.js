import React from 'react'
import {motion} from 'framer-motion';
import { createBrowserHistory } from "@remix-run/router";

export default function NoItem(props) {
    

    const history = createBrowserHistory({});
    const {bg} = props;


    const goToShop = () =>{
        history.push('/products');
        window.location.reload(true);
    }


  return (
    <div className = {`container mx-auto ${bg?"blur-xl":"blue-none"}  my-[16rem] h-[2/3vh] flex flex-col justify-center items-center gap-[2.4rem]`}>
        
        <ion-icon name="file-tray" class = "h-[5.4rem] w-[5.4rem] mb-[-2.4rem]"></ion-icon>
        
        <p className = "text-[2.8rem] "> No Item Found ! </p>

       <motion.button whileHover= {{scale:1.04}} className = " self-center text-[3.0rem] add-to-cart h-[7.2rem] w-[400px] bg-[rgb(14,14,14)] text-[#fff] rounded-[5rem] hover:bg-[#fff] hover:text-[rgb(14,14,14)]  mb-[4.4rem]" onClick ={goToShop}>
            Browse products
        </motion.button>
    </div>
  )
}
