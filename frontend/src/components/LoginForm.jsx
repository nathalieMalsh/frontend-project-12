import React, { useState } from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
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
        <Form>
          <h1>Войти</h1>
          <div>
            <label htmlFor="username">Ваш ник</label>
            <Field
              type="username"
              name="username"
              autocomplete="username"
            />
          </div>
          <div>
            <label htmlFor="password">Пароль</label>
            <Field
              type="password"
              name="password"
              autocomplete="current-password"
            />
          </div>
          <div hidden={!authError}>Неверные имя пользователя или пароль</div>
          <button type="submit" disabled={isSubmitting}>Войти</button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm;