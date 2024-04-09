import React, { useEffect } from 'react'
import Categories from '../category/Categories.js'
import Products from '../products/Products.js'
import Header from '../layout/Header.js';
import Footer from '../layout/Footer.js';
import Features from '../layout/Features.js'
import AboutUsCard from '../layout/AboutUsCard.js'


import MetaData from '../layout/metaData.js';

// import {getProduct} from "../../actions/productActions";
// import {useDispatch} from "react-redux";



export default function Home() {

  // const dispatch = useDispatch();

  // useEffect(()=>{
  //   dispatch(getProduct());
  // },[dispatch]);

  return (
    
    <div>
      <Header/>


      <MetaData title = "Welcome - GIZMO "/>
      <section className = "Hero flex justify-start items-center px-[6.4rem] h-screen  hero-pattern  ">
          <div className = "flex flex-col justify-center items-center gap-[2.4rem] w-[50%] p-[3.2rem] max-lg:gap-[1.6rem]">
            <h2 className = "text-[5.2rem] text-[#fff] font-semibold leading-[1.2] max-lg:text-[3.2rem]">
                High-quality tech gadgets & accessories
            </h2>
            <p className = " text-[1.8rem]  text-[#DDD] leading-[1.5] max-lg:text-[1.2rem]">
                India's most premium and trusted Online Digital Marketplace .
                The latest Product pool , and We can't be sloppy at deliveries

            </p>
          </div>
      </section>



       {/* Categories */}
       {/* xl:max-w-screen-lg xl:grid-cols-1 xl:grid-rows-4 xl:mx-auto */}
       <div className = "container max-w-screen-xl h-max mx-auto  py-[2.4rem] mt-[8.8rem]   grid grid-rows-2 grid-cols-2 gap-[4.4rem]  max-xl:flex max-xl:flex-col max-xl:items-center max-xl:mt-[7.2rem]" id = "container">
         <Categories/>
       </div>





       {/* Featured Products */}
       
       <div className = "container max-w-screen-xl h-max mx-auto  mt-[7.2rem]" id = "container">
         <h3 className = "text-[4.4rem] font-medium pb-[3.2rem]">Featured Products</h3>
         <Products/>
       </div>



       <div className = "container max-w-screen-xl h-max mx-auto  mt-[12.8rem] mb-[16rem]" id = "container">
         <h3 className = "text-[4.4rem] font-medium pb-[3.2rem]"></h3>
         <Features/>
       </div>


       <div className = "container max-w-screen-xl h-max mx-auto  mt-[12.8rem] mb-[16rem]" id = "container">
         <AboutUsCard/>
       </div>
       
         
       <Footer/>
    </div>
    
  )
}
