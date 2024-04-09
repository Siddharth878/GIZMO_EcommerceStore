import React ,{useContext,useEffect,useState}from 'react'
import  { AlertMessagesContext } from 'react-alert-messages';
import { useDispatch, useSelector } from 'react-redux';



import {motion} from 'framer-motion';
import ReactLoading from "react-loading"

import { loadUser ,updateProfile , clearErrors} from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from "../layout/metaData"



export default function UpdateProfile({history}) {

  
  const dispatch = useDispatch();
  const { postAlertMessage } = useContext(AlertMessagesContext);
  

  const {user}  = useSelector((state)=>state.user);

  const {error,isUpdated,loading} = useSelector((state)=>state.profile);


  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [avatar,setAvatar] = useState("");

  const [avatarPreview,setAvatarPreview] = useState("/IMG/profile.jpg");
  


  const updateProfileSubmit = (e) =>{
      

    e.preventDefault();

    const myForm = new FormData();
    


    myForm.set("name",name);
    myForm.set("email",email);
    myForm.set("avatar",avatar);

    dispatch(updateProfile(myForm));

  }


  const updateProfileDataChange = (e) => {
   
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


  useEffect(()=>{

    if(user){
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar);
    }
    if(error){
      postAlertMessage({ text: error });
      dispatch(clearErrors());
    }
    if(isUpdated){
      
      postAlertMessage({ text: 'Profile Updated Successfully'});
      
      dispatch(loadUser());

      
      history.push('/account');
      window.location.reload(true);

      dispatch({type:UPDATE_PROFILE_RESET})
    }
  },[dispatch,error,alert,postAlertMessage,isUpdated,history])






  return (


    <>

   {loading && <ReactLoading className = "container mx-auto" type={'bubbles'} color={'black'} height={667} width={375} />}
   <MetaData title = "Update-me"/>

    <div className = "update--profile--conatiner h-screen flex justify-center items-center">
      
      <section className = "flex flex-col justify-center gap-[2.4rem] update--profile--main pt-[3.2rem] h-[65vh] w-[40vw] items-center container mx-auto text-[#fbfbfb]">

        <h3 className = "text-[2.4rem] text-[rgb(187,187,187)] font-thin"> Update Your Profile</h3>
        <form  className = "" encType = "multipart/form-data"  onSubmit = {updateProfileSubmit}>
                      
              <motion.div className = "login-email mb-[1.6rem]"
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
                          type = "text"
                          placeholder = "Enter your New Name"
                          required
                          name = "name"
                          value = {name}
                          onChange = {(e)=>{setName(e.target.value)}}
                          />
                      </motion.div>
                      
              <motion.div className = "login-email mb-[1.6rem]"
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
                          type = "email"
                          placeholder = "Enter your Email"
                          required
                          name = "email"
                          value = {email}
                          onChange = {(e)=>{setEmail(e.target.value)}}
                          />
                      </motion.div>
                      
  
               <motion.div id = "updateProfileImage" className = "mb-[2.4rem] flex justify-center items-center w-[100%] gap-[2.4rem]"
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
                        <img src = {avatarPreview} alt = "Avatar preview" className = "h-[auto] w-[6.2rem]"/>
                        <input 
                          type = "file"
                          name = "avatar"
                          accept = "image/"
                          onChange = {updateProfileDataChange}
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
