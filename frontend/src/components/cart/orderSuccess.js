import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import MetaData from "../layout/metaData";

export default function OrderSuccess() {
  return (
    <div className = "container mx-auto h-screen flex flex-col justify-center items-center gap-[1.6rem]">
        
        <MetaData title = "Success"/>
        <motion.figure className = "h-[7.2rem] w-[7.2rem] bg-[#c7d6d5] flex justify-center items-center rounded-[50%]"
            initial={{
                scale:0.5,
                opacity:0
                }}
            animate={{
                    scale:[1.4,1],
                    opacity:1
            }}
            transition={{ duration: 0.3}}initial={{
                    scale:0.5,
                    opacity:0
             }}
            animate={{
                        scale:[1.4,1],
                        opacity:1
            }}
            transition={{ duration: 0.3}}
         >
         <ion-icon class = "h-[4.4rem] w-[4.4rem]"name="checkmark-outline"></ion-icon>
        </motion.figure>

        <motion.p className  =" text-[3.2rem]"
           initial={{
            scale:0.5,
            opacity:0
            }}
            animate={{
                scale:[1.4,1],
                opacity:1
            }}
            transition={{ duration: 0.3}}
        >Your Order Has Been Placed Successfully</motion.p>
         

         <Link to = "/myOrders">
            <motion.button whileHover= {{scale:1.04}} className = "sumbit-review text-[1.8rem] text-[#fbfbfb] h-[6.4rem] w-[300px] bg-[rgb(14,14,14)]  rounded-[5rem] hover:bg-[#c7d6d5] hover:text-[rgb(14,14,14)]  mb-[4.4rem]">
                View Orders
            </motion.button>
        </Link>
    </div>
  )
}
