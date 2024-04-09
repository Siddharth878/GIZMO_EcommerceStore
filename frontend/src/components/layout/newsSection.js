import React ,{useEffect, useState} from 'react'


import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay ,EffectFade } from 'swiper/modules';

import ReactLoading from 'react-loading';
import Image from '../../IMG/Argous77.jpg'
import {motion, MotionStyle } from 'framer-motion';


export default function NewsSection() {
     


    const [articles,setArticles]  = useState([])
    const [loading,setLoading]  = useState(true)
    
    let title = 'Lorem ,ipsum dolar sit amet consectetur adipisicing elit.'

    // const updateNews = async()=>{
        
        
    //     const url = `https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=f3444e96422e4062a0988b1ef51bc80e`;
    //     setLoading(true);

    //     let data = await fetch(url);

    //     let parsedData = await (data.json());

    //     setArticles(parsedData.articles);
    //     setLoading(false);
    // }

    useEffect(()=>{
      //  updateNews();
     setLoading(false);
    },[]);



    
  return (

    <>
    {loading && <ReactLoading className = "container mx-auto" type={'bubbles'} color={'black'} height={667} width={375} />}
    {!loading && 
         
        <Swiper className = {`news-card flex justify-center items-center overflow-hidden w-[100%] h-[500px]   backdrop-blur-sm bg-cover bg-no-repeat rounded-[5rem]`}
         speed ={600}
         spaceBetween={100}
        //  effect={'fade'}
         autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[EffectFade,Autoplay]}
         >

            {articles && articles.map((article)=>{
                   

                //    Api ki limit na finish hojeaye isley abhi comment krdia
                // let { url, title, description, urlToImage, author, publishedAt, source } = article;

                let {url,title,description,author} = "";

                  return (
                    <SwiperSlide>
                     <div className = "flex flex-col justify-center items-center gap-[3.2rem] w-[100%] py-[9.6rem] px-[6.4rem]">
                        <h2 className = "news--head text-[4.4rem] text-[#fff] leading-[1.2] ">{title}...</h2>
                        <p className = "news-desc text-[1.6rem] text-[rgb(187,187,187)] leading-[1.5] ">
                            {description}
                        </p>
                        <p className = "text-rgb(14,14,14)] text-[2.2rem] text-[#fbfbfb]">{author}</p>
                        <motion.a href = {url} whileHover= {{scale:1.04}} className = "flex justify-center items-center gap-4 text-[1.6rem] add-to-cart h-[5.4rem] w-[250px] bg-[#fff] text-[rgb(14,14,14)] rounded-[5rem] hover:bg-[rgb(14,14,14)] hover:text-[#fbfbfb] mb-[4.4rem] cursor-pointer">
                            Read More ..
                        </motion.a> 
                        </div>
                     </SwiperSlide>
                    )
                })}

        </Swiper>
    } 
    </>
  )
}
