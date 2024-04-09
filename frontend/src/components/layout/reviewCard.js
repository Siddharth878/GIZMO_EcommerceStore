import React from 'react'
import { motion ,useMotionValue,useTransform} from 'framer-motion';

export default function reviewCard(props) {

  

  

  const ratingNum = props.review.rating;

  let arr = [];

  for(let i = 0 ;i<ratingNum;i++){
    arr.push(i)
  }
  

  return (
    <motion.div  whileHover={{
        rotate: 1.5
      }}
      className = "bg-[#fbfbfb] px-[4.4rem] py-[4.4rem] rounded-[5rem] review--Card">
            <figure class="max-w-screen-md text-[2.4rem] text-rgb(14,14,14)] flex flex-col justify-center items-start">
            <div class="flex items-center mb-4 text-yellow-300">

            {arr.map(()=><ion-icon name="star" style = {{height:"3.2rem",width:"3.2rem",color:'rgb(14,14,14)',color:"#FFED01"}} ></ion-icon>)}
            
            {/* <ion-icon name="star-half" style = {{height:"3.2rem",width:"3.2rem",color:'rgb(14,14,14)',color:"#FFED01"}} ></ion-icon> */}
            </div>
            <blockquote>
                <p class="font-semibold  ">{props.review.comment}</p>
            </blockquote>
            <figcaption class="flex items-center gap-[1.6rem] mt-6 space-x-3">
                <img class="w-[5.6rem] h-[auto] rounded-full" src="/IMG/usersSample/men-aditya-rastogi.jpg"/>
                <div class="flex items-center divide-x-2 ">
                    <cite class="pr-3 font-medium ">{props.review.name}</cite>
                </div>
            </figcaption>
        </figure>
    </motion.div>
  )
}
