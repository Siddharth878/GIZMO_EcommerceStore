import React from 'react'
import { Link } from 'react-router-dom';



export default function productCard(props) {


  const {name,category,price,_id,images} = props.productItem;
  // console.log(props.productItem);

   if(images && images[0][0]){

    // console.log(image[0][0]);

  return (
     
    <Link className = "productCard" to = {`/products/${_id}`} >
    <div className = "text-[2.0rem] min-h-[52rem] flex flex-col justify-center items-start font-medium rounded-[4rem] py-[2.4rem] px-[3.2rem] bg-[#fbfbfb] cursor-pointer hover:scale-105 transition-all duration-300 ">
      <img  className = " h-[auto] w-[30rem]"src = {`/IMG/products/${images[0]}.jpg`} alt = "product-Name"/>
      <p className = "text-[1.6rem] text-[#666] uppercase">
        {category}
      </p>
      <h3 className = {`${props.textSize?`text-${props.textSize}rem`:'text-[2.4rem]'}`}>
        {name}
      </h3>
      <p className = "pt-4">
      ₹{price}
      </p>
    </div>
    </Link>
    
  )}

  else{
    return (
      <Link className = "productCard" to = {`/products/${_id}`} >
    <div className = "text-[2.0rem] min-h-[52rem] flex flex-col justify-center items-start font-medium rounded-[4rem] py-[2.4rem] px-[3.2rem] bg-[#fbfbfb] cursor-pointer hover:scale-105 transition-all duration-300 ">
      <img  className = " h-auto w-[30rem]"src = {`/IMG/products/smart-watch.jpg`} alt = "product-Name"/>
      <p className = "text-[1.6rem] text-[#666] uppercase">
        {category}
      </p>
      <h3 className = {`${props.textSize?`text-${props.textSize}rem`:'text-[2.4rem]'}`}>
        {name}
      </h3>
      <p className = "pt-4">
      ₹{price}
      </p>
    </div>
    </Link>
    )
  }
}
