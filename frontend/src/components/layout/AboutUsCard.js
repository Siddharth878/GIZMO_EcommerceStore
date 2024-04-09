
import React from 'react';
import {motion} from 'framer-motion';
// import {Link} from 'react-dom';
import { Link } from 'react-router-dom';



export default function AboutUsCard() {
  return (
    <div className = "text-[2.4rem] h-screen flex justify-center items-center rounded-[5rem] about-us-card">
               
          <Link to = "/about-me">
        <motion.button
          
          whileHover= {{scale:1.04}} className = "add-to-cart h-[6.4rem] w-[300px] bg-[#fbfbfb] text-[rgb(14,14,14)] rounded-[5rem] hover:bg-[rgb(14,14,14)] hover:text-[#fbfbfb]  mb-[4.4rem]" 
            >
            About Us (me)
        </motion.button>
        </Link>
    </div>
  )
}
