import React, { Component } from "react";
import "./style.css";
import socialFacebook from "../../images/social-facebook.png"
import socialViber from "../../images/social-viber.png"
import socialVk from "../../images/social-vk.png"
import socialMail from "../../images/social-mail.png"
import socialTelephone from "../../images/social-telephone.png"

export class Footer extends Component {
  FooterLayout = () => (
    <footer className="footer footer__size footer_back-styles">
      <div className="page   page__flex page_margin">
        <div className="social social__size social_margin">
          <p className="social__header">Мы в социальных сетях</p>
          <ul className="social-list social-list_margin social-list_font">
            <li className="social-list__item">
              <a
                href="https://www.facebook.com/"
                className="social-list__link"
              >
                <img
                  alt="fb"
                  className="social-list__image"
                  src={socialFacebook}
                />
              </a>
            </li>
            <li className="social-list__item">
              <a
                href="https://www.viber.com/ru/"
                className="social-list__link"
              >
                <img
                  alt="viber"
                  className="social-list__image"
                  src={socialViber}
                />
              </a>
            </li>
            <li className="social-list__item">
              <a
                href="https://vk.com/"
                className="social-list__link"
              >
                <img
                  alt="vk"
                  className="social-list__image"
                  src={socialVk}
                />
              </a>
            </li>
          </ul>
        </div>

        <div className="main-footer main-footer_margin">
          <p className="main-footer__header">Основное</p>
          <a
            href="https://www.google.com/"
            className="main-footer__link main-footer__link_hover"
          >
            Каталог
          </a>
          <a
            href="https://www.google.com/"
            className="main-footer__link main-footer__link_hover"
          >
            О проекте
          </a>
          <a
            href="https://www.google.com/"
            className="main-footer__link main-footer__link_hover"
          >
            Главная
          </a>
        </div>

        <div className="account-footer account-footer_margin">
          <p className="account-footer__header">Аккаунт</p>
          <a
            href="https://www.google.com/"
            className="account-footer__link account-footer__link_hover"
          >
            Создать аккаунт
          </a>
          <a
            href="https://www.google.com/"
            className="account-footer__link account-footer__link_hover"
          >
            Войти
          </a>
        </div>

        <div className="contact-footer contact-footer_margin">
          <p className="contact-footer__header">Контакты</p>
          <a
            href="mailto:Skills@mail.ru"
            className="contact-footer__link contact-footer__link_hover"
          >
            <img
              className="contact-footer__image"
              src={socialMail}
              alt="конверт"
            />
            Skills@mail.ru
          </a>
          <a
            href="tel:+2 23 3473 445"
            className="contact-footer__link contact-footer__link_hover"
          >
            <img
              className="contact-footer__image"
              src={socialTelephone}
              alt="телефон"
            />
            +2 23 3473 445
          </a>
        </div>
      </div>
    </footer>
  );
  render() {
    return <this.FooterLayout />;
  }
}
