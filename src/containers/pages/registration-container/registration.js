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
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
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
    axios.post('https://sandbox-skill4u.herokuapp.com/', this.state)
      .then(e => {
        history.push('/login');
      })
      .catch(error => {
        console.log(error);
      });
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
        {/* <input
            onChange={(e) => this.fileSelectedHendler(e)}
            type="file"
            className="form__input"
            id="avatar"
            name="avatar"
            placeholder="Выберите аватар"
          /> */}
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
