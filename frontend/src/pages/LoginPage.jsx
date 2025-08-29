import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'
import LoginForm from '../components/LoginForm.jsx';

const LoginPage = () => (
  <Container fluid className='h-100' /* общий div */>
    <Row className='justify-content-center align-content-center h-100'>
      <Col xs={12} md={8} xxl={6}>
        <Card className='shadow-sm'>
          <Card.Body className='row p-5'/* первый div */>
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-center mb-3 mb-md-0">
              <img src="https://i.pinimg.com/736x/1d/53/95/1d5395564301e8b738bd6b483542e023.jpg" alt="Войти" className="rounded-circle img-fluid" />
            </Col>
            <Col xs={12} md={6}>
              <LoginForm />
            </Col>
          </Card.Body>

          <Card.Footer className='p-4' /* второй div */>
            <div className='text-center'>
              <span>Нет аккаунта? </span>
              <a href="">Регистрация</a>
            </div>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  </Container>
)

export default LoginPage;