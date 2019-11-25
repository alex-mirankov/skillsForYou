import React, { Component } from "react";
import "./style.scss";
import { Redirect } from "react-router-dom";
import { history } from "../../../services/redux";
import axios from 'axios';

import { fields } from './fields';
import { InputRegistrationForm, ButtonAll } from '../../../components/share';
import { authInputStyle, submitBtnStyles } from '../login-container/login';
export class Registration extends Component {
  fields = fields;
  state = {
    email: "",
    full_name: "",
    password: "",
    password_confirm: "",
    is_teacher: false,
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

  // fileSelectedHendler = (event) => {
  //   this.setState({
  //     avatar: event.target.files[0],
  //   });
  //   let formData = new FormData();

  //   var blob = event.target.files[0].slice(0, event.target.files[0].size, 'image/jpeg');
  //   let newFile = new File([blob], 'image.jpg', { type: 'image/jpeg' });

  //   formData.append("img_field", newFile);
  // }

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
      axios.post('http://165.22.92.120/registration/', this.state)
      .then(res => {
        console.log(res);
        history.push('/login');
      })
      .catch(error => {
        console.log(error);
      });
    } else {
      console.log('пароли не совпадают!')
    }
    console.log(this.state);
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
        {/* <input
            onChange={(e) => this.fileSelectedHendler(e)}
            type="file"
            className="form__input"
            id="avatar"
            name="avatar"
            placeholder="Выберите аватар"
          /> */}
          {
            this.state.password === this.state.password_confirm
            ? null
            : <p>Пароли не совпадают</p>
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