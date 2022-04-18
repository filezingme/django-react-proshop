import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

function ProductListScreen() {
    const navigate = useNavigate();

    const dispatch = useDispatch()

    let keyword = useLocation().search //>>> '?keyword=abc'

    const productList = useSelector(state => state.productList)
    const {loading, error, products, page, pages} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    useEffect(() => {

        dispatch({type: PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin){
            navigate('/login')
        }

        if(successCreate){
            navigate(`/admincp/product/${createdProduct._id}/edit`)
        }      
        else {
            dispatch(listProducts(keyword))
        }

    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, keyword])


    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this product?')){
            dispatch(deleteProduct(id))
        }
    }


    const createProductHandler = () => {
        dispatch(createProduct())
    }


    return (
        <div>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>      

            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message> }

            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message> }

            {loading ? <Loader/>
                : error ? <Message variant='danger'>{error}</Message> //Hoặc: <Message variant='danger' children={error}></Message>
                :
                <div>
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>
                                    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                                        {product.name}
                                    </Link>
                                    </td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admincp/product/${product._id}/edit`}>
                                            <Button variant="light" className="btn-sm">
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>

                                        <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Paginate page={page} pages={pages} isAdmin={true} />
                </div>
            }
        </div>
    )
}

export default ProductListScreen