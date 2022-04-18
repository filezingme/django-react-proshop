import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Form, Button, ListGroupItem } from "react-bootstrap";

function OverviewScreen() {
    
    useEffect(() => {
        
    }, [])


    const openCertificatePopup = (e) => {
        e.preventDefault()

        var h = window.screen.height/1.5;
        var w = window.screen.width/1.5;

        const x = window.top.outerWidth / 2 + window.top.screenX - ( w / 2);
        const y = window.top.outerHeight / 2 + window.top.screenY - ( h / 2);

        var features = `location=yes,height=${h},width=${w},scrollbars=yes,status=yes, top=${y}, left=${x}`;
        var url = "https://udemy-certificate.s3.amazonaws.com/image/UC-5d3f63ed-7060-4c43-8b6e-51ff955ab8bc.jpg?v=1649830397000";
        var win = window.open(url, "_blank", features);
    }


  return <div>
      <Row>
          <Col md={12}>
              <h1>About Me</h1>
              
              <ListGroup variant="flush">
                <ListGroup.Item>
                    <p>I'm Tai, you can call me Thomas<br/>
                    My full name is Tai Truong Duc<br/>
                    I live in Ha Noi. <br/>
                    My phone number: (+84) nine seven nine one one six one one eight</p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Python & React Fullstack</h2>
                    <p>
                    I completed the course on building a fullstack website using Python & React on <a href="https://www.udemy.com/" target='_blank'>udemy.com</a>. View <a href="" onClick={openCertificatePopup}>my certificate</a>.</p>
                    
                    <p>Website <a href="https://www.ihaywa.com/">www.ihaywa.com</a> is a finished product of me completing this online course. See <a href="/overview">overview</a></p>
                </ListGroup.Item>
                
                <ListGroup.Item>
                    <h2>ASP.NET Fullstack</h2>
                    <p>I have 14 years of experience in management and development with ASP.NET like Webform, MVC, .Net Core & Blazor</p>

                    <p>I have a lot of experience and skills in working with projects both large & small, as well as working with foreign clients such as UK, USA, India,..</p>
                    
                    <p>I have the ability to learn technology quickly as well as work under high pressure & work with difficult customers.</p>
                </ListGroup.Item>
            </ListGroup>
          </Col>
      </Row>
  </div>;
}

export default OverviewScreen;
