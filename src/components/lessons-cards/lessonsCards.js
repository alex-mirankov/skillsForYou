import React from "react";
import { Link } from 'react-router-dom';
import './style.scss';

import cardsTacherImg from "../../images/cards-tacher-img.png";

export class LessonsCards extends React.Component {
  render() {
    const { image, title, sub_title, total_students, color, id } = this.props;
    return (
      <div className="cards">
        <Link to={{ pathname: '/work/' + id }}>
          <div className="card">
            <div className="card__header" style={{ background: color }}>
              <p className="card__header-title">{title}</p>
              <p className="card__header-level">
                <span className="card__header-level-text">Уровень:</span> {sub_title}
              </p>
            </div>
            <div className="card__image">
              <img
                className="card__image-content"
                src={image}
                alt="изображение курса"
              />
            </div>
            <div className="card__divide" />
            <div className="card__info">
              <div className="card__info-stats">
                <p className="card__info-stats-help-text">Количество студентов:</p>
                <p className="card__info-stats-text"> {total_students}</p>
              </div>
              <div className="card__info-stats">
                <p className="card__info-stats-help-text">Изучили курс:</p>
                <p className="card__info-stats-text"> 3</p>
              </div>
            </div>
            <div className="card__teacher">
              <p className="card__teacher-text">Учителя</p>
              <div className="card__teacher-list">
                <img
                  className="card-cost__image"
                  src={cardsTacherImg}
                  alt="учитель"
                />
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
