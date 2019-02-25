import React, { Component } from "react";
import "./style.css";
import { history } from "../../services/redux";

export class TeacherRegistration extends Component {
  handleRegistrationClick = () => {
    history.push("/registration");
    document.documentElement.scrollTop = 0;
  };

  TeacherRegistrationLayout = () => (
    <main className="main">
      <section className="registration-container registration-container__teacher-registration-size registration-container__margin">
        <div className="registration-container__header">
          <p className="registration-container__blank-name">Бланк учителя</p>
          <button onClick={this.handleRegistrationClick}  className="registration-container__link registration-container__link_hover">
            Вы не учитель?
          </button>
        </div>
        <form className="form form_align-content" name="form-student-blank">
        <input
            type="email"
            className="form__input"
            id="form__input-id-email"
            name="email"
            placeholder="Электронная почта"
          />
          <input
            type="text"
            className="form__input"
            id="form__input-id-full-name"
            name="full-name"
            placeholder="ФИО"
          />
          <input
            type="date"
            className="form__input"
            id="form__input-id-birthday"
            name="birthday"
            placeholder="Дата рождения"
          />
          <input
            type="text"
            className="form__input"
            id="form__input-id-region"
            name="region"
            placeholder="Регион"
          />
          <input
            type="text"
            className="form__input"
            id="form__input-id-city"
            name="city"
            placeholder="Район/город"
          />
          <input
            type="telephone"
            className="form__input"
            id="form__input-id-phone"
            name="phone"
            placeholder="Телефон"
          />
          <input
            type="text"
            className="form__input"
            id="form__input-id-place-of-study"
            name="place-of-study"
            placeholder="Место учебы"
          />
          <input
            type="text"
            className="form__input"
            id="form__input-id-place-of-work"
            name="place-of-work"
            placeholder="Место работы"
          />
          <input
            type="text"
            className="form__input"
            id="form__input-id-education"
            name="education"
            placeholder="Образование"
          />
          <textarea
            type="text"
            className="form__input"
            id="form__input-id-motivation"
            name="motivation"
            placeholder="Мотивация"
          />
          <input
            type="password"
            className="form__input"
            id="form__input-id-password"
            name="password"
            placeholder="Придумайте пароль"
          />
          <input
            type="password"
            className="form__input"
            id="form__input-id-password-repeat"
            name="repeat-password"
            placeholder="Повторите пароль"
          />
          <input
            type="submit"
            className="form__submit form__submit_hover"
            id="form__submit-id-submit"
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
