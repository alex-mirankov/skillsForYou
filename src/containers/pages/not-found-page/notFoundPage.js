import React from 'react';
import './style.css';

import { history } from "../../../services/redux";
import { ButtonAll } from '../../../components/index';

export class NotFoundPage extends React.Component {
  handleClickToMainPage = () => {
    history.push('/');
  }
  render() {
    return (
      <div className="content content__beauty content__restriction-width">
        <div className="container-404-error container-404-error__size">
          <div className="container-image container-image__position-lt">
            <div className="container-image__image-left-top"></div>
          </div>
          <div className="container-image container-image__position-rt">
            <div className="container-image__image-right-top"></div>
          </div>
          <div className="error-404 error-404_padding">
            <p className="error-404__content">
              404
              </p>
          </div>
          <div className="error-404 error-404__position-info">
            <p className="error-404__content error-404__content_info">
              Упс!
              </p>
            <p className="error-404__content error-404__content_info">
              Страничка не найдена :(
              </p>
          </div>
          <div className="control">
            <ButtonAll content={'На главную'} action={this.handleClickToMainPage} />
          </div>
          <div className="container-image container-image__position-man">
            <div className="container-image__image-man"></div>
          </div>
          <div className="container-image container-image__position-lb">
            <div className="container-image__image-left-bottom"></div>
          </div>
        </div>
      </div>
    );
  }
}