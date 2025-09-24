import { Container, Navbar } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../slices/authSlice'

const Header = () => {
  const dispatch = useDispatch()

  const { userId } = useSelector((state) => state.auth)
  const token = userId?.token

  return (
    <Navbar className='shadow-sm' expand='lg' bg='white'>
      <Container>
        <Navbar.Brand href='/'>Hexlet Chat</Navbar.Brand>
        {token && <Button type='button' variant='primary' onClick={() => dispatch(logOut())}>Выйти</Button>}
      </Container>
    </Navbar>
  )
}

export default Header