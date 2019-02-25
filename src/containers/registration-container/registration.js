import React, { Component } from "react";
import "./style.css";
import { Redirect } from "react-router-dom";
import { history } from "../../services/redux";
import { registrationRequest } from "../../utils/registrationRequest";
export class Registration extends Component {
  state = {
    email: "",
    fullName: "",
    birthday: false,
    region: "",
    city: "",
    phone: false,
    education: "",
    motivation: "",
    studyPlace: "",
    workPlace: "",
    error: false,
    success: false
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

  handleSubmit = async () => {
    const {
      email,
      fullName,
      birthday,
      // region,
      // city,
      phone,
      education,
      motivation,
      studyPlace,
      workPlace
    } = this.state;

    const fields = {
      email,
      full_name: fullName,
      birthday,
      region: 455,
      city: 2256,
      place_of_study: studyPlace,
      place_of_work: workPlace,
      education,
      phone: phone,
      motivation
    };
    let response;
    await registrationRequest(fields).then(data => (response = data));
    if (response.error) {
      const error = response.data[Object.keys(response.data)[0]];
      this.setState({ error: error[0] });
    } else {
      this.setState({ success: true });
    }
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
            value={this.state.fullName}
            type="text"
            className="form__input"
            id="fullName"
            name="fullName"
            placeholder="ФИО"
          />
          <input
            onChange={this.handleChange}
            type="date"
            className="form__input"
            id="birthday"
            name="birthday"
            placeholder="Дата рождения"
          />
          {/* <input
            onChange={this.handleChange}
            type="text"
            className="form__input"
            id="region"
            name="region"
            placeholder="Регион"
          />
          <input
            onChange={this.handleChange}
            type="text"
            className="form__input"
            id="city"
            name="city"
            placeholder="Район/город"
          /> */}
          <input
            onChange={this.handleChange}
            type="telephone"
            className="form__input"
            id="phone"
            name="phone"
            placeholder="Телефон"
          />
          <input
            onChange={this.handleChange}
            type="text"
            className="form__input"
            id="studyPlace"
            name="studyPlace"
            placeholder="Место учебы"
          />
          <input
            onChange={this.handleChange}
            type="text"
            className="form__input"
            id="workPlace"
            name="workPlace"
            placeholder="Место работы"
          />
          <input
            onChange={this.handleChange}
            type="text"
            className="form__input"
            id="education"
            name="education"
            placeholder="Образование"
          />
          <input
            onChange={this.handleChange}
            type="text"
            className="form__input"
            id="motivation"
            name="motivation"
            placeholder="Мотивация"
          />

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
