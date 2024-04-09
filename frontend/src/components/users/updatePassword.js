import React ,{useContext,useEffect,useState}from 'react'
import  { AlertMessagesContext } from 'react-alert-messages';
import { useDispatch, useSelector } from 'react-redux';



import {motion} from 'framer-motion';
import ReactLoading from "react-loading"

import { loadUser ,updatePassword , clearErrors} from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import MetaData from "../layout/metaData"



export default function UpdatePassword({history}) {

  
  const dispatch = useDispatch();
  const { postAlertMessage } = useContext(AlertMessagesContext);
  

  const {user}  = useSelector((state)=>state.user);

  const {error,isUpdated,loading} = useSelector((state)=>state.profile);


  const [passwordCurrent,setPasswordCurrent] = useState("");
  const [passwordNew,setPasswordNew] = useState("");
  const [passwordConfirm,setPasswordConfirm] = useState("");

  


  const updatePasswordSubmit = (e) =>{
      

    e.preventDefault();

    const myForm = new FormData();
    


    myForm.set("passwordCurrent",passwordCurrent);
    myForm.set("passwordNew",passwordNew);
    myForm.set("passwordConfirm",passwordConfirm);

    dispatch(updatePassword(myForm));

  }


  useEffect(()=>{
    if(error){
        postAlertMessage({ text: error });
        dispatch(clearErrors());
      }
      if(isUpdated){
        
        postAlertMessage({ text: 'Password Changed Successfully'});
  
        
        history.push('/account');
        window.location.reload(true);
  
        dispatch({type:UPDATE_PASSWORD_RESET})
      }

     },[dispatch,error,alert,postAlertMessage,isUpdated,history])






  return (


    <>

   {loading && <ReactLoading className = "container mx-auto" type={'bubbles'} color={'black'} height={667} width={375} />}
   <MetaData title = "Change Password"/>

    <div className = "update--pass--conatiner h-screen flex justify-center items-center">
      
      <section className = "flex flex-col justify-center gap-[2.4rem] update--profile--main pt-[3.2rem] h-[65vh] w-[40vw] items-center container mx-auto text-[#fbfbfb]">

        <h3 className = "text-[2.4rem] text-[rgb(187,187,187)] font-thin"> Change Password</h3>
        <form  className = ""  onSubmit = {updatePasswordSubmit}>
                      
              <motion.div className = " mb-[1.6rem]"
                              initial={{
                                scale:0.5,
                                opacity:0
                              }}
                              animate={{
                                scale:[1.4,1],
                                opacity:1
                              }}
                              transition={{ duration: 0.6}}
                          >
                          <input 
                          className = "h-[4.4rem] w-[100%] rounded-[2rem]"
                          type = "password"
                          placeholder = "Current Password"
                          required
                          name = "passwordCurrent"
                          value = {passwordCurrent}
                          onChange = {(e)=>{setPasswordCurrent(e.target.value)}}
                          />
                      </motion.div>


            <motion.div className = " mb-[1.6rem]"
                              initial={{
                                scale:0.5,
                                opacity:0
                              }}
                              animate={{
                                scale:[1.4,1],
                                opacity:1
                              }}
                              transition={{ duration: 0.6}}
                          >
                          <input 
                          className = "h-[4.4rem] w-[100%] rounded-[2rem]"
                          type = "password"
                          placeholder = "New Password"
                          required
                          name = "passwordNew"
                          value = {passwordNew}
                          onChange = {(e)=>{setPasswordNew(e.target.value)}}
                          />
                      </motion.div>          
                      
            <motion.div className = " mb-[1.6rem]"
                              initial={{
                                scale:0.5,
                                opacity:0
                              }}
                              animate={{
                                scale:[1.4,1],
                                opacity:1
                              }}
                              transition={{ duration: 0.6}}
                          >
                          <input 
                          className = "h-[4.4rem] w-[100%] rounded-[2rem]"
                          type = "password"
                          placeholder = "Confirm Password"
                          required
                          name = "passwordConfirm"
                          value = {passwordConfirm}
                          onChange = {(e)=>{setPasswordConfirm(e.target.value)}}
                          />
                      </motion.div>          
                      
                      
  
            
                
                      <div className = "flex flex-col justify-center items-center  gap-[1.6rem] mb-[3.2rem]"> 
  
                        <motion.input whileHover= {{scale:1.04}} className = "add-to-cart login--btn h-[5.4rem] w-[200px] bg-[#cb0115] text-[#fff] rounded-[5rem] hover:bg-[#c7d6d5] hover:text-[rgb(14,14,14)]  mb-[4.4rem] cursor-pointer"
                          // onClick = {(e)=>switchTabs(e,"login")}
                          type = "submit"
                          value = "Update"
                        />
                      </div>

            </form>           
        </section>
    </div>

    </>
  )
}
