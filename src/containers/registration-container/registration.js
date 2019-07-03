import React, { Component } from "react";
import "./style.css";
import { Redirect } from "react-router-dom";
import { history } from "../../services/redux";
import axios from 'axios';

import { fields } from './fields';
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
    axios.post('https://skill4u.herokuapp.com/', this.state)
      .then(e => {
        history.push('/login');
      })
      .catch(error => {
        console.log(error);
      });
      console.log(this.state);
  };

  RegistrationLayout = () => (
    <main className="main">
      <section className="registration-container registration-container__size registration-container__margin">
        <div className="registration-container__header">
          <p className="registration-container__blank-name">Бланк студента</p>
          <button
            onClick={this.handleRegistrationTeacherClick}
            className="registration-container__link registration-container__link_hover"
          >
            Вы не студент?
          </button>
        </div>
        <div className="form form_align-content" name="form-student-blank">
          <input
            onChange={this.handleChange}
            value={this.state.email}
            type="email"
            className="form__input"
            id="email"
            name="email"
            placeholder="Электронная почта"
          />
          <input
            onChange={this.handleChange}
            value={this.state.full_name}
            type="text"
            className="form__input"
            id="full_name"
            name="full_name"
            placeholder="Введите имя"
          />
          <input
            onChange={this.handleChange}
            value={this.state.password}
            type="password"
            className="form__input"
            id="password"
            name="password"
            placeholder="Придумайте пароль"
          />
          <input
            onChange={this.handleChange}
            value={this.state.password_confirm}
            type="password"
            className="form__input"
            id="password_confirm"
            name="password_confirm"
            placeholder="Повторите пароль"
          />
          {/* <input
            onChange={(e) => this.fileSelectedHendler(e)}
            type="file"
            className="form__input"
            id="avatar"
            name="avatar"
            placeholder="Выберите аватар"
          /> */}
          <input
            type="button"
            onClick={this.handleSubmit}
            className="form__submit form__submit_hover"
            name="form__submit-id-submit"
            value="Зарегистрироваться"
          />
          <p style={{ color: "red" }}>
            {this.state.error ? this.state.error : null}
          </p>
        </div>
      </section>
    </main>
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
