import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import './style.scss';

import { history } from '../../services/redux';
import { deleteUserToken } from '../../redux/actions/index';
import { baseUrl } from '../../config/api-config';

class HeaderComponent extends Component {
  controlPanel = 'flex';
  regPanel = 'flex';
  state = {
    isTeacher: false,
  }

  componentDidMount() {
    this.checkUserIsTeacher();
  }

  checkUserIsTeacher = () => {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };
    axios.get(`${baseUrl}/me`, params)
      .then(data => {
        this.setState({
          isTeacher: data.data.is_teacher
        });
      })
      .catch(err => console.log(err));
  }

  user = () => {
    let token = localStorage.getItem('token');
    this.controlPanel = token ? 'flex' : 'none';
    this.regPanel = !token ? 'flex' : 'none';
  }

  navigateTo(route) {
    history.push(route);
    document.documentElement.scrollTop = 0;
  }

  logout = () => {
    this.setState({
      isTeacher: null
    });
    localStorage.removeItem('token');
    this.props.DeleteUserToken();
  };

  HeaderLayout = () => {
    const isMainPage = false;
    if (!this.state.isTeacher) {
      this.checkUserIsTeacher();
    }
    return (
      <header className={isMainPage ? 'header-main-page' : 'header-main-page-not-main'}>
        <div className="header-main-page-control" style={{ display: this.regPanel }}>
          <React.Fragment>
            <button
              className="header-main-page-control__btn"
              onClick={() => this.navigateTo('/login')}
            >
              Войти
                </button>
            <button
              className="header-main-page-control__btn"
              onClick={() => this.navigateTo('/registration')}
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
              onClick={() => this.navigateTo('/myself-cabinet')}>
              Личный кабинет
            </button>
            <button className="header-main-page-control__btn"
              onClick={() => this.navigateTo('/')}>
              На главную
            </button>
            <button className="header-main-page-control__btn"
              onClick={() => this.navigateTo('/tests/0')}>
              Тесты
            </button>
            {
              this.state.isTeacher
                ? <button className="header-main-page-control__btn"
                  onClick={() => this.navigateTo('/create-olympiad')}>
                  Создать олимпиаду
                </button>
                : null
            }
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
