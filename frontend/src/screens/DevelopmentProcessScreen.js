import React, {useState, useEffect} from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

import { verifyCodeAction } from '../actions/aboutshareActions';

function FeaturesVideoScreen() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams()
    const code = searchParams.get('securitycode') ? searchParams.get('securitycode') : ''

    const location = useLocation();
    
    //dispatch để bắn event chạy tới redux
    const dispatch = useDispatch()

    //lấy dữ liệu từ store
    const aboutshareVerifyCode = useSelector(state => state.aboutshareVerifyCode)
    const {error, loading, success, url} = aboutshareVerifyCode

    const [securitycode, setSecuritycode] = useState(code)
    let [inputRequiredMsg, setInputRequiredMsg] = useState('')
    

    const submitHandler = (e) => {
        e.preventDefault()    
        
        if(!success && securitycode) {
            setInputRequiredMsg('')
            dispatch(verifyCodeAction(securitycode))
            navigate(`${location.pathname}?securitycode=${securitycode}`)
        }
        else {
            setInputRequiredMsg('Enter security code')
            navigate(`${location.pathname}?securitycode=`)
        }
    }


    useEffect(() => {
        if(!success && securitycode) {
            dispatch(verifyCodeAction(securitycode))
        }        
    }, [dispatch, success, navigate, inputRequiredMsg])


    const htmlDesc = (<><h1>Development log</h1><p>View the log file recording all the development of this website (more than 3000 lines)</p></>)


    return (<>

        {!success && (
            <FormContainer>     
                {htmlDesc}

                {(inputRequiredMsg || error) && 
                    <Message variant='danger'>{inputRequiredMsg ? inputRequiredMsg : error}</Message>}

                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="Securitycode">
                        <Form.Label>Security code <i>(contact admin):</i></Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="Enter security code"
                            value={securitycode}
                            onChange={(e) => setSecuritycode(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary" className="my-3">
                        Submit
                    </Button>
                </Form>
            </FormContainer>
        )}
        
        {success && url && (
            <FormContainer xs={12} md={12}> 
                {htmlDesc}
                <br/>
                <iframe 
                    src={url}
                    style={{"border":"none", "width":"100%", "height":"200%"}}
                ></iframe>
            </FormContainer>
        )}
        </>
    )
}

export default FeaturesVideoScreen
