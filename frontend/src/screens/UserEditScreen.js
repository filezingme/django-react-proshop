import React, {useState, useEffect} from "react";
import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

import { getUserDetails, updateUser, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstant';

function UserEditScreen() {
    const navigate = useNavigate();

    //get id param and rename to userId
    const {id: userId} = useParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    
    //dispatch để bắn event chạy tới redux
    const dispatch = useDispatch()

    //lấy dữ liệu userLogin từ store
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails
    
    const userUpdate = useSelector(state => state.userUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = userUpdate
    

    useEffect(() => {

        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET})
            navigate('/admincp/userlist')
        }
        else {
            if(!user.name || user._id !== Number(userId)){
                dispatch(getUserDetails(userId))
            }
            else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
        
    }, [user, userId, successUpdate, navigate, userInfo])


    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(updateUser({
            _id: user._id,
            name,
            email,
            isAdmin
        }))                

        //if currently logged user then update userInfo in localStorage
        if(userInfo._id === Number(userId)) {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': ''
            }))
        }
    }

    return (
        <div>
            <Link to='/admincp/userlist' /*onClick={() => navigate(-1)}*/>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>

                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }

                {loading ? <Loader/>
                    : error ? <Message variant='danger'>{error}</Message> //Hoặc: <Message variant='danger' children={error}></Message>
                    : 
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        
                        <Form.Group controlId="isadmin">
                            <Form.Label>Password</Form.Label>
                            <Form.Check
                                type="checkbox"
                                label="Is Admin"
                                value={isAdmin}
                                defaultChecked={user.isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>

                        <Button type="submit" variant="primary" className="my-3">
                            Update
                        </Button>
                    </Form>
                }                
            </FormContainer>
        </div>
    );
}

export default UserEditScreen