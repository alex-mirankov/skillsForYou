import React, { Component } from "react";
import "./style.css";
import { history } from "../../../services/redux";
import axios from 'axios';

import {
  InputRegistrationForm,
  ButtonAll,
  TextareaRegistrationForm,
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
    is_teacher: true,
    password_confirm: "",
    region: '',
    city: '',
    place_of_work: '',
    motivation: '',
    education: '',
    isLoaderShown: false,
  };

  handleSubmit = () => {
    const {
      email,
      full_name,
      password,
      password_confirm,
      is_teacher,
      region,
      city,
      place_of_work,
      motivation,
      education,
    } = this.state;

    const fields = {
      email,
      full_name: full_name,
      password: password,
      password_confirm: password_confirm,
      is_teacher: is_teacher,
      region: region,
      city: city,
      place_of_work: place_of_work,
      motivation: motivation,
      education: education,
    };
    if (this.state.password === this.state.password_confirm) {
      this.setState({
        isLoaderShown: true,
      });
      axios.post('http://165.22.92.120:81/registration/', fields)
      .then(e => {
        history.push('/login');
      })
      .catch(error => {
        console.log(error);
      });
    } else {
    }
  };

  handleChangeControls = event => {
    this.setState({
      [event.target.name]: event.target.value
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
          Вы не учитель?
        </button>
      </div>
      <div className="registration__form">
      <InputRegistrationForm placeHolder={'Электронная почта'}
                              styles={authInputStyle}
                              action={this.handleChangeControls}
                              name={'email'} />
        <InputRegistrationForm placeHolder={'Имя'}
                              styles={authInputStyle}
                              action={this.handleChangeControls}
                              name={'full_name'} />
        <InputRegistrationForm placeHolder={'Пароль'}
                              styles={authInputStyle}
                              type={'password'}
                              action={this.handleChangeControls}
                              name={'password'} />
        <InputRegistrationForm placeHolder={'Повторите пароль'}
                              styles={authInputStyle}
                              type={'password'}
                              action={this.handleChangeControls}
                              name={'password_confirm'} />
        <InputRegistrationForm placeHolder={'Регион'}
                              styles={authInputStyle}
                              type={'text'}
                              action={this.handleChangeControls}
                              name={'region'} />
        <InputRegistrationForm placeHolder={'Город'}
                              styles={authInputStyle}
                              type={'text'}
                              action={this.handleChangeControls}
                              name={'city'} />
        <InputRegistrationForm placeHolder={'Место работы'}
                              styles={authInputStyle}
                              type={'text'}
                              action={this.handleChangeControls}
                              name={'place_of_work'} />
        <InputRegistrationForm placeHolder={'Образование'}
                              styles={authInputStyle}
                              type={'text'}
                              action={this.handleChangeControls}
                              name={'education'} />
        <TextareaRegistrationForm placeholder={'Мотивация'}
                                  action={this.handleChangeControls}
                                  name={'motivation'}/>
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
