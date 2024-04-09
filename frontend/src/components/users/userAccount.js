



import React ,{useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";

import { loadUser, logout } from '../../actions/userActions';
import { Link } from 'react-router-dom';

import { MotionStyle ,motion } from 'framer-motion';
import MetaData from "../layout/metaData"




export default function UserAccount({history}) {
  

   

  let name ;

  const dispatch = useDispatch();
 


  const user = useSelector((state)=>state.user.user);


  if(typeof(user) != 'undefined' && user != null){
    name = (user.name);
  }

  const logoutBtn = (e) =>{
    
    e.preventDefault();
    dispatch(logout());
    history.push('/');
    window.location.reload(true);
  }



  const options = [

    {
      to:'/myOrders',
      name : 'Your Orders',
      icon :"cube-outline",
    },
    {
      to:'me/addresses',
      name : 'Your Address',
      icon :"locate-outline",
    },
    {
      to:'/',
      name : 'Home',
      icon :"home-outline",
    },
    { 
      to:'/me/updatePassword',
      // name : 'Security ',
      name:'Change Password',
      icon :"lock-open-outline",
    },
    {
      to:'contactUs',
      name : 'Contact Us',
      icon :"call-outline",
    }
  ]


  

  return (


    <>
    <MetaData title = "User--account"/>

    <section className = "bg-[rgb(14,14,14)] max-h-max">
      
      <div className = "container mx-auto ">

        
        <div className = "account-info-container pt-[14.4rem] pb-[16rem] flex text-[#fbfbfb] text-[1.6rem] justify-center items-center">
             <div className = " flex flex-col justify-center items-center">

               <motion.img className = "rounded-[5rem] h-[200px] w-auto mb-[3.2rem]"
               
               animate={{
                scale: [1, 2, 1],
                rotate: [360, 360,0 ],
              }}

                src = "./IMG/usersSample/men-aditya-rastogi.jpg"
               />

                <p className = "text-[4.4rem] ">
                  hello {name}
                </p>

                <Link to = "/me/updateMe" className = "edit--profile text-[2.4rem] mb-[4.4rem]">
                  edit profile
                </Link>


                <div className = "grid grid-cols-3 gap-[2.4rem] ">
                   

                   {options.map((option)=>{
                     return (
                      <Link 
                      to= {option.to}
                      className =  "bg-[#fbfbfb] options text-[rgb(14,14,14)]  cursor-pointer rounded-[5rem] h-[14.4rem] w-[25.6rem] flex flex-col justify-center items-center">
                          <ion-icon  class = "text-[rgb(14,14,14)]  h-[4.4rem] w-[4.4rem] pb-[1.6rem]"name={`${option.icon}`}></ion-icon>
                          <p className = "text-[1.6rem]">
                            {option.name}
                          </p>
                      </Link>
                     )})}
   
                 
                </div>

                <div className = "self-end">
                  <motion.button whileHover= {{scale:1.04}} className = {`display--form add-to-cart login--bar h-[5.4rem] w-[200px] bg-[rgb(14,14,14)] text-[#fff] rounded-[5rem] hover:bg-[#fff] hover:text-[rgb(14,14,14)]  mb-[4.4rem]`}
                   
                   onClick = {logoutBtn}
                  >
                    Log Out
                  </motion.button>
                </div>
             </div>
        </div>



      </div>
    </section>

    </>
  )
}


