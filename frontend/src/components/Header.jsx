import { Container, Navbar } from 'react-bootstrap'

const Header = () => (
  <Navbar className='shadow-sm' expand='lg' bg='white'>
    <Container>
      <Navbar.Brand href='/'>Hexlet Chat</Navbar.Brand>
    </Container>
  </Navbar>
)

export default Header