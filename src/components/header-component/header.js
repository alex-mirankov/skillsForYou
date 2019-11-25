import React, { Component } from "react";
import './style.scss';

import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { history } from "../../services/redux";
import { deleteUserToken } from '../../redux/actions/index';
import {
  LongMenu,
  Slider,
} from '../index';

import header_settings from "../../images/header_settings.svg";
import header_notification from "../../images/header_notification.svg";
import header_avatar from "../../images/header_avatar.svg";

export const headerMenu = [
  // {
  //   lable: 'О проекте',
  //   link: '/',
  // },
  // {
  //   lable: 'Ваши возможности',
  //   link: '/',
  // },
  // {
  //   lable: 'Олимпиады',
  //   link: '/olympic-enter',
  // },
  // {
  //   lable: 'Контакты',
  //   link: '/',
  // },
  // {
  //   lable: 'Тесты',
  //   link: '/tests/0',
  // },
];

export const headerUserMenu = [
  // {
  //   link: '/',
  //   image: header_settings,
  //   alt: 'шестиренка',
  //   class: 'header-menu-list__setting',
  // },
  // {
  //   link: '/',
  //   image: header_notification,
  //   alt: 'колокольчик',
  //   class: 'header-menu-list__notification',
  // },
  // {
  //   link: '/',
  //   image: header_avatar,
  //   alt: 'аватар',
  //   class: 'header-menu-list__avatar',
  // },
];

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

  HeaderLayout = () => {
    const { location } = this.props;
    // const isMainPage = location.pathname === "/";
    const isMainPage = false;

    const menuButtonsProperties = [
      {
        text: "Выйти",
        onClick: this.logout,
      },
      {
        text: 'Личный кабинет',
        onClick: this.goToMyCabinet,
      },
      {
        text: 'Учительский кабинет',
        onClick: this.goToTeacherCabinet,
      },
    ];

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
                    onClick={this.goToCreateOlympiad}>
                Создать олимпиаду
            </button>
            <button className="header-main-page-control__btn"
                    onClick={this.goToMyCabinet}>
                Личный кабинет
            </button>
            <button className="header-main-page-control__btn"
                    onClick={this.handleClickAboutUs}>
                На главную
            </button>
          </React.Fragment>
        </div>

        <nav className="header-main-page-menu">
          <ul className="header-main-page-menu-list">
            {
              headerMenu.map(item => {
                return (
                  <li className="header-main-page-menu-list__item">
                    <a href={item.link}
                      className="header-main-page-menu-list__link">
                      {item.lable}
                    </a>
                  </li>
                );
              })
            }
            <li className="header-main-page-menu-list__item"
              style={{ display: this.controlPanel }}>
              {
                headerUserMenu.map(item => {
                  return (
                    <a href={item.link}
                      className="header-main-page-menu-list__link">
                      <img src={item.image}
                        alt={item.alt}
                        className={item.class} />
                    </a>
                  );
                })
              }
            </li>
            {/* <span className="header-main-page-menu-list__popup-menu"
                  style={{ display: this.controlPanel }}>
              <LongMenu options={menuButtonsProperties} />
            </span> */}
          </ul>
        </nav>
        <div> {isMainPage ? <Slider /> : null}</div>
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
