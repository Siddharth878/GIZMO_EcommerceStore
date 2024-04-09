import {combineReducers,applyMiddleware} from 'redux';
// import {createStore} from 'redux';
import { configureStore } from '@reduxjs/toolkit'  // replacement of createStore
import thunk from 'redux-thunk';
import { newReviewReducer, productDetailsReducer, productReducer } from './reducers/productReducer';
import { userReducer ,profileReducer, forgotPasswordReducer} from "./reducers/userReducer"
import { cartReducer } from './reducers/cartReducer';
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from './reducers/orderReducer';

// import {composedWithDevTools}  from 'redux-devtools-extension'; iski jagh applyMiddleware



const allReducers = combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer
});

let intialState = {
    cart:{
        cartItems:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[],
        shippingInfo:localStorage.getItem('shippingInfo')?JSON.parse(localStorage.getItem('shippingInfo')):{},
    },
};

const middleWare = [thunk];

const store = configureStore({reducer:allReducers},intialState,applyMiddleware(...middleWare));


export default store  // export default store usko define krte time nahi lga skte because yeh default export h (ie.. eek hi horha export ) --> named exports are like (router) controllers meh




