import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'
import SignUpForm from '../components/SignUpForm';

const SignUp = () => (
  <Container fluid className='h-100'>
    <Row className='justify-content-center align-content-center h-100'>
      <Col xs={12} md={8} xxl={6}>
        <Card className='shadow-sm'>
          <Card.Body className='d-flex flex-column flex-md-row justify-content-around align-items-center p-5'>
            <div>
              <img src="https://frontend-chat-ru.hexlet.app/assets/avatar_1-D7Cot-zE.jpg" alt="Регистрация" className="rounded-circle" />
            </div> 
            <SignUpForm />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
)

export default SignUp