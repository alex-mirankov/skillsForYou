import React from 'react';
import './style.scss';

export class UserInfo extends React.Component {
  render() {
    let { name, email, title, amount_courses, amount_lessons } = this.props;
    return (
      <>
        <div className="user">
          <div className="user__avatar">

          </div>
          <div className="user__personal-info">
            <div className="user__personal-info-name">{name}</div>
            <div className="user__personal-info-email">
              <div className="user__personal-info-email-icon"></div>
              <div className="user__personal-info-email-text">{email}</div>
            </div>
            <div className="user__personal-info-title">{title}</div>
            <div className="user__personal-info-courses">
              <div className="user__personal-info-courses-count">
                Всего созданных курсов: {amount_courses}
              </div>
              <div className="user__personal-info-courses-lessons">
                Всего созданных уроков: {amount_lessons}
              </div>
            </div>
            <div className="user__personal-info-control">
              <div className="user__personal-info-control-correct">
                <div className="user__personal-info-control-correct-icon"></div>
                <div className="user__personal-info-control-correct-text">Редактировать</div>
              </div>
              <div className="user__personal-info-control-logout">
                <div className="user__personal-info-control-logout-icon"></div>
                <div className="user__personal-info-control-logout-text">Выйти</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}