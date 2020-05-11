import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import './style.scss';

import { history } from '../../../services/redux';
import { fields } from './fields';
import { InputRegistrationForm, ButtonAll, CircularIndeterminate } from '../../../components/share';
import { authInputStyle, submitBtnStyles } from '../login-container/login';
import { baseUrl } from '../../../config/api-config';

export class Registration extends Component {
  fields = fields;
  state = {
    email: '',
    full_name: '',
    password: '',
    password_confirm: '',
    is_teacher: false,
    isLoaderShown: false,
  }

  handleChangeControl = (data) => {
    this.setState({
      [data.target.name]: data.target.value,
    });
  }

  handleRegistrationTeacherClick = () => {
    history.push('/teacher-registration');
    document.documentElement.scrollTop = 0;
  }

  handleSubmit = () => {
    const fields = {
      email: this.state.email,
      full_name: this.state.full_name,
      password: this.state.password,
      password_confirm: this.state.password_confirm,
      avatar: this.state.avatar,
      is_teacher: this.state.is_teacher,
    };

    if (this.state.password === this.state.password_confirm) {
      this.setState({
        isLoaderShown: true,
      });
      axios.post(`${baseUrl}/registration/`, fields)
      .then(_res => {
        history.push('/login');
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isLoaderShown: true,
        });
      });
    }
  };

  RegistrationLayout = () => (
    <section className="registration">
      <div className="registration-header">
        <p className="registration-header__enter-text">Бланк студента</p>
        <button onClick={this.handleRegistrationTeacherClick}
          className="registration-header__status">
            Вы не студент?
        </button>
      </div>
      <div className="registration__form">
      <InputRegistrationForm placeHolder={'Электронная почта'}
                              styles={authInputStyle}
                              action={this.handleChangeControl}
                              name={'email'}/>
      <InputRegistrationForm placeHolder={'Имя'}
                              styles={authInputStyle}
                              action={this.handleChangeControl}
                              name={'full_name'}/>
      <InputRegistrationForm placeHolder={'Пароль'}
                              styles={authInputStyle}
                              type={'password'}
                              action={this.handleChangeControl}
                              name={'password'}/>
      <InputRegistrationForm placeHolder={'Повторите пароль'}
                              styles={authInputStyle}
                              type={'password'}
                              action={this.handleChangeControl}
                              name={'password_confirm'}/>
      <ButtonAll action={this.handleSubmit}
                  content={'Зарегистрироваться'}
                  styles={submitBtnStyles} />
          {
            this.state.password === this.state.password_confirm
              ? null
              : <p>Пароли не совпадают</p>
          }
          {
            this.state.isLoaderShown
              ? <CircularIndeterminate />
              : null
          }
      </div>
    </section>
  );
  render() {
    const component = this.state.success ? (
      <Redirect
        to={{
          pathname: '/login',
          state: { redirected: true }
        }}
      />
    ) : (
        <this.RegistrationLayout />
      );
    return component;
  }
}
