import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Form, Button, ListGroupItem } from "react-bootstrap";

function OverviewScreen() {
    
    useEffect(() => {
        
    }, [])


  return <div>
      <Row>
          <Col md={12}>
              <h1>Overview</h1>
              
              <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>Platform</h2>
                    <p>This is an completely eCommerce site developed with: React, Redux, Python Django, Postgres database<br/>
                    As well as using the API by Django REST Framework and UI by React-bootstrap lib.</p>
                </ListGroup.Item>
                
                <ListGroup.Item>
                    <h2>Hosting services</h2>
                    <ul>
                        <li><p>Amazon AWS S3 for image upload</p></li>
                        <li><p>Amazon Web Services for Postgres database</p></li>
                        <li><p>Heroku for deploy, manage (Cloud web hosting)</p></li>
                    </ul>
                </ListGroup.Item>
                
                <ListGroup.Item>
                    <h2>Site Description</h2>
                    <p>The eCommerce / shopping cart application using Django & REACT with the following functionality...</p>

                    <ul>
                        <li><p>Full featured shopping cart</p></li>
                        <li><p>Product reviews and ratings</p></li>
                        <li><p>Top products carousel</p></li>
                        <li><p>Product pagination</p></li>
                        <li><p>Product search feature</p></li>
                        <li><p>User profile with orders</p></li>
                        <li><p>Admin product management</p></li>
                        <li><p>Admin user management</p></li>
                        <li><p>Admin Order details page</p></li>
                        <li><p>Mark orders as delivered option</p></li>
                        <li><p>Checkout process (shipping, payment method, etc)</p></li>
                        <li><p>PayPal / credit card integration</p></li></ul>

                    <br/>
                    <h4>The project uses the following</h4>

                    <ul>
                        <li><p>React with Functional Components &amp; Hooks</p></li>
                        <li><p>React router</p></li>
                        <li><p>React-Bootstrap UI library</p></li>
                        <li><p>How to structure components</p></li>
                        <li><p>Component level state &amp; props</p></li>
                        <li><p>Managing global state with Redux (Actions &amp; Reducers)</p></li>
                        <li><p>Using Redux state in components (useDispatch &amp; useSelector)</p></li>
                        <li><p>Creating an extensive back end with Express</p></li>
                        <li><p>JWT authentication (JSON web tokens)</p></li>
                        <li><p>Custom error handler</p></li>
                        <li><p>Integrating the PayPal API</p></li>
                        <li><p>Project deployment</p></li>
                        <li><p>Much more!</p></li></ul>

                    <br/>
                    <h4>Build functions</h4>

                    <ul>
                        <li><p>Full featured shopping cart with PayPal &amp; credit/debit payments</p></li>
                        <li><p>Product rating &amp; review system</p></li>
                        <li><p>An actual real-world project built in a linear and progressive manner</p></li>
                        <li><p>Admin area to manage customers, products &amp; orders</p></li>
                        <li><p>Product search, carousel, pagination &amp; more</p></li>
                    </ul>
                </ListGroup.Item>
            </ListGroup>
          </Col>
      </Row>
  </div>;
}

export default OverviewScreen;
