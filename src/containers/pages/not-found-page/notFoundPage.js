import React from 'react';
import './style.scss';

import { history } from "../../../services/redux";
import { ButtonAll } from '../../../components/index';

export class NotFoundPage extends React.Component {
  handleClickToMainPage = () => {
    history.push('/');
  }
  render() {
    return (
      <div className="not-found">
        <div className="not-found__center">
          <div className="not-found__lt">
            <div className="not-found__lt-image "></div>
          </div>
          <div className="not-found__rt">
            <div className="not-found__rt-image"></div>
          </div>
          <div className="not-found__404">
            404
        </div>
          <div className="not-found__text">
            <div>Упс!</div>
            <div>Страничка не найдена :(</div>
        </div>
          <ButtonAll content={'На главную'} action={this.handleClickToMainPage} />
          <div className="not-found__man">
            <div className="not-found__man-image"></div>
          </div>
          <div className="not-found__lb">
            <div className="not-found__lb-image"></div>
          </div>
        </div>
      </div>
    );
  }
}