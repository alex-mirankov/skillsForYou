import React, { Component } from "react";
import "./style.css";
import { history } from "../../services/redux";

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
    <main className="main">
      <section className="registration-container registration-container__teacher-registration-size registration-container__margin">
        <div className="registration-container__header">
          <p className="registration-container__blank-name">Бланк учителя</p>
          <button onClick={this.handleRegistrationClick} className="registration-container__link registration-container__link_hover">
            Вы не учитель?
          </button>
        </div>
        <form className="form form_align-content" name="form-student-blank">
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
          <input
            type="button"
            onClick={this.handleSubmit}
            className="form__submit form__submit_hover"
            name="form__submit-id-submit"
            value="Зарегистрироваться"
          />
        </form>
      </section>
    </main>
  );
  render() {
    return <this.TeacherRegistrationLayout />;
  }
}
