import React from 'react';
import { Formik, Form, Field } from 'formik';

const LoginForm = () => (
  <Formik 
    initialValues={{ username: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
    }}
    >
    {() => (
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
        <button type="submit">Войти</button>
      </Form>
    )}
  </Formik>
)

export default LoginForm;