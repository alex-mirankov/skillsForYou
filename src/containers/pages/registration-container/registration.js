import React, { Component } from "react";
import "./style.scss";
import { Redirect } from "react-router-dom";
import { history } from "../../../services/redux";
import axios from 'axios';

import { fields } from './fields';
import {
  InputRegistrationForm,
  ButtonAll,
  CircularIndeterminate,
} from '../../../components/share';
import { authInputStyle, submitBtnStyles } from '../login-container/login';
export class Registration extends Component {
  fields = fields;
  state = {
    email: "",
    full_name: "",
    password: "",
    password_confirm: "",
    is_teacher: false,
    isLoaderShown: false,
  };

  handleChangeEmail = event => {
    this.setState({
      email: event.target.value
    });
  };

  handleChangeFullName = event => {
    this.setState({
      full_name: event.target.value
    });
  };

  handleChangePassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  handleChangePasswordConfirm = event => {
    this.setState({
      password_confirm: event.target.value
    });
  };

  handleRegistrationTeacherClick = () => {
    history.push("/teacher-registration");
    document.documentElement.scrollTop = 0;
  };

  handleSubmit = () => {
    const {
      email,
      full_name,
      password,
      password_confirm,
      avatar,
      is_teacher,
    } = this.state;

    const fields = {
      email,
      full_name: full_name,
      password: password,
      password_confirm: password_confirm,
      avatar: avatar,
      is_teacher: is_teacher,
    };
    if (this.state.password === this.state.password_confirm) {
      this.setState({
        isLoaderShown: true,
      });
      axios.post('http://skills4u-olymp.ru:81/registration/', fields)
      .then(_res => {
        history.push('/login');

      })
      .catch(error => {
        console.log(error);
        this.setState({
          isLoaderShown: true,
        });
      });
    } else { }
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
                              action={this.handleChangeEmail} />
      <InputRegistrationForm placeHolder={'Имя'}
                              styles={authInputStyle}
                              action={this.handleChangeFullName} />
      <InputRegistrationForm placeHolder={'Пароль'}
                              styles={authInputStyle}
                              type={'password'}
                              action={this.handleChangePassword} />
      <InputRegistrationForm placeHolder={'Повторите пароль'}
                              styles={authInputStyle}
                              type={'password'}
                              action={this.handleChangePasswordConfirm} />
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
          pathname: "/login",
          state: { redirected: true }
        }}
      />
    ) : (
        <this.RegistrationLayout />
      );
    return component;
  }
}
