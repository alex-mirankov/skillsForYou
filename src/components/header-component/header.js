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

import header_settings from "../../images/header_settings.png";
import header_notification from "../../images/header_notofication.png";
import header_avatar from "../../images/header_avatar.png";

export const headerMenu = [
  {
    lable: 'О проекте',
    link: '/',
  },
  {
    lable: 'Ваши возможности',
    link: '/',
  },
  {
    lable: 'Олимпиады',
    link: '/olympic-enter',
  },
  {
    lable: 'Контакты',
    link: '/',
  },
];

export const headerUserMenu = [
  {
    link: '/',
    image: header_settings,
    alt: 'шестиренка',
    class: 'header-menu-list__setting',
  },
  {
    link: '/',
    image: header_notification,
    alt: 'колокольчик',
    class: 'header-menu-list__notification',
  },
  {
    link: '/',
    image: header_avatar,
    alt: 'аватар',
    class: 'header-menu-list__avatar',
  },
];

class HeaderComponent extends Component {
  controlPanel = 'inline';
  regPanel = 'flex';
  user = () => {
    let token = localStorage.getItem('token');
    if (token) {
      this.controlPanel = 'inline';
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

  HeaderLayout = () => {
    const { location } = this.props;
    const isMainPage = location.pathname === "/";

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
      <header className={isMainPage ? 'header' : 'header-not-main'}>
        <div className="header-control" style={{ display: this.regPanel }}>
          <React.Fragment>
            <button
              className="header-control__btn"
              onClick={this.handleLoginClick}
            >
              Войти
                </button>
            <button
              className="header-control__btn"
              onClick={this.handleRegistrationClick}
            >
              Регистрация
                </button>
          </React.Fragment>
        </div>

        <nav className="header-menu">
          <ul className="header-menu-list">
            {
              headerMenu.map(item => {
                return (
                  <li className="header-menu-list__item">
                    <a href={item.link}
                      className="header-menu-list__link">
                      {item.lable}
                    </a>
                  </li>
                );
              })
            }
            <li className="header-menu-list__item"
              style={{ display: this.controlPanel }}>
              {
                headerUserMenu.map(item => {
                  return (
                    <a href={item.link}
                      className="header-menu-list__link">
                      <img src={item.image}
                        alt={item.alt}
                        className={item.class} />
                    </a>
                  );
                })
              }
            </li>
            <span className="header-menu-list__popup-menu"
                  style={{ display: this.controlPanel }}>
              <LongMenu options={menuButtonsProperties} />
            </span>
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
