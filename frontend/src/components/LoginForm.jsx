import React, { useState } from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Alert } from 'react-bootstrap';
import routes from '../routes'
import { loginSuccess } from '../slices/authSlice'

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [authError, setAuthError] = useState(false)
  
  return (
    <Formik 
      initialValues={{ username: "", password: "" }}
      onSubmit={ async (values, { setSubmitting }) => {
        setSubmitting(true) 
        try {
          const responce = await axios.post(routes.loginPath(), values)
          const token = responce.data
          dispatch(loginSuccess({ token }))
          setAuthError(false)
          navigate('/')
        }
        catch (error) {
          console.log(error.message)
          setAuthError(true)
        }

        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className='col-12 mt-3 mt-md-0'>
          <h1 className='text-center mb-4'>Войти</h1>

          <div className='form-floating mb-3'>
            <Field
              type="username"
              name="username"
              autocomplete="username"
              required
              placeholder='Ваш ник'
              id='username'
              className={`form-control ${authError ? 'is-invalid' : ''}`}
            />
            <label htmlFor="username">Ваш ник</label>
          </div>

          <div className='form-floating mb-4'>
            <Field
              type="password"
              name="password"
              autocomplete="current-password"
              required
              placeholder='Пароль'
              id="password"
              className={`form-control ${authError ? 'is-invalid' : ''}`}
            />
            <label htmlFor="password">Пароль</label>
            {authError && <div className='invalid-tooltip'>Неверные имя пользователя или пароль</div>}
          </div>

          <Button type='submit' variant='outline-primary' className='w-100 mb-3' disabled={isSubmitting}>
            Войти
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm;