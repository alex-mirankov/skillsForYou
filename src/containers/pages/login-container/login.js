import React, { Component } from "react";
import axios from 'axios';
import './style.scss';

import { history } from '../../../services/redux';
import {
  InputRegistrationForm,
  ButtonAll,
} from '../../../components/share';

export const authInputStyle = {
  background: '#fff',
  border: 'none',
  width: '85%',
  height: '45px',
  color: '#c5bcbc',
  textAlign: 'left',
  paddingLeft: '15px',
  marginBottom: '0',
  marginTop: '30px',
}

export const submitBtnStyles = {
  width: '230px',
  margin: '0 auto',
  marginTop: '40px',
}

export class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleRegistrationClick = () => {
    history.push("/registration");
    document.documentElement.scrollTop = 0;
  };

  handleChange = event => {
    /*----------------------------------------------------*/
    this.setState({
      [event.target.name]: event.target.value,
    });
    /*----------------------------------------------------*/
  };

  handleSubmit = () => {
    console.log(this.state);
    axios.post('https://sandbox-skill4u.herokuapp.com/login/', this.state)
      .then(e => {
        localStorage.setItem('token', e.data.token);
        history.push('/');
      })
      .catch(_error => { })
      localStorage.setItem('token', 'c3041a471021f8945250808721184958271766a6');
  };

  LoginLayout = () => (
    <section className="login">
      <div className="login-header">
        <p className="login-header__enter-text">Вход в систему</p>
        <button className="login-header__havnt-account"
                onClick={this.handleRegistrationClick}>
          Нет аккаунта?
        </button>
      </div>
      <div className="login-form">
        <InputRegistrationForm placeHolder={'Логин'}
                              styles={authInputStyle} />
        <InputRegistrationForm placeHolder={'Пароль'}
                              styles={authInputStyle}
                              type={'password'} />
        <a className="login-form__forgot-password"
          href="https://www.google.com">
          Забыли пароль?
        </a>
        <ButtonAll action={this.handleSubmit}
                    content={'Войти'}
                    styles={submitBtnStyles} />
      </div>
    </section>
  );
  render() {
    return <this.LoginLayout />;
  }
}
