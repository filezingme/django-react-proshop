//Need must: npm install @paypal/react-paypal-js
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { payOrder } from '../actions/orderActions';
import Loader from '../components/Loader';
import {
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";


// This values are the props in the UI
// const amount = "2";
// const currency = "USD";
// const style = {"layout":"vertical"};


// Custom component to wrap the PayPalButtons and handle currency changes
function PayPalPayment ({ orderId, amount, currency, showSpinner, style }) {

    const dispatchRedux = useDispatch()

    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [dispatchRedux, orderId, amount, currency, showSpinner, style]);


    const successPaymentHandler = (paymentResult) => {
        //console.log('successPaymentHandler')
        dispatchRedux(payOrder(orderId, paymentResult))
    }


    return (<>
            { (showSpinner && isPending) && <Loader/> }

            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((_orderId) => {
                            // Your code here after create the order
                            console.log('Created the order: ' + _orderId)
                            return _orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function () {
                        // Your code here after capture the order
                        successPaymentHandler();
                        console.log('Ordered successfully')
                    });
                }}
            />
        </>
    );
}

export default PayPalPayment;