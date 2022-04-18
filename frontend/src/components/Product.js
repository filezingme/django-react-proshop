import React from "react";
import { Card } from "react-bootstrap";
import Rating from './Rating';
import { Link } from 'react-router-dom';


const styles = {
  card: {
    borderRadius: 10,
    width: '100%',
    height: '92%',
  },
  cardImage: {
    objectFit: 'cover',
    borderRadius: 3,
    width: '100%',
    height: '100%',
  }
}


function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded" style={styles.card}>
      <Link to={`/product/${product._id}/`}>
        <Card.Img src={product.image} style={styles.cardImage} />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            {product.rating} from {product.numReviews} reviews
            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
          </div>
        </Card.Text>

        <Card.Text as="h3">
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product;
