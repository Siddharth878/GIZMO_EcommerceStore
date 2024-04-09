import React from 'react'
import { motion ,useMotionValue,useTransform} from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CategoryCard(props) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y,[-100,100],[30,-30])
    const rotateY = useTransform(x,[100,-100],[-30,30])

   

    return (
      

    <motion.div
    to = {`/products`}
      style = {{x,y,rotateX,rotateY,z:1000}}
      drag
      dragElastic={0.15}
      dragConstraints={{top:0,left:0,right:0,bottom:0}}
      whileTap={{cursor:'grabbing'}}

      className = "flex flex-col justify-center items-start relative cursor-pointer bg-[#fbfbfb] overflow-hidden rounded-[8rem] px-[9.6rem] pt-[6.4rem] pb-[16.4rem] hover:shadow-lg max-lg:pb-[11.6rem] max-sm:items-center max-sm:pb-[3.2rem] max-sm:px-[4.4rem]">

          <h3 className = "text-[3.2rem] font-medium max-sm:text-[2.4rem]">
              {props.category[0]}
          </h3>
          <p className ="text-[1.6rem] text-[rgb(187,187,187)]  pb-[4.8rem] leading-[1.5] max-sm:text-[1.2rem] max-sm:leading-[1.2] ">
              {props.category[1]}
          </p>
          <div className ="explore flex justify-center items-center gap-[1rem]">
            <Link to = "/products" className = " text-[2.4rem] font-medium text-under underline decoration-solid max-sm:text-[1.6rem]">Explore Category</Link>
            <ion-icon className ="block h-10 w-10 cursor-pointer" name="arrow-forward-outline"></ion-icon>
          </div>
        
           <motion.img 
           style = {{x,y,rotateX,rotateY,z:1000000}}
           drag
           dragElastic={0.15}
           dragConstraints={{top:0,left:0,right:0,bottom:0}}
           whileTap={{cursor:'grabbing'}}
           className = "top-[200px] left-[300px] absolute w-[50%] h-auto z-[-1] max-xl:hidden" src = {`IMG/category-${props.category[0]}.png`} alt = "category-img"/>
    </motion.div>
  )
}
