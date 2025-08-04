import React from 'react';
import LoginForm from '../components/LoginForm.jsx';

const LoginPage = () => (
  <div /* общий div */>
    <div /* первый div */>
      <div> <img /> </div>
      <LoginForm />
    </div>
    <div /* второй div */>
      <div >
        <span>Нет аккаунта?</span>
        <a href="">Регистрация</a>
      </div>
    </div>
  </div>
)

export default LoginPage;