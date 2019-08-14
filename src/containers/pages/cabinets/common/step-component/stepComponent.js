import React from 'react';
import './style.scss';

import {
  SelectCabinet,
} from '../index';

import {
  ButtonAll,
} from '../../../../../components/index';

const selectStep = [
  {
    value: 'task',
    text: 'Задание',
  },
]

const styles = {
  width: '40%',
  border: '3px solid #fb901d',
  backgroundColor: '#ffffff',
  boxShadow: '3px 4px 5px rgba(0, 0, 0, 0.4)',
  borderRadius: '10px',
  height: '55px',
  color: '#fb901d',
  fontFamily: 'gilroy_extra_bold',
  fontSize: '1.28rem',
  fontWeight: '400',
}

export class StepComponent extends React.Component {
  state = {
    task: 'Задание'
  }
  handleChangeTask = (name) => {
    this.setState({
      task: name,
    });
  };
  render() {
    return (
      <div className="step">
        <div className="step__caption">Шаги</div>
        <div className="step__divide"></div>
        <div className="step__control">
          <div className="step__control-select">
            <SelectCabinet inputValues={selectStep}
                          currentValue={this.state.task}
                          handleChange={this.handleChangeTask} />
          </div>
          <div className="step__control-button">
            <ButtonAll content={'Добавить шаг'} />
          </div>
        </div>
        <div className="step__add">
          <div className="step__add-caption">Шаг 1</div>
          <div className="step__add-data">
            <div className="step__add-data-create">Создан: <span className="step__add-data-create-date">22.03.2019</span></div>
            <div className="step__add-data-create-buttons">
              <button className="step__add-btn-add">+</button>
              <button className="step__add-btn-delete"></button>
            </div>
          </div>
        </div>
        <div className="step__buttons">
          <ButtonAll styles={styles} content={'Добавить урок'} />
          <ButtonAll styles={styles} content={'Добавить контрольную'} />
        </div>
      </div>
    );
  }
}
