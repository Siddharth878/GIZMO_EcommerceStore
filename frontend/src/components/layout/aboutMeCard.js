import React from 'react'
import { Link } from 'react-router-dom'

export default function AboutMeCard() {
  return (
    <div className = "about-us-card-internal h-screen w-full text-[#fbfbfb] flex justify-center items-center ">
      <div className = " text-[2.4rem] leading-[1.5] bg-[#c7d6d5] rounded-lg max-w-screen-xl mx-auto p-[4.4rem]">
          Gizmo is an exclusive ecommerce store , built as an prototype to test technologies like React, 
          React-redux, express ,mongodb and various other libraries to it's capablities.

          Various model in mongodb are made , supported by a RESTful api and robust authentication controllers

          . The design is minimal as can be observed 
          . In future more features can be added
           
           
          <div className = " flex justify-center items-center gap-[2.4rem] p-[2.4rem] mt-[2.4rem]">
                 
                 <Link to = "https://www.linkedin.com/in/siddharth-saxena-902672202/">
                    <ion-icon  class = "h-[3.2rem] w-[3.2rem] cursor-pointer"name="logo-linkedin" ></ion-icon>
                 </Link>
              
              <Link>
                <ion-icon onClick = {
                    function foo(){
                        window.open("mailto:saxena.siddharth.2017061@gmail.com");
                    }
                } class = "h-[3.2rem] w-[3.2rem] cursor-pointer"name="mail-outline"></ion-icon>
             </Link>
          </div>

      </div>

      
    </div>
  )
}
