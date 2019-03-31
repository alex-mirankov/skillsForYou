import React, { Component } from "react";
import "./style.css";

import Compile from '../../components/compile/compile';

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
          </pre>
        </div>
      </div>
      <Compile />
    </React.Fragment>
  );
  render() {
    return <this.LessonLayout />;
  }
}
