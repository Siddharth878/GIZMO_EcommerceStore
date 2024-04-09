
'use client';
import React ,{useState} from 'react'
import { motion } from 'framer-motion';


import MetaData from '../layout/metaData';


import AllProductsPage from './allProductsPage';
import NewsSection from '../layout/newsSection'


import Header from '../layout/Header.js';
import Footer from '../layout/Footer.js';





  








export default function ShopProducts(props) {
    
    const [arrowState,setArrow] = useState('hidden');

    const [category,setCategory] = useState(props.category);

    console.log(category);




  return (
    <div>
        
        <Header/>
        <MetaData title = "Shop"/>

        <div className = "h-screen text-[1.8rem] shop--back mb-[12.8rem]">
            <div className = "flex  flex-col h-screen justify-center items-start ml-[16.0rem] ">

                    <h2 className = "text-[4.4rem] font-semibold text-[rgb(187,187,187)]">OFF season Col.</h2>
                    <p className = "text-[2.4rem] text-[#fbfbfb] mb-[3.2rem] w-[50%]">
                        Discover the future with our cutting-edge gadgets, 
                        redefining technology and convenience in one collection.
                    </p>
                <motion.button 
                   onClick = {(e)=>{
                        e.preventDefault();

                        const id = e.target.getAttribute('href');
                        document.querySelector(id).scrollIntoView({behavior:'smooth'});
                            
                    }
                       
                   }
                   href = "#shop"
                   onMouseEnter = {()=>setArrow('block')} onMouseLeave = {()=>setArrow('hidden')} whileHover= {{scale:1.04}} className = "add-to-cart h-[6.4rem] w-[300px]  bg-[#fbfbfb] text-[rgb(14,14,14)] rounded-[5rem] hover:bg-[rgb(14,14,14)]  hover:text-[#fbfbfb]  mb-[4.4rem]">
                    Browse Products
                </motion.button>

                <svg className = {`arrows ${arrowState}`} >
                <path class="a1" d="M0 0 L30 32 L60 0"></path>
                <path class="a2" d="M0 20 L30 52 L60 20"></path>
                <path class="a3" d="M0 40 L30 72 L60 40"></path>
                </svg>

            </div>
        </div>


        <div id = "shop" className = "tab-comp flex justify-center items-center text-[2.8rem] mb-[2.4rem]">
                <ul class="flex flex-wrap justify-center items-center font-medium text-center text-gray-500 dark:text-gray-400">
                    <motion.li whileHover= {{scale:1.04}}  class={`mr-2  text-[#666] `} onClick = {()=>setCategory('')} >
                        <p class="category-shop-btn px-[5.4rem] py-[2.4rem] inline-block cursor-pointer " aria-current="page">All</p>
                    </motion.li>
                    <li className="">/</li>
                    <motion.li whileHover= {{scale:1.04}}  class={`mr-2  text-[#666] `} onClick = {()=>setCategory('Tech')} >
                        <p  class="category-shop-btn px-[5.4rem] py-[2.4rem] inline-block cursor-pointer" >Tech</p>
                    </motion.li>
                    <li className="">/</li>
                    <motion.li whileHover= {{scale:1.04}}  class={`mr-2  text-[#666] `}  onClick = {()=>setCategory('Gear')}>
                        <p class="category-shop-btn px-[5.4rem] py-[2.4rem] inline-block  cursor-pointer " >Gear</p>
                    </motion.li>
                    <li className="">/</li>
                    <motion.li whileHover= {{scale:1.04}}  class={`mr-2  text-[#666] `}  onClick = {()=>setCategory('Audio')} >
                        <p class="category-shop-btn px-[5.4rem] py-[2.4rem] inline-block cursor-pointer " >Audio</p>
                    </motion.li>
                </ul>
        </div>
        


        <hr className = "container mx-auto mb-[3.2rem] border-[1.2px]  text-black"/>
         

         




            <div className = "product-container  flex justify-center items-center ">
            <AllProductsPage category = {category}/>
            </div>
        



        <hr className = "container mx-auto mb-[7.2rem] border-[1.2px]  text-black"/>


        <div className = "tech--news container mx-auto  max-w-screen-xl  flex justify-center items-center mb-[7.2rem]">
            <NewsSection/>
        </div>

      

       <Footer/>
    </div>
  )
}
