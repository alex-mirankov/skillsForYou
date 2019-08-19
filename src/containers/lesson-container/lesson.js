import React, { Component } from "react";
import './style.scss';

import { Compile } from '../../components/index';

export class Lesson extends Component {
  render() {
    return (
      <>
        <div className="lesson">
          <div className="lesson-header">
            <p className="lesson-header__name">Операторы ветвленния</p>
            <p className="lesson-header__count">Занятие #3</p>
          </div>
          <div className="lesson-description">
            <p className="lesson-description__content">
              По сложившийся ситуации традиции первая программа на изучаемом языке
              программирования должна выводить строку Hello, world. Текст такой
              программы на Java выглядит следующим образом:
          </p>
          </div>
          <div className="lesson-example">
            <pre className="lesson-example__code">
            </pre>
          </div>
        </div>
        <Compile />
      </>
    );
  }
}
