import React from 'react';
import axios from 'axios'
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom'
import routes from '../routes';

const LoginForm = () => {
  const navigate = useNavigate()
  
  return (
    <Formik 
      initialValues={{ username: "", password: "" }}
      onSubmit={ async (values, { setSubmitting }) => {
        setSubmitting(true)

        console.log(values); // { password: '', username: '' }
        try {
          const responce = await axios.post(axios.post(routes.loginPath(), values))
          window.localStorage.setItem('userId', responce.data)
          navigate('/')
        }
        catch (error) {
          console.log(error.message)
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
            />
          </div>
          <div>
            <label htmlFor="password">Пароль</label>
            <Field
              type="password"
              name="password"
            />
          </div>
          <button type="submit" disabled={isSubmitting}>Войти</button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm;