import React from "react";
import "./style.css";
import lessonImg from "../../images/lesson-image.png";
import burgerImg from "../../images/burger-image.png";
import progressOk from "../../images/progress-okay.png";


export class RightSideBar extends React.PureComponent {
  SideBarLayout = () => (
    <div className="progress-navigation progress-navigation_beauty progress-navigation__size progress-navigation_position">
      <div className="progress-navigation-header progress-navigation-header_beauty progress-navigation-header_content">
        <img
          className="progress-navigation-header__img"
          src={burgerImg}
          alt="burger"
        />
        <p className="progress-navigation-header__p">Программа курса</p>
      </div>
      <div className="progress-navigation-lesson progress-navigation-lesson_content">
        <img
          className="progress-navigation-lesson__img"
          src={lessonImg}
          alt="lesson"
        />
        <p className="progress-navigation-lesson__p">Java Skill</p>
      </div>
      <div className="progress-navigation-main">
        <p className="progress-navigation-main__p">Уроки</p>

        <div className="progress-navigation-list progress-navigation-list_first progress-navigation-list__size">
          <img
            className="progress-navigation-list__img"
            src={progressOk}
            alt="progress okay"
          />
          <p className="progress-navigation-list__later-lesson-name">
            Introduction to Java
          </p>
        </div>

        <div className="progress-navigation-list progress-navigation-list_content progress-navigation-list__size">
          <img
            className="progress-navigation-list__img"
            src={progressOk}
            alt="progress okay"
          />
          <p className="progress-navigation-list__later-lesson-name">
            Переменные, операции и типы данных
          </p>
        </div>

        <div className="progress-navigation-list progress-navigation-list_content progress-navigation-list__size">
          <p className="progress-navigation-list__count">3</p>
          <p className="progress-navigation-list__lesson-name">
            Операторы ветвления
          </p>
        </div>
        <div className="progress-navigation-list progress-navigation-list_content progress-navigation-list__size">
          <p className="progress-navigation-list__count">4</p>
          <p className="progress-navigation-list__lesson-name">
            Операторы цикла
          </p>
        </div>
        <div className="progress-navigation-list progress-navigation-list_content progress-navigation-list__size">
          <p className="progress-navigation-list__count">5</p>
          <p className="progress-navigation-list__lesson-name">
            Работа со строками
          </p>
        </div>
        <div className="progress-navigation-list progress-navigation-list_content progress-navigation-list__size">
          <p className="progress-navigation-list__count">6</p>
          <p className="progress-navigation-list__lesson-name">
            Одномерные массивы и алгоритмы работы с ними
          </p>
        </div>
        <div className="progress-navigation-list progress-navigation-list_content progress-navigation-list__size">
          <p className="progress-navigation-list__count">7</p>
          <p className="progress-navigation-list__lesson-name">
            Многомерные массивы
          </p>
        </div>
        <div className="progress-navigation-list progress-navigation-list_content progress-navigation-list__size">
          <p className="progress-navigation-list__count">8</p>
          <p className="progress-navigation-list__lesson-name">
            Управление потоком ввода\вывода
          </p>
        </div>
        <div className="progress-navigation-list progress-navigation-list_content progress-navigation-list__size">
          <p className="progress-navigation-list__count">9</p>
          <p className="progress-navigation-list__lesson-name">
            Обработка исключений
          </p>
        </div>
        <div className="progress-navigation-list progress-navigation-list_content progress-navigation-list__size">
          <p className="progress-navigation-list__count">10</p>
          <p className="progress-navigation-list__lesson-name">
            Введение в методы
          </p>
        </div>
      </div>
    </div>
  );
  render() {
    return <this.SideBarLayout />;
  }
}
