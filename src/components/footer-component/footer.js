import React, { Component } from "react";
import './style.scss';

import socialFacebook from "../../images/social-facebook.png";
import socialViber from "../../images/social-viber.png";
import socialVk from "../../images/social-vk.png";
import socialMail from "../../images/social-mail.png";
import socialTelephone from "../../images/social-telephone.png";

export const footerSocialLinks = [
  {
    link: 'https://www.facebook.com/',
    image: socialFacebook,
    alt: 'fb',
  },
  {
    link: 'https://www.viber.com/ru/',
    image: socialViber,
    alt: 'viber',
  },
  {
    link: 'https://vk.com/',
    image: socialVk,
    alt: 'vk',
  },
];

export const footerUsefulLinks = [
  {
    title: 'Основное',
    content: [
      {
        link: 'https://www.google.com/',
        label: 'Каталог',
      },
      {
        link: 'https://www.google.com/',
        label: 'О проекте',
      },
      {
        link: 'https://www.google.com/',
        label: 'Главная',
      },
    ],
  },
  {
    title: 'Аккаунт',
    content: [
      {
        link: 'https://www.google.com/',
        label: 'Создать аккаунт',
      },
      {
        link: 'https://www.google.com/',
        label: 'Войти',
      },
    ],
  },
];

export const footerContactUs = [
  {
    link: 'mailto:Skills@mail.ru',
    image: socialMail,
    alt: 'конверт',
    label: 'Skills@mail.ru',
  },
  {
    link: 'tel:+2 23 3473 445',
    image: socialTelephone,
    alt: 'телефон',
    label: '+2 23 3473 445',
  },
];

export class Footer extends Component {
  FooterLayout = () => (
    <footer className="footer">
      <div className="page page__flex page_margin">
        <div className="footer__social">
          <p className="footer__social-header">Мы в социальных сетях</p>
          <ul className="footer__social-list">
            {
              footerSocialLinks.map(item => {
                return (
                  <li className="footer__social-list__item">
                    <a
                      href={item.link}
                      className="footer__social-list-link"
                    >
                      <img
                        alt={item.alt}
                        className="footer__social-list-image"
                        src={item.image}
                      />
                    </a>
                  </li>
                );
              })
            }
          </ul>
        </div>

        {
          footerUsefulLinks.map(item => {
            return (
              <div className="footer__useful-links">
                <p className="footer__useful-links-header">{item.title}</p>
                {
                  item.content.map(contentItem => {
                    return (
                      <a
                        href={contentItem.link}
                        className="footer__useful-links-item"
                      >
                        {contentItem.label}
                      </a>
                    );
                  })
                }
              </div>
            );
          })
        }

        <div className="footer__useful-links">
          <p className="footer__useful-links-header">Контакты</p>
          {
            footerContactUs.map(item => {
              return (
                <a
                  href={item.link}
                  className="footer__useful-links-item"
                >
                  <img
                    className="footer__useful-links-image"
                    src={item.image}
                    alt={item.alt}
                  />
                  {item.label}
                </a>
              );
            })
          }
        </div>
      </div>
    </footer>
  );
  render() {
    return <this.FooterLayout />;
  }
}
