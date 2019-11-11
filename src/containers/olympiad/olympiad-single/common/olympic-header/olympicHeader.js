import React from 'react';
import './style.scss';

import imageHeader from '../../../../../images/javascript2-img-start.png';

import { Timer } from '../../../../../components';

export class OlympicHeader extends React.Component {
  render() {
    let { allTasks, comleteTasks } = this.props;
    return (
      <div className="single-olympic-header">
        <img className="single-olympic-header__image"
              src={imageHeader}
              alt='изображение в олимпиаде' />
        <div className="single-olympic-header__info">
          <p className="single-olympic-header__info-olympic-name">Индивидуальная олимпиада</p>
          <p className="single-olympic-header__info-all-tasks">Всего заданий:
            <span className="single-olympic-header__info-all-tasks-number">{allTasks.length}</span>
          </p>
          <p className="single-olympic-header__info-completed-tasks">Выполнено:
            <span className="single-olympic-header__info-completed-tasks-number">{comleteTasks}</span>
          </p>
        </div>
        <Timer />
      </div>
    );
  }
}
