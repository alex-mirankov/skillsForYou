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

  handleChangeLogin = event => {
    this.setState({
      email: event.target.value,
    });
  };

  handleChangePassword = event => {
    this.setState({
      password: event.target.value,
    });
  };

  handleSubmit = () => {
    axios.post('http://165.22.92.120:81/login/', this.state)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        history.push('/');
      })
      .catch(_error => { })
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
                              styles={authInputStyle}
                              action={this.handleChangeLogin} />
        <InputRegistrationForm placeHolder={'Пароль'}
                              styles={authInputStyle}
                              type={'password'}
                              action={this.handleChangePassword} />
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
