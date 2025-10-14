import { useState } from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import routes from '../routes'
import { signUp } from '../store/slices/authSlice.jsx'
import getSignUpSchema from '../validation/signUpSchema.js'

const SignUpForm = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isUsernameTaken, setUsernameTaken] = useState(false)

  const validationSchema = getSignUpSchema(t)

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true)
    const { username, password } = values
    try {
      const responce = await axios.post(routes.signupPath(), { username, password })
      setUsernameTaken(false)
      dispatch(signUp(responce.data))
      navigate('/')
    }
    catch (error) {
      if (error.status === 409) {
        setUsernameTaken(true)
      }
      console.log(error.message)
    }

    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="w-50">
          <h1 className="text-center mb-4">{t('signUpForm.h1')}</h1>

          <div className="form-floating mb-3">
            <Field
              type="username"
              name="username"
              required
              placeholder="От 3 до 20 символов"
              id="username"
              className={`form-control ${(errors.username && touched.username) || isUsernameTaken ? 'is-invalid' : ''}`}
            />
            <label htmlFor="username">{t('signUpForm.usernameLabel')}</label>
            <div className="invalid-tooltip">
              {isUsernameTaken ? t('errors.authorizationError') : errors.username ? errors.username : ''}
            </div>
          </div>

          <div className="form-floating mb-3">
            <Field
              type="password"
              name="password"
              required
              placeholder="Не менее 6 символов"
              id="password"
              className={`form-control ${errors.password && touched.password && 'is-invalid'}`}
              aria-describedby="passwordHelpBlock"
            />
            <div className="invalid-tooltip">{errors.password ? errors.password : ''}</div>
            <label htmlFor="password">{t('signUpForm.passwordLabel')}</label>
          </div>

          <div className="form-floating mb-4">
            <Field
              type="password"
              name="confirmPassword"
              required
              placeholder="Пароли должны совпадать"
              id="confirmPassword"
              className={`form-control ${errors.confirmPassword && touched.confirmPassword && 'is-invalid'}`}
            />
            <div className="invalid-tooltip">{errors.confirmPassword ? errors.confirmPassword : ''}</div>
            <label htmlFor="confirmPassword">{t('signUpForm.confirmPasswordLabel')}</label>
          </div>

          <Button type="submit" variant="outline-primary" className="w-100">
            {t('signUpForm.registrationButton')}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default SignUpForm
