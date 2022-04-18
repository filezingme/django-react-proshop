import React, {useEffect} from "react";
import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Form, Button, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

function CartScreen() {
    const navigate = useNavigate();

    //get params trên url
    console.log('3. CartScreen')
    const [searchParams, setSearchParams] = useSearchParams()
    const qty = Number(searchParams.get('qty'))
    const {id} = useParams()

    //lấy dữ liệu cart từ store
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    console.log('3. CartScreen > 1', cartItems)

    //dispatch để bắn event chạy tới redux
    const dispatch = useDispatch()

    //useEffect: vòng đời của function component
    //- Đối số thứ nhất của useEffect() là một hàm xử lý khi có gì thay đổi components
	//- Đối số thứ 2 của useEffect() là một mảng, mảng này cho biết rõ chỉ gọi useEffect() khi giá trị phần tử trong mảng thay đổi, vd:
    useEffect(() => {
        if(id) {
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping')
    }


  return <div>
      <Row>
          <Col md={8}>
              <h1>Shopping Cart</h1>
              {cartItems.length === 0 ? (
                <Message variant='info'>
                    Your cart is empty <Link to='/'>Go Back</Link>
                </Message>
              ) : (
                <ListGroup variant="flush">
                    {cartItems.map(item => (
                        <ListGroup.Item key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col md={5}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>
                                    ${item.price}
                                </Col>
                                <Col md={2} xs={9}>
                                    <Form.Select 
                                        value={item.qty} 
                                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                    >
                                        {
                                            [...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x+1} value={x+1}>
                                                {x+1}
                                            </option>
                                            ))
                                        }
                                    </Form.Select>
                                </Col>
                                <Col md={1} xs={3}>
                                    <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product)}>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}                    
                </ListGroup>
              )}
          </Col>
          
          <Col md={4}>
              <Card>
                  <ListGroup variant="flush">
                    <ListGroupItem>
                        <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                        ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                    </ListGroupItem>

                    <ListGroupItem>
                        <Button 
                            type="button" 
                            className="btn-block w-100" 
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >Proceed To Checkout</Button>
                    </ListGroupItem>
                  </ListGroup>
              </Card>
          </Col>
      </Row>
  </div>;
}

export default CartScreen;
