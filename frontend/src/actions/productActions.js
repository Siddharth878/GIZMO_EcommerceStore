

import axios from "axios";


import { 
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_REQUEST ,
    PRODUCT_DETAILS_SUCCESS ,
    PRODUCT_DETAILS_FAIL ,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    CLEAR_ERROR
 } 
    from "../constants/productConstants";



// Note that these types of arrow functions are called double arrow functions -- Please refer this - > https://digitalfortress.tech/js/whats-a-double-arrow-function-in-javascript/

export const getProduct = (keyword = "",currentPage = 1,price = 1000000,category) => async (dispatch) =>{
         

    try{

        dispatch({type :ALL_PRODUCT_REQUEST});

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price}`;


        if(category){
            link  = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price}&category=${category}`;
        }
        
       
        const {data} = await axios.get(link);

        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload :data,
        })

    }catch(error){
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}    


export const getProductDetails = (id) => async (dispatch) =>{
         
    try{

        dispatch({type:PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get(`/api/v1/products/${id}`);

        

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload :data.product,
        })

    }catch(error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}    






export const newReview = (reviewData) => async (dispatch) =>{
         
    try{

        dispatch({type:NEW_REVIEW_REQUEST});


        const config = {
            headers:{
                "Content-Type":"application/json",
            }
        }
         

        

        const {data} = await axios.put(`/api/v1/review`,reviewData,config);


        

        dispatch({
            type:NEW_REVIEW_SUCCESS,
            payload :data.success,
        })

        

    }catch(error){
        dispatch({
            type:NEW_REVIEW_FAIL,
            payload:error.response.data.message
        })
    }
} 




//clearing errors;
export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type:CLEAR_ERROR,
    })
}