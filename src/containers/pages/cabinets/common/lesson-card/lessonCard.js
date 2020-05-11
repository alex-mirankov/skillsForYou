import React from 'react';

import './style.scss';

import { InputCabinet, TextareaCabinet, SelectCabinet } from '../index';
import { ButtonAll } from '../../../../../components/index';

const percentArray = [
  {
    value: '25',
    text: '25',
  },
  {
    value: '50',
    text: '50',
  },
  {
    value: '75',
    text: '75',
  },
  {
    value: '100',
    text: '100',
  },
]

export class LessonCardComponent extends React.Component {
  state = {
    percent: '',
  }

  handleChangeChangePercent = (name) => {
    this.setState({
      percent: name,
    });
  }

  render() {
    return (
      <div className="lesson-card">
        <div className="lesson-card__caption">Урок 1</div>
        <div className="lesson-card__divide"></div>
        <div className="lesson-card__input">
          <InputCabinet caption={'Заголовок'} />
        </div>
        <div className="lesson-card__input">
          <InputCabinet caption={'Подзаголовок'} />
        </div>
        <div className="lesson-card__input">
          <TextareaCabinet caption={'Описание курса'} />
        </div>
        <div className="lesson-card__input">
          <SelectCabinet caption={'Описание курса'}
                          inputValues={percentArray}
                          handleChange={this.handleChangeChangePercent}
                          currentValue={this.state.percent} />
        </div>
        <div className="lesson-card__button">
          <ButtonAll content={'Сохранить урок'}/>
        </div>
      </div>
    );
  }
}
