

import { ADD_TO_CART, REMOVE_CART_ITEM ,SAVE_SHIPPING_INFO} from "../constants/cartConstants";





// doubt aisa intial state humne store meh bhi dala h (kyun ?  ----- doubt)

const initialState = {
    // Retrieve any existing cart data, or return default empty array
    // cartItems: JSON.parse(localStorage.getItem('cartItems')) ?? []
    cartItems:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[],
    shippingInfo:localStorage.getItem('shippingInfo')?JSON.parse(localStorage.getItem('shippingInfo')):{},
  };

export const cartReducer = (state = initialState, action) => {

    
    switch (action.type) {
        case ADD_TO_CART:
            const newItem = action.payload;
          
            const existItem = state.cartItems.some(
             item => item.product === newItem.product
            );
          
            let cartItems;
                      
            if (existItem) {
                  // Replace existing item with new quantity value
                cartItems = state.cartItems.map(
                    item => item.product === newItem.product ? newItem : item
                )
            } else {
                  // Add new item to cart
                cartItems = state.cartItems.concat(newItem);
            }
          
            // persist updated cart items array to localStorage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
          
             // Return new state
            return { ...state, cartItems };
          
            



        
             
        case REMOVE_CART_ITEM:

            let newCartItems = state.cartItems.filter((i)=>i.product!==action.payload);
            localStorage.setItem('cartItems', JSON.stringify(newCartItems)); // (doubt is :) because payment ki har stage pe woh localStorage se hi le rha 
            return {                                                         // local storage se state walle cartItems bhi update hojata warna nahi hota (dhyan se dekho sabh)
                ...state,
                cartItems:newCartItems
            };
            
            

        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo:action.payload,
            };  
        
        default:
                return state;
       

        //     const item = action.payload
        //     const existItem = state.cartItems.find(x => x.product === item.product)
            
        //     if(existItem){

                
        //         return{
        //             ...state,
        //             cartItems: state.cartItems.map(x =>
        //               x.product === existItem.product ? item : x)
        //         }
        //     }else{

                
        //        return{
        //            ...state,
        //            cartItems:[...state.cartItems, item]
        //        }
        //     }


        // default:
        //     return state
       
    }
}