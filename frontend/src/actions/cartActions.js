import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";
import axios from "axios";


// let len = -1;




// const setLocalStorage = (...item) =>{
    
//     let cartItems = [];

//     const newItem = item[0][0];


//     if(localStorage.getItem('cartItems')){

//         cartItems = JSON.parse(localStorage.getItem('cartItems'));

//         // if already present -- this is not working for more than 2 products (it will update the quantity of last inserted product instead)

//         const alreadyPresent = cartItems.find(i=>i.product===newItem.product);

//         if(alreadyPresent){
//             cartItems.forEach(x =>{
//                 if(x.product===newItem.product){
//                     console.log(x.product,newItem.product)
//                     x.quantity+=1;
//                 }else{
//                     x.quantity = 1;
//                 }
//             })
//         }
//         else{
//          cartItems.push(newItem);
//         }
//     }
//     else{
//         cartItems.push(newItem)
//     }

//     localStorage.setItem('cartItems',JSON.stringify(cartItems));
// }




 // Add items to cart
 export const addItemsToCart = (id,quantity) => async(dispatch,getState) =>{
    

    
    const {data} = await axios.get(`/api/v1/products/${id}`);

    //  console.log(data.product.images[0][0]);

    
    dispatch({
        type: ADD_TO_CART,
        payload: {
          product: data.product._id,
          name: data.product.name,
          price: data.product.price,
          // image: data.product.images[0].url,
          image:data.product.images[0],
          stock: data.product.Stock,
          quantity,
        },
      });
       
    //  setLocalStorage(getState().cart.cartItems);

  
};






// Remove from cart

export const removeItemsFromCart = (id) => async(dispatch) =>{

     dispatch({type:REMOVE_CART_ITEM,
               payload:id});


}
    










// Save Shipping info

export const saveShippingInfo = (data) => async(dispatch) =>{

  dispatch({type:SAVE_SHIPPING_INFO,
            payload:data});

  localStorage.setItem("shippingInfo",JSON.stringify(data));            

}
 

