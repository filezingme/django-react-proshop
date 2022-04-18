import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR_ITEMS
} from '../constants/cartConstants'


//Reducer: là nơi tổng hợp dựa trên State & Action để xử lý. Logic chính sẽ nằm trong reducer
export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    console.log('2. cartReducer.js', action, state)

    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)
            console.log('2. cartReducer.js > 1', action, state)

            if(existItem){
                console.log('2. cartReducer.js > 1.1', action, state)

                return {
                    ...state, //lưu lại state cũ
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x) //nếu tồn tại chỉ cập nhật product theo item mới nhất từ payload
                }
            }
            else {
                console.log('2. cartReducer.js > 1.2', action, state)

                return {
                    ...state, //lưu lại state cũ
                    cartItems: [...state.cartItems, item] //cartItems mới sẽ có tất cả item cũ và item mới
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }

        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: []
            }

        default:
            return state
    }
}