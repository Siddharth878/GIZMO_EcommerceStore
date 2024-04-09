


import axios from "axios";


import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    // UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    // UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,

    CLEAR_ERROR
 } from '../constants/userConstants.js';




 // login action
export const login = (email,password) => async(dispatch) =>{
    try{
        dispatch({type:LOGIN_REQUEST});
        

        const config = { headers:{"Content-Type":"application/json"} };

        const {data} = await axios.post('api/v1/login',
            {email,password},
            config
        );
        // console.log(data);



        dispatch({type:LOGIN_SUCCESS,payload:data.user});
    }catch(error){
        // console.log(error.response.data);
        dispatch({type:LOGIN_FAIL,payload:error.response.data.error});
    }
};






// Register action
export const register = (userData) => async(dispatch) =>{
    try{
        dispatch({type:REGISTER_USER_REQUEST});


        const config =  {headers:{"Content-Type":"multipart/form-data"}};

        const {data} = await axios.post('api/v1/register',
            userData,
            config
        );
        
        dispatch({type:REGISTER_USER_SUCCESS,payload:data.user});
        
    }catch(error){

        dispatch({type:REGISTER_USER_FAIL,payload:error.response.data.error});
    }
};













// Load user  -- (isse refresh krne meh bhi state empty nahi hoga -- state meh user reh ga hi)

export const loadUser = ( ) => async(dispatch) =>{
    try{
        dispatch({type:LOAD_USER_REQUEST});
        

        // console.log(' ab log krne wala');

        const {data} = await axios.get('/api/v1/me');
       
        

        dispatch({type:LOAD_USER_SUCCESS,payload:data.user});
    }catch(error){
        // console.log(error.response.data);
        dispatch({type:LOAD_USER_FAIL,payload:error.response.data.message});
    }
};









// LOGOUT USER

export const logout = ( ) => async(dispatch) =>{
    try{

         await axios.get('api/v1/logout');

        dispatch({type:LOGOUT_SUCCESS});
    }catch(error){
        // console.log(error.response.data);
        dispatch({type:LOGOUT_FAIL,payload:error.response.data.message});
    }
};


















// update profile
export const updateProfile =  (userData) => async(dispatch) =>{
    try{
        dispatch({type:UPDATE_PROFILE_REQUEST});


        const config =  {headers:{"Content-Type":"multipart/form-data"}};
         

        

        const {data} = await axios.patch('/api/v1/updateMe',
            userData,
            config
        );



        const success = data.status==="success"?true:false;
        // console.log(success);


        dispatch({type:UPDATE_PROFILE_SUCCESS,payload:success});
        
    }catch(error){

        dispatch({type:UPDATE_PROFILE_FAIL,payload:error.response.data.error});
    }
};












// update password
export const updatePassword =  (passwords) => async(dispatch) =>{
    try{
        dispatch({type:UPDATE_PASSWORD_REQUEST});


        const config =  {headers:{"Content-Type":"application/json"}}; // (application/json -> isley kyunki koi image wagera nahi bhej rhe hum isme)
         

        

        const {data} = await axios.patch('/api/v1/updatePassword',
            passwords,
            config
        );



        const success = data.status==="success"?true:false;
        

        dispatch({type:UPDATE_PASSWORD_SUCCESS,payload:success});
        
    }catch(error){

        dispatch({type:UPDATE_PASSWORD_FAIL,payload:error.response.data.error});
    }
};












// forgot passowrd
export const forgotPassword =  (email) => async(dispatch) =>{
    try{
        dispatch({type:FORGOT_PASSWORD_REQUEST});


        const config =  {headers:{"Content-Type":"application/json"}}; 

        const {data} = await axios.post('/api/v1/forgotPassword',
            email,
            config
        );
 

        dispatch({type:FORGOT_PASSWORD_SUCCESS,payload:data.message});
        
    }catch(error){

        dispatch({type:FORGOT_PASSWORD_FAIL,payload:error.response.data.error});
    }
};




// reset passowrd
export const resetPassword =  (token,passwords) => async(dispatch) =>{
    try{
        dispatch({type:RESET_PASSWORD_REQUEST});


        const config =  {headers:{"Content-Type":"application/json"}}; 

        console.log(`/api/v1/resetPassword/${token}`);


        const {data} = await axios.patch(`/api/v1/resetPassword/${token}`,
            passwords,
            config
        );
        

        const success = data.status==="success"?true:false;

        dispatch({type:RESET_PASSWORD_SUCCESS,payload:success});
        
    }catch(error){

        dispatch({type:RESET_PASSWORD_FAIL,payload:error.response.data.error});
    }
};













//clearing errors;
export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type:CLEAR_ERROR,
    })
} 