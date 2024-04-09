import React from 'react'

export default function Features() {
  return (
    
    <div className = "">
    <h3 className = "text-[4.4rem] font-semibold text-center mb-[4.4rem]"> Reliable and Trusted</h3>
    <div className = "flex justify-between items-center gap-[2.4rem] mx-[2.4rem]">
      
      <figure className = "feature-card flex  justify-center items-center   gap-[2.4rem] p-4 text-[2.4rem] text-[rgb(14,14,14)]">
          <div className = "bg-[#fbfbfb] p-[1.6rem] rounded-[20%] feature-icon flex justify-center items-center">
             <ion-icon class = "h-[5.4rem] w-[5.4rem] text-[#555]" name="bag-check-outline"></ion-icon>
          </div>

          <div className = "flex flex-col justify-center items-start">
            <h4> Free Shipping</h4>
            <p className = "text-[1.8rem] text-[#333]">Over ₹499</p>
          </div>
      </figure>


      <figure className = "feature-card flex  justify-center items-center   gap-[2.4rem] p-4 text-[2.4rem] text-[rgb(14,14,14)]">
          <div className = "bg-[#fbfbfb] p-[1.6rem] rounded-[20%] feature-icon flex justify-center items-center">
             <ion-icon class = "h-[5.4rem] w-[5.4rem] text-[#555]" name="card-outline"></ion-icon>
          </div>

          <div className = "flex flex-col justify-center items-start">
            <h4> Secure Payments</h4>
            <p className = "text-[1.8rem] text-[#333]">With credit and debit card</p>
          </div>
      </figure>


       <figure className = "feature-card flex  justify-center items-center   gap-[2.4rem] p-4 text-[2.4rem] text-[rgb(14,14,14)]">
          <div className = "bg-[#fbfbfb] p-[1.6rem] rounded-[20%] feature-icon flex justify-center items-center">
             <ion-icon class = "h-[5.4rem] w-[5.4rem] text-[#555]" name="checkbox-outline"></ion-icon>
          </div>

          <div className = "flex flex-col justify-center items-start">
            <h4>30 days guarantee</h4>
            <p className = "text-[1.8rem] text-[#333]">No questions asked</p>
          </div>
      </figure>
    </div>


    </div>
  )
}
