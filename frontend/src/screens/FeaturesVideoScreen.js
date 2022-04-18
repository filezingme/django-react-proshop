import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Form, Button, ListGroupItem } from "react-bootstrap";

function FeaturesVideoScreen() {
    
    useEffect(() => {
        
    }, [])


  return <div>
      <Row>
          <Col md={12}>
            <h1>Features of Website</h1>
            <div className="video-container">
                <iframe width="560" height="315" 
                    src="https://www.youtube.com/embed/_2-7tnRaCmI" 
                    frameBorder={0}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                </iframe>
            </div>
            </Col>
      </Row>
  </div>;
}

export default FeaturesVideoScreen;
