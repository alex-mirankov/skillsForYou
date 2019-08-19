import React from "react";
import './style.scss';
import lessonImg from "../../images/lesson-image.png";
import burgerImg from "../../images/burger-image.png";
import progressOk from "../../images/progress-okay.png";


export class RightSideBar extends React.PureComponent {
  SideBarLayout = () => (
    <div className="progress-navigation">
      <div className="progress-navigation-header">
        <img
          className="progress-navigation-header__img"
          src={burgerImg}
          alt="burger"
        />
        <p className="progress-navigation-header__text">Программа курса</p>
      </div>
      <div className="progress-navigation-lesson-name">
        <img
          className="progress-navigation-lesson-name__img"
          src={lessonImg}
          alt="lesson"
        />
        <p className="progress-navigation-lesson-name__text">Java Skill</p>
      </div>
      <div className="progress-navigation-list">
        <p className="progress-navigation-list__text">Уроки</p>

        <div className="progress-navigation-list__first">
          <img
            className="progress-navigation-list__img"
            src={progressOk}
            alt="progress okay"
          />
          <p className="progress-navigation-list__lesson-name">
            Introduction to Java
          </p>
        </div>

        <div className="progress-navigation-list__lesson">
          <img
            className="progress-navigation-list__lesson-img"
            src={progressOk}
            alt="progress okay"
          />
          <p className="progress-navigation-list__lesson-name">
            Переменные, операции и типы данных
          </p>
        </div>

        <div className="progress-navigation-list__lesson">
          <p className="progress-navigation-list__lesson-count">3</p>
          <p className="progress-navigation-list__lesson-name">
            Операторы ветвления
          </p>
        </div>
      </div>
    </div>
  );
  render() {
    return <this.SideBarLayout />;
  }
}
