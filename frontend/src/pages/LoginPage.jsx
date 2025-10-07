import { Container, Row, Col, Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import LoginForm from '../components/LoginForm.jsx'
import Header from '../components/Header.jsx'

const LoginPage = () => {
  const { t } = useTranslation()

  return (
    <div className="h-100 d-flex flex-column">
      <Header />
      <Container fluid className="h-100">
        <Row className="justify-content-center align-content-center h-100">
          <Col xs={12} md={8} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body className="row p-5">
                <Col xs={12} md={6} className="d-flex align-items-center justify-content-center mb-3 mb-md-0">
                  <img src="https://frontend-chat-ru.hexlet.app/assets/avatar-DIE1AEpS.jpg" alt={t('loginPage.altText')} className="rounded-circle img-fluid" />
                </Col>
                <Col xs={12} md={6}>
                  <LoginForm />
                </Col>
              </Card.Body>

              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>{t('loginPage.question')}</span>
                  <a href="/signup">{t('loginPage.signUpLink')}</a>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default LoginPage
