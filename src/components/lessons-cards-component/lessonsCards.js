import React, { Component } from "react";
import javaImgStart from "../../images/java-img-start.png";
import cardsTacherImg from "../../images/cards-tacher-img.png";
import "./style.css";
import { history } from "../../services/redux";
export class LessonsCards extends Component {
  handleClick = () => {
    history.push("/work");
    document.documentElement.scrollTop = 0;
  };

  LessonsCardsLayout = () => (
    <div className="page page_margin page__flex">
      <div className="cards cards_margin" onClick={this.handleClick}>
        <div className="card card_hover card__style card__size">
          <div className="card-header card-header__size card-header_back-style">
            <p className="card-header__main">Основы Java</p>
            <p className="card-header__content">
              <span className="card-header__span">Уровень:</span> начинающий
            </p>
          </div>
          <div className="card-image card-image__flex card-image__size">
            <img
              className="card-image__img-Java"
              src={javaImgStart}
              alt="мужик с ноутом"
            />
          </div>
          <div className="card__hr" />
          <div className="card-info card-info_margin">
            <div className="card-info__flex">
              <p className="card-info__elem1">Количество студентов:</p>
              <p className="card-info__elem1 card-info__elem1_margin"> 5</p>
            </div>
            <div className="card-info__flex">
              <p className="card-info__elem2">Изучили курс:</p>
              <p className="card-info__elem2 card-info__elem1_margin"> 3</p>
            </div>
          </div>
          <div className="card-cost card-cost_margin card-cost__flex">
            <div className="card-cost__teacher">
              <p className="card-cost__text-teacher">Учителя</p>
              <img
                className="card-cost__image"
                src={cardsTacherImg}
                alt="учитель"
              />
            </div>
            <div className="card-cost__cost">
              <p className="card-cost__text-cost">Цена</p>
              <p className="card-cost__number">23 $</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  render() {
    return (
      <span className="card-container">
        <this.LessonsCardsLayout />
        <this.LessonsCardsLayout />
        <this.LessonsCardsLayout />
      </span>
    );
  }
}
