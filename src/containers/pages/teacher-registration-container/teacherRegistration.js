import React, { Component } from "react";
import "./style.css";
import { history } from "../../../services/redux";
import axios from 'axios';

import {
  InputRegistrationForm,
  ButtonAll,
} from '../../../components/share';
import {
  authInputStyle,
  submitBtnStyles
} from '../login-container/login';

export class TeacherRegistration extends Component {
  state = {
    email: "",
    full_name: "",
    password: "",
    password_confirm: "",
    is_teacher: true,
  };

  handleSubmit = () => {
    const {
      email,
      full_name,
      password,
      password_confirm,
      avatar,
    } = this.state;

    const fields = {
      email,
      full_name: full_name,
      password: password,
      password_confirm: password_confirm,
      avatar: avatar,
    };
    if (this.state.password === this.state.password_confirm) {
      axios.post('http://165.22.92.120:81/registration/', this.state)
      .then(e => {
        history.push('/login');
      })
      .catch(error => {
        console.log(error);
      });
    } else {
    }
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
    history.push("/registration");
    document.documentElement.scrollTop = 0;
  };

  TeacherRegistrationLayout = () => (
    <section className="registration">
      <div className="registration-header">
        <p className="registration-header__enter-text">Бланк учителя</p>
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
      </div>
    </section>
  );
  render() {
    return <this.TeacherRegistrationLayout />;
  }
}
