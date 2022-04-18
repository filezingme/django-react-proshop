import axios from 'axios'
import { 
    SECURITY_CODE_REQUEST,
    SECURITY_CODE_SUCCESS,
    SECURITY_CODE_FAIL,

 } from '../constants/aboutshareConstant'


 export const verifyCodeAction = (securityCode) => async (dispatch) => {
    try {
        dispatch({
            type: SECURITY_CODE_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.get(
            `/api/aboutshare/verifycode/${securityCode}/`,
            config
        )

        dispatch({
            type: SECURITY_CODE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SECURITY_CODE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}