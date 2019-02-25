import React, { Component } from "react";
import "./style.css";

export class Lesson extends Component {
  LessonLayout = () => (
    <React.Fragment>
      <div className="content content__size content_position">
        <div className="lesson-header">
          <p className="lesson-header__name">Операторы ветвленния</p>
          <p className="lesson-header__count">Занятие #3</p>
        </div>
        <div className="lesson-description lesson-description_position">
          <p className="lesson-description__content">
            По сложившийся ситуации традиции первая программа на изучаемом языке
            программирования должна выводить строку Hello, world. Текст такой
            программы на Java выглядит следующим образом:
          </p>
        </div>
        <div className="example example_position example__size example_beauty">
          <pre className="example__code">
            {/* <!--                    -->    class Helloworld {
<!--                    -->        public static main(String[] args) {
<!--                    -->            System.out.println("Hello, world");
<!--                    -->        }
<!--                    -->    } */}
          </pre>
        </div>
      </div>

      <div className="compile-container compile-container__size compile-container_beauty compile-container_position">
        <div className="compile compile__size compile_beauty" />
        <div className="control control__size control_position">
          <button className="control__button">Сбросить</button>
          <button className="control__button">Отправить</button>
        </div>
      </div>
    </React.Fragment>
  );
  render() {
    return <this.LessonLayout />;
  }
}
