import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import './style.scss';

import { history } from '../../../services/redux';
import {
  InputRegistrationForm,
  ButtonAll,
  CircularIndeterminate,
} from '../../../components/share';
import { MyModal } from '../../../components/index';
import { openWindow } from '../../../redux/actions/index';

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

export class LoginComponent extends Component {
  state = {
    email: '',
    password: '',
    isLoaderShown: false,
  };

  handleRegistrationClick = () => {
    history.push("/registration");
    document.documentElement.scrollTop = 0;
  };

  handleChangeControl = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = () => {
    this.setState({
      isLoaderShown: true,
    });
    let options = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post('http://165.22.92.120:81/login/', options)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        history.push('/');
      })
      .catch(_error => {
        this.props.closeWindowComp();
        this.setState({
          isLoaderShown: false,
        });
      })
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
                              action={this.handleChangeControl}
                              name={'email'} />
        <InputRegistrationForm placeHolder={'Пароль'}
                              styles={authInputStyle}
                              type={'password'}
                              action={this.handleChangeControl}
                              name={'password'} />
        <ButtonAll action={this.handleSubmit}
                    content={'Войти'}
                    styles={submitBtnStyles} />
        {
          this.state.isLoaderShown
            ? <CircularIndeterminate />
            : null
        }
      </div>
      <MyModal descriptionText={'Неправильный логин или пароль'}/>
    </section>
  );
  render() {
    return <this.LoginLayout />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  closeWindowComp: () => {
    dispatch(openWindow());
  }
});

export const Login = connect(null, mapDispatchToProps)(LoginComponent);
