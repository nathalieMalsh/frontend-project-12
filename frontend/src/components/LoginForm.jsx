import { useState } from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import routes from '../routes'
import { loginSuccess } from '../store/slices/authSlice.jsx'

const LoginForm = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [authError, setAuthError] = useState(false)

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true)
    try {
      const responce = await axios.post(routes.loginPath(), values)
      const userData = responce.data
      dispatch(loginSuccess(userData))
      setAuthError(false)
      navigate('/')
    }
    catch (error) {
      console.log(error.message)
      setAuthError(true)
    }

    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="col-12 mt-3 mt-md-0">
          <h1 className="text-center mb-4">{t('loginForm.h1')}</h1>

          <div className="form-floating mb-3">
            <Field
              type="username"
              name="username"
              required
              placeholder="Ваш ник"
              id="username"
              className={`form-control ${authError ? 'is-invalid' : ''}`}
            />
            <label htmlFor="username">{t('loginForm.usernameLabel')}</label>
          </div>

          <div className="form-floating mb-4">
            <Field
              type="password"
              name="password"
              required
              placeholder="Пароль"
              id="password"
              className={`form-control ${authError ? 'is-invalid' : ''}`}
            />
            <label htmlFor="password">{t('loginForm.passwordLabel')}</label>
            {authError && <div className="invalid-tooltip">{t('errors.loginError')}</div>}
          </div>

          <Button type="submit" variant="outline-primary" className="w-100 mb-3" disabled={isSubmitting}>
            {t('loginForm.loginButton')}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
