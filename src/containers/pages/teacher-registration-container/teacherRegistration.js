import React, { Component } from "react";
import "./style.css";
import { history } from "../../../services/redux";

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
  };
  handleRegistrationClick = () => {
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
                              styles={authInputStyle} />
        <InputRegistrationForm placeHolder={'Имя'}
                              styles={authInputStyle} />
        <InputRegistrationForm placeHolder={'Пароль'}
                              styles={authInputStyle}
                              type={'password'} />
        <InputRegistrationForm placeHolder={'Повторите пароль'}
                              styles={authInputStyle}
                              type={'password'} />
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
