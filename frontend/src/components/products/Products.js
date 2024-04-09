import React ,{useEffect} from 'react'
import ProductCard from "../layout/productCard.js"
import 'swiper/css/bundle'; // all styles (for navigation,pagination) for swiper will be available (not need to import it seperately)



import {getProduct} from "../../actions/productActions";
import {useDispatch, useSelector} from "react-redux";

import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation,Keyboard } from 'swiper/modules';
import { Spinner } from 'flowbite-react';



export default function Products() {


  const dispatch = useDispatch();
  const {loading,error,products,productCount} = useSelector((state)=>state.products);

 

  
  
  // const {loading} = useSelector((state)=>state.products);
  // loading can be showed before success when client requests for the products -- kaam nahi kr rha

  



  useEffect(()=>{
    dispatch(getProduct());
  },[dispatch]);


  return (

    <Swiper
        
        
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        keyboard={{
          enabled: true,
        }}
        navigation={true}
        speed ={600}
        modules={[Navigation,Keyboard]}
        className = "mySwiper"
          // onSwiper={(swiper) => console.log(swiper)}
         
          // Note : sabse chote walle meh dikkat beneath 640px because min-width h
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1536: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
    >
        
        {loading && <Spinner/>}
        {products && products.map((product)=>{  


          return(
            <SwiperSlide>
              <ProductCard productItem = {product} textSize = {2.0} />
            </SwiperSlide>
          )
        })}
       
      {/* <SwiperSlide>
        <ProductCard productName = "Smart-watch" category= "technology" price = "12334"/>
      </SwiperSlide> 
      <SwiperSlide>
        <ProductCard productName = "Smart-watch" category= "technology" price = "12334"/>
      </SwiperSlide> 
      <SwiperSlide>
        <ProductCard productName = "Smart-watch" category= "technology" price = "12334"/>
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard productName = "Smart-watch" category= "technology" price = "12334"/>
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard productName = "Smart-watch" category= "technology" price = "12334"/>
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard productName = "Smart-watch" category= "technology" price = "12334"/>
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard productName = "Smart-watch" category= "technology" price = "12334"/>
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard productName = "Smart-watch" category= "technology" price = "12334"/>
      </SwiperSlide> */}
      
      ...
    </Swiper>
    
  )
}
