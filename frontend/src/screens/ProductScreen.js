import React, {useState, useEffect} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails, createProductReview } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

//import axios from 'axios';
//import products from '../products';


function ProductScreen() {
  const navigate = useNavigate();

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const {id} = useParams()
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const {error, loading, product} = productDetails
  
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const {error: errorProductReview, loading: loadingProductReview, success: successProductReview} = productReviewCreate
  
  //const product = products.find((p) => p._id == id);

  //const params = useParams();
  //const product = products.find((p) => p._id == params.id);

  //const [product, setProduct] = useState([])

  useEffect(() => {
    
    // async function fetchProduct() {
    //   const {data} = await axios.get(`/api/products/${id}`)
    //   setProduct(data)
    // }
    // fetchProduct()

    dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
    
    if (successProductReview) {
      setRating(0)
      setComment('')
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
    }

    dispatch(listProductDetails(id))

  }, [dispatch, id, successProductReview])

  //let product = {}

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(createProductReview(
      id, { rating, comment }
    ))
  }


  return (
    <div>
      <div>
        <Link to="/" className="btn btn-light my-3">Go Back</Link>
        {loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message> //Hoặc: <Message variant='danger' children={error}></Message>
            :
            (
            <div>
              <Row>
                <Col md={6}>
                  <Image src={product.image} alt={product.name} fluid />
                </Col>

                <Col md={3}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h3>{product.name}</h3>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                        color={"#f8e825"}
                      />
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <h5>Description:</h5>
                      {product.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>

                <Col md={3}>
                  <Card>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>
                            <strong>${product.price}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                            {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {product.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col className="pt-3">Qty:</Col>
                            <Col xs='auto' className="my-1">
                              <Form.Select className="mx-auto" value={qty} onChange={(e) => setQty(e.target.value)}>
                                {
                                  [...Array(product.countInStock).keys()].map((x) => (
                                    <option key={x+1} value={x+1}>
                                      {x+1}
                                    </option>
                                  ))
                                }
                              </Form.Select>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}

                      <ListGroup.Item>
                        <Button className="btn-block w-100" disabled={product.countInStock === 0} type="button" onClick={addToCartHandler}>Add to Cart</Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>

              <Row className="mt-5">
                <Col md={6}>
                  <h4>Reviews</h4>                                
                  {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

                  <ListGroup variant='flush'>
                      {product.reviews.map((review) => (                        
                        <ListGroup.Item key={review._id}>
                          <strong>{review.name}</strong>
                          <Rating value={review.rating} color='#f8e825' />
                          <p>{review.createdAt.substring(0, 10)}</p>
                          <p>{review.comment}</p>
                        </ListGroup.Item>
                      ))}

                      <ListGroup.Item className="my-3">
                        <h4>Write a comment</h4>

                        {loadingProductReview && <Loader/>}
                        {successProductReview && <Message variant='success'>Review Submitted</Message>}
                        {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                        {userInfo ? (
                          <Form onSubmit={submitHandler}>
                            <Form.Group controlId="rating">

                              <Form.Label>Rating</Form.Label>
                              <Form.Select
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                              >
                                <option value=''>Select...</option>
                                <option value='1'>1 - Poor</option>
                                <option value='2'>2 - Fair</option>
                                <option value='3'>3 - Good</option>
                                <option value='4'>4 - Very Good</option>
                                <option value='5'>5 - Excellent</option>
                              </Form.Select>
                            </Form.Group>

                            <Form.Group className="mt-3" controlId="comment">
                              <Form.Label>Review</Form.Label>
                              <Form.Control 
                                as="textarea" 
                                rows={4} 
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                              />
                            </Form.Group>

                            <Button
                              className="mt-3"
                              disabled={loadingProductReview}
                              type='submit'
                              variant="primary"
                            >
                              Submit
                            </Button>

                          </Form>
                        ) : (
                          <Message variant='info'>Please <Link to={`/login?redirect=/product/${id}/`}>login</Link> to write a review</Message>
                        )}
                      </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </div>
            )
        }
      </div>
    </div>
  );
}

export default ProductScreen;
