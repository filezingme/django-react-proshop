import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

import { 
    productListReducer, 
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer,
    productTopRatedReducer,
} from './reducers/productReducers';

import { 
    cartReducer 
} from './reducers/cartReducers';

import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer, 
    userListReducer, 
    userDeleteReducer,
    userUpdateReducer,
 } from './reducers/userReducer';

import { 
    orderCreateReducer, 
    orderDetailsReducer, 
    orderPayReducer, 
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer,
} from './reducers/orderReducers';

import { 
    verifyCodeReducer,
} from './reducers/aboutshareReducer';


console.log('1. store.js')
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,

    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,

    aboutshareVerifyCode: verifyCodeReducer,
})


//khởi tạo biến cartItemsFromStorage lấy dữ liệu cart từ localStorage
const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : []

    
const userInfoFromStorage = localStorage.getItem('userInfo') ? 
JSON.parse(localStorage.getItem('userInfo')) : null

    
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? 
JSON.parse(localStorage.getItem('shippingAddress')) : {}

    
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? 
JSON.parse(localStorage.getItem('paymentMethod')) : null


//State: lưu trữ tất cả các biến trong ứng dụng, với giá trị ban đầu được lấy từ localStorage
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    },
    userLogin: {
        userInfo: userInfoFromStorage
    }
}


//Middleware có nghĩa là báo redux biết thằng event có dùng API hay không để còn biết để chờ và cập nhật cho cái đống redux của nó
//Middleware chính là lớp trước khi vào đến core của redux thì nó đã xử lý rồi
const middleware = [thunk]

console.log('3. store.js > 1')

//Store: là điểm duy nhất nhất trong ứng dụng. Store quản lý tất cả các biến của tất cả các component trong ứng dụng
const store = createStore(
    reducer, //reducer
    initialState, //state
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
)

export default store