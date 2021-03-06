import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function FormContainer({ children, xs=12, md=6 }) {
  return (
    <Container>
        <Row className="justify-content-center">
            <Col xs={xs} md={md}>
                {children}
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer