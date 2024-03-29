import React, { Component } from "react";
import "./style.css";
import { history } from "../../services/redux";
import { loginRequest } from "../../utils/loginRequest";

export class Login extends Component {
  state = {
    redirected: false,
    email: "",
    password: "",
    error: false
  };

  handleRegistrationClick = () => {
    history.push("/registration");
    document.documentElement.scrollTop = 0;
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      error: false
    });
  };

  handleSubmit = () => {
    loginRequest(this.state.email, this.state.password).then(res =>
      res ? history.push("/") : this.setState({ error: true })
    );
  };

  LoginLayout = () => (
    <main className="main">
      <div className="main">
        {this.props.location.state ? (
          <center className="card-info__elem1" style={{ marginTop: "20px" }}>
            На вашу почту был выслан пароль, воспользуйтесь им для входа в
            систему.
          </center>
        ) : null}
        <section className="registration-container registration-container__login-size registration-container__margin">
          <div className="registration-container__header">
            <p className="registration-container__blank-name">Вход в систему</p>
            <button
              className="registration-container__link registration-container__link_hover"
              onClick={this.handleRegistrationClick}
            >
              Нет аккаунта?
            </button>
          </div>
          <form className="form form_align-content" name="form-student-blank">
            <input
              onChange={this.handleChange}
              value={this.state.email}
              type="text"
              className="form__input"
              id="form__input-id-nickname"
              name="email"
              placeholder="Логин"
            />
            <input
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
              className="form__input"
              id="form__input-id-password"
              name="password"
              placeholder="Пароль"
            />
            <a
              className="form__link form__link_hover"
              href="https://www.google.com"
            >
              Забыли пароль?
            </a>
            <input
              onClick={this.handleSubmit}
              type="button"
              className="form__submit form__submit_hover"
              id="form__submit-id-submit"
              name="form__submit-id-submit"
              value="Войти"
            />
          </form>
          <center
            className="card-info__elem1"
            style={{ color: "red", marginTop: "20px" }}
          >
            {this.state.error ? "Неправильный пароль или почта" : null}
          </center>
        </section>
      </div>
    </main>
  );
  render() {
    return <this.LoginLayout />;
  }
}
