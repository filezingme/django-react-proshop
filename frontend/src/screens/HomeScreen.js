import React, {useState, useEffect} from "react";
import { Row, Col } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

//import axios from 'axios';
//import products from '../products';


//const useQuery = () => {
//  return new URLSearchParams(useLocation().search);
//}


function HomeScreen() {
  //const [products, setProducts] = useState([])
  const dispatch = useDispatch()
  
  //let keyword = useQuery().get("keyword")

  let keyword = useLocation().search //>>> '?keyword=abc'
  console.log('1'+keyword)

  const productList = useSelector(state => state.productList)
  const {error, loading, products, page, pages} = productList


  useEffect(() => {
    
    // async function fetchProducts() {
    //   const {data} = await axios.get('/api/products/')
    //   setProducts(data)
    // }
    // fetchProducts()

    dispatch(listProducts(keyword))

  }, [dispatch, keyword])

  //const products = []
  

  return <div>
      
      {!keyword && <ProductCarousel />}
      <h1>
        {!keyword ? ('Latest Products') : ('Search results')}
      </h1>
      
      {loading ? <Loader/>
          : error ? <Message variant='danger'>{error}</Message> //Hoặc: <Message variant='danger' children={error}></Message>
          :
          <div>
            <Row>
              {products.map(product => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
              ))}
            </Row>

            <Paginate page={page} pages={pages} />

          </div>
      }
      
  </div>;
}

export default HomeScreen;
