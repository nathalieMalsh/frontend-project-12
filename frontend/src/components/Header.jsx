import { Container, Navbar } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { logOut } from '../store/slices/authSlice.jsx'

const Header = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const { userId } = useSelector(state => state.auth)
  const token = userId?.token

  return (
    <Navbar className="shadow-sm" expand="lg" bg="white">
      <Container>
        <Navbar.Brand href="/">{t('header.navbarBrand')}</Navbar.Brand>
        {token && <Button type="button" variant="primary" onClick={() => dispatch(logOut())}>{t('header.signOutButton')}</Button>}
      </Container>
    </Navbar>
  )
}

export default Header
