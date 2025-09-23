import { useState } from 'react'
import * as Yup from 'yup';
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import routes from '../routes'
import { signUp } from '../slices/authSlice'

const SignUpForm = () => {
  console.log('отрисовка SignUpForm')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isUsernameTaken, setUsernameTaken] = useState(false)

  const validationSchema = Yup.object().shape({
    username: Yup.string()
    .trim()
    .required('Обязательное поле')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов'),
    password: Yup.string()
    .trim()
    .required('Обязательное поле')
    .min(6, 'Не менее 6 символов'),
    confirmPassword: Yup.string()
    .trim()
    .required('Обязательное поле')
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
  });
  
  return (
    <Formik 
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={ async (values, { setSubmitting }) => {
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
      }}
    >
      {({ errors, touched }) => (
        <Form className='w-50'>
          <h1 className='text-center mb-4'>Регистрация</h1>

          <div className='form-floating mb-3'>
            <Field
              type='username'
              name='username'
              autoComplete='username'
              required
              placeholder='От 3 до 20 символов'
              id='username'
              className={`form-control ${(errors.username && touched.username) || isUsernameTaken ? 'is-invalid' : ''}`}
            />
            <label htmlFor='username'>Имя пользователя</label>
            <div placement='right' className='invalid-tooltip'>{isUsernameTaken ? 'Такой пользователь уже существует' : errors.username ? errors.username : ''}
            </div>
          </div>

          <div className='form-floating mb-3'>
            <Field
              type='password'
              name='password'
              autoComplete='new-password'
              required
              placeholder='Не менее 6 символов'
              id='password'
              className={`form-control ${errors.password && touched.password && 'is-invalid'}`}
              aria-describedby='passwordHelpBlock'
              aria-autocomplete='list'
            />
            <div className='invalid-tooltip'>{errors.password ? errors.password : ''}</div>
            <label htmlFor='password'>Пароль</label>
          </div>

          <div className='form-floating mb-4'>
            <Field
              type='password'
              name='confirmPassword'
              autoComplete='new-password'
              required
              placeholder='Пароли должны совпадать'
              id='confirmPassword'
              className={`form-control ${errors.confirmPassword && touched.confirmPassword && 'is-invalid'}`}
            />
            <div className='invalid-tooltip'>{errors.confirmPassword ? errors.confirmPassword : ''}</div>
            <label htmlFor='confirmPassword'>Подтвердите пароль</label>
          </div>

          <Button type='submit' variant='outline-primary' className='w-100'>
            Зарегистрироваться
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default SignUpForm