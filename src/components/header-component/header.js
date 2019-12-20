import React, { Component } from "react";
import './style.scss';

import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { history } from "../../services/redux";
import { deleteUserToken } from '../../redux/actions/index';

class HeaderComponent extends Component {
  controlPanel = 'flex';
  regPanel = 'flex';
  user = () => {
    let token = localStorage.getItem('token');
    if (token) {
      this.controlPanel = 'flex';
    }
    else {
      this.controlPanel = 'none';
    }
    if (!token) {
      this.regPanel = 'flex';
    }
    else {
      this.regPanel = 'none';
    }
  }
  handleLoginClick = () => {
    history.push("/login");
    document.documentElement.scrollTop = 0;
  };

  handleRegistrationClick = () => {
    history.push("/registration");
    document.documentElement.scrollTop = 0;
  };

  handleClickAboutUs = () => {
    history.push("/");
    document.documentElement.scrollTop = 0;
  };

  handleClickOlympic = () => {
    history.push('/olympic-enter');
    document.documentElement.scrollTop = 0;
  }

  logout = () => {
    localStorage.removeItem('token');
    this.props.DeleteUserToken();
  };

  goToMyCabinet = () => {
    history.push('/myself-cabinet');
  };

  goToTeacherCabinet = () => {
    history.push('/teacher-cabinet');
  };

  openProfile = () => {
    history.push("/profile");
  };

  goToCreateOlympiad = () => {
    history.push('/create-olympiad');
  }

  handleClickGoTests = () => {
    history.push('/tests/0');
  }

  HeaderLayout = () => {
    const isMainPage = false;

    return (
      <header className={isMainPage ? 'header-main-page' : 'header-main-page-not-main'}>
        <div className="header-main-page-control" style={{ display: this.regPanel }}>
          <React.Fragment>
            <button
              className="header-main-page-control__btn"
              onClick={this.handleLoginClick}
            >
              Войти
                </button>
            <button
              className="header-main-page-control__btn"
              onClick={this.handleRegistrationClick}
            >
              Регистрация
                </button>
          </React.Fragment>
        </div>

        <div className="header-main-page-control" style={{ display: this.controlPanel }}>
          <React.Fragment>
            <button className="header-main-page-control__btn"
                    onClick={this.logout}>
                Выйти
            </button>
            <button className="header-main-page-control__btn"
                    onClick={this.goToMyCabinet}>
                Личный кабинет
            </button>
            <button className="header-main-page-control__btn"
                    onClick={this.handleClickAboutUs}>
                На главную
            </button>
            <button className="header-main-page-control__btn"
                    onClick={this.handleClickGoTests}>
                Тесты
            </button>
          </React.Fragment>
        </div>
      </header>
    );
  };

  render() {
    this.user();
    return <this.HeaderLayout />;
  }
}

const mapDispatchToProps = (dispacth) => ({
  DeleteUserToken: () => {
    dispacth(deleteUserToken());
  },
})

export const Header = withRouter(connect(null, mapDispatchToProps)(HeaderComponent));
