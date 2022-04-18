import { 
    SECURITY_CODE_REQUEST,
    SECURITY_CODE_SUCCESS,
    SECURITY_CODE_FAIL,

 } from '../constants/aboutshareConstant'


 export const verifyCodeReducer = (state = {}, action) => {
    switch(action.type) {
        case SECURITY_CODE_REQUEST:
            return {'loading': true}

        case SECURITY_CODE_SUCCESS:
            return {'loading': false, success: true, url: action.payload}
            
        case SECURITY_CODE_FAIL:
            return {'loading': false, error: action.payload}

        default:
            return state
    }
}