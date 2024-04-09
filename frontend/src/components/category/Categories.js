import React from 'react'
import CategoryCard from "../layout/categoryCard.js"
import { createBrowserHistory } from "@remix-run/router";
import { Link } from 'react-router-dom';








const categories = [["Gear","They serve diverse purposes, including communication, entertainment, productivity, health monitoring, gaming, and professional tasks. Tech gears are continuously evolving with advancements in technology, offering users new features, capabilities, and experiences"],
['Audio',"In the audio category of tech, you'll find a wide range of devices designed to deliver high-quality sound for various purposes, including entertainment, communication, and professional use. "],
["Technology","Technology products encompass a wide array of items that leverage advancements in science and engineering to serve various purposes"],
["Computers","Computers play a central role in the technology category, serving as the backbone of modern digital infrastructure and enabling a wide range of tasks and applications"]];
export default function Categories() {

  



// const history = createBrowserHistory({});
//   const goToCategory = (ele) =>{
//     history.push(`/products`);
//     window.location.reload(true);
//   }
  
  return (

    categories.map((ele)=>{
      

      return <div

      
      className = " flex justify-center items-center  max-xl:w-[90%] ">
       
        <CategoryCard category ={ele} /> 
        
      </div>
    }

    )
  )
}
