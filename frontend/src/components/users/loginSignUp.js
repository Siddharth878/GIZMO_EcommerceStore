
import React, { useEffect,useContext, useRef, useState } from 'react'
import  { AlertMessagesContext } from 'react-alert-messages';



import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';



import {useDispatch, useSelector} from "react-redux";
import { clearErrors, login ,register } from '../../actions/userActions';
import MetaData from '../layout/metaData';




export default function LoginSignUp({history}) {

    
    const dispatch = useDispatch();

    const { postAlertMessage } = useContext(AlertMessagesContext);
 


    const loginTab = useRef(null);
    const registerTab = useRef(null);

    // const switcherTab = useRef(null);


    const [loginEmail,setLoginEmail] = useState("");
    const [loginPassword,setLoginPassword] = useState("");
    const {error,loading,isAuthenticated} = useSelector((state)=>state.user);


    
    const [user,setUser] = useState({
      name :"",
      email:"",
      password:"",
      passwordConfirm:""
    })

    const {name,email,password,passwordConfirm} = user;

    const [avatar,setAvatar] = useState("IMG/profile.jpg");
    const [avatarPreview,setAvatarPreview] = useState("IMG/profile.jpg");

    

    const loginSubmit = (e) =>{
      
      e.preventDefault();

      dispatch(login(loginEmail,loginPassword))
    }

    const registerSubmit = (e) =>{
      
      e.preventDefault();

      const myForm = new FormData();

      myForm.set("name",name);
      myForm.set("email",email);
      myForm.set("password",password);
      myForm.set("passwordConfirm",passwordConfirm);
      myForm.set("avatar",avatar);

      dispatch(register(myForm));

    }


    const registerDataChange = (e) => {
      if(e.target.name === 'avatar'){

        
        const reader = new FileReader();
        
        reader.onload = () =>{
          if(reader.readyState===2)
          {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          }
        };
        

        reader.readAsDataURL(e.target.files[0]);

      }
      else{
        setUser({...user,[e.target.name]:e.target.value});
      }
    }

    


    const redirect = window.location.search?window.location.search.split("=")[1]:"/account";


    useEffect(()=>{
      
      // console.log("1st he bhai",isAuthenticated);

      if(error){
        postAlertMessage({ text: error });
        dispatch(clearErrors());
      }
      if(isAuthenticated){
        
        history.push(redirect);
        window.location.reload(true);
      }
    },[dispatch,error,alert,postAlertMessage,isAuthenticated,history])

    const switchTabs = (e,tab) =>{
        

      
      if(tab==='login'){
        document.getElementsByClassName('login--bar')[0].classList.add('display--form');
        document.getElementsByClassName('register--bar')[0].classList.remove('display--form');
        
        // switcherTab.current.classList.add('shiftToNeutral');
        // switcherTab.current.classList.remove('shiftToRight');

        registerTab.current.classList.remove('shiftToNeutralForm');
        loginTab.current.classList.remove('shiftToLeft');
        
      }
      if(tab==='register'){

        document.getElementsByClassName('login--bar')[0].classList.remove('display--form');
        document.getElementsByClassName('register--bar')[0].classList.add('display--form');
        

        // switcherTab.current.classList.add('shiftToRight');
        // switcherTab.current.classList.remove('shiftToNeutral');

        registerTab.current.classList.add('shiftToNeutralForm');
        loginTab.current.classList.add('shiftToLeft');

      }
    }


  return (

    <>
      <MetaData title = "Log In"/>
    
    <div className = "login-signup--container h-screen  text-[#fbfbfb] flex justify-center items-center  overflow-hidden">
       <section className = "login--main flex flex-col justify-center items-center gap-[2.4rem] w-[40%]  h-[90%] bg-[rgb(187,187,187)] rounded-[5rem]">
           
           <p className = "text-[4.0rem] font-semibold mt-[-5.2rem]">GIZMO</p>
            

            <div className = "login--sign-btn-container flex justify-center items-center gap-[1.6rem] text-[2.0rem] ">
                <motion.button whileHover= {{scale:1.04}} className = {`display--form add-to-cart login--bar h-[5.4rem] w-[200px] bg-[rgb(14,14,14)] text-[#fff] rounded-[5rem] hover:bg-[#fff] hover:text-[rgb(14,14,14)]  mb-[4.4rem]`}
                 onClick = {(e)=>switchTabs(e,"login")}>
                 Log in
                </motion.button>
                <motion.button whileHover= {{scale:1.04}} className = {`add-to-cart  register--bar h-[5.4rem] w-[200px]  bg-[rgb(14,14,14)] text-[#fff] rounded-[5rem] hover:bg-[#fff] hover:text-[rgb(14,14,14)]  mb-[4.4rem]`}
                 onClick = {(e)=>switchTabs(e,"register")}>
                 Register
                </motion.button>
                {/* <button ref = {switcherTab}></button> */}
            </div>

            
            <div className = "w-[100%]  flex flex-col justify-center items-center gap-[1.2rem]  relative">
                

               
                <form ref = {loginTab} className = "w-[70%] px-[3.2rem]  text-[2.4rem] login--form " onSubmit = {loginSubmit}>
                    <div className = "login-email mb-[1.6rem]">
                        <input 
                        className = "h-[4.4rem] w-[100%] rounded-[2rem]"
                        type = "email"
                        placeholder = "Enter your Email"
                        required
                        value = {loginEmail}
                        onChange = {(e)=>setLoginEmail(e.target.value)}
                        />
                    </div>
                    <div className = "login-password mb-[2.2rem] ">
                        <input 
                        className = "h-[4.4rem] w-[100%] rounded-[2rem]"
                        type = "password"
                        placeholder = "password"
                        required
                        value = {loginPassword}
                        onChange = {(e)=>setLoginPassword(e.target.value)}
                        />
                    </div>
              
                    <div className = "flex flex-col justify-center items-center  gap-[1.6rem] mb-[3.2rem]"> 
                      <Link className = "self-end  text-[1.6rem] text-[#c7d6d5] hover:underline underline-offset-4 " to = "/login/forgotPassword">Forgot password</Link>
                      <motion.input whileHover= {{scale:1.04}} className = "add-to-cart login--btn h-[5.4rem] w-[200px] bg-[#cb0115] text-[#fff] rounded-[5rem] hover:bg-[#c7d6d5] hover:text-[rgb(14,14,14)]  mb-[4.4rem] cursor-pointer"
                        // onClick = {(e)=>switchTabs(e,"login")}
                        type = "submit"
                        value = "login"
                      />
                    </div>

                    {/* <hr className = "container mx-auto mb-[3.2rem]   text-[#fbfbfb]" />
                    <div className = "mx-auto shadow-lg shadow-[#fbfbfb] w-[5.4rem] h-[5.4rem] flex justify-center items-center mb-[3.2rem] rounded-lg ">
                    <ion-icon class =  "h-[3.2rem] w-[3.2rem]" name="logo-google"></ion-icon>
                    </div> */}
                </form>


                <form ref = {registerTab} className = "display--prop w-[70%] px-[3.2rem] mt-[4.4rem] text-[2.4rem] signupForm absolute top-[50vh] left-[90px]" encType = "multipart/form-data"  onSubmit = {registerSubmit}>
                    
                   <div className = "login-email mb-[1.6rem]">
                        <input 
                        className = "h-[4.4rem] w-[100%] rounded-[2rem]"
                        type = "text"
                        placeholder = "Enter your Name"
                        required
                        name = "name"
                        value = {name}
                        onChange = {registerDataChange}
                        />
                    </div>
                    <div className = "login-email mb-[1.6rem]">
                        <input 
                        className = "h-[4.4rem] w-[100%] rounded-[2rem]"
                        type = "email"
                        placeholder = "Enter your Email"
                        required
                        name = "email"
                        value = {email}
                        onChange = {registerDataChange}
                        />
                    </div>
                    <div className = "login-password mb-[2.2rem] ">
                        <input 
                        className = "h-[4.4rem] w-[100%] rounded-[2rem]"
                        type = "password"
                        placeholder = "password"
                        required
                        name = "password"
                        value = {password}
                        onChange = {registerDataChange}
                        />
                    </div>

                    <div className = "login-passwordConfirm mb-[2.2rem] ">
                        <input 
                        className = "h-[4.4rem] w-[100%] rounded-[2rem]"
                        type = "password"
                        placeholder = "password confirm"
                        required
                        name = "passwordConfirm"
                        value = {passwordConfirm}
                        onChange = {registerDataChange}
                        />
                    </div>


                    <div id = "registerImage" className = "mb-[2.4rem] flex justify-center items-center w-[100%] gap-[2.4rem]">
                      <img src = {avatarPreview} alt = "Avatar preview" className = "h-[6.2rem] w-[6.2rem]"/>
                      <input 
                        type = "file"
                        name = "avatar"
                        accept = "image/"
                        onChange = {registerDataChange}
                        />
                    </div>  
              
                    <div className = "flex flex-col justify-center items-center  gap-[1.6rem] mb-[3.2rem]"> 

                      <motion.input whileHover= {{scale:1.04}} className = "add-to-cart login--btn h-[5.4rem] w-[200px] bg-[#cb0115] text-[#fff] rounded-[5rem] hover:bg-[#c7d6d5] hover:text-[rgb(14,14,14)]  mb-[4.4rem] cursor-pointer"
                        // onClick = {(e)=>switchTabs(e,"login")}
                        type = "submit"
                        value = "Sign up"
                      />
                    </div>

 
                </form> 
              
            
            </div>
           
       </section>
    </div>

    </>
  )
}
