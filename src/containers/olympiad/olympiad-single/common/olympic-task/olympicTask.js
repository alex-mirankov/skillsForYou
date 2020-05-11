import React from 'react';
import { connect } from 'react-redux';

import './style.scss';

class OlympicTaskComponent extends React.Component {
  render() {
    let {
      currentTaskNumeric,
      currentTaskName,
      currentTaskDescription,
      inputData,
      outputData,
      memoryLimit,
      timeLimit,
      examples,
      inputType
    } = this.props;
    return (
      <div className="olympic-task">
        <div className="olympic-task__name">
          <div className="olympic-task__name-number">{currentTaskNumeric}</div>
          <div className="olympic-task__name-text">
            {currentTaskName}
          </div>
        </div>
        <div className="olympic-task__description">
          {currentTaskDescription}
        </div>
        <div className="olympic-task__input-data">
          На вход: {inputData}
        </div>
        <div className="olympic-task__output-data">
          На выход: {outputData}
        </div>
        <div className="olympic-task__memory-limit">
          Лимит на память: {memoryLimit}
        </div>
        <div className="olympic-task__time-limit">
          Лимит на время: {timeLimit}
        </div>
        <div className="olympic-task__input-type">
          Способ ввода: {inputType}
        </div>
        <div className="olympic-task__examples">
          Примеры:
          {
            examples ? examples.map(item => {
              return (
                <>
                  <div className="olympic-task__examples-case">
                    <div>На вход: {item.input_data}</div>
                    <div>На выход: {item.output_data}</div>
                  </div>
                </>
              );
            }) : null
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentTaskNumeric: state.singleOlympiad.numericOlympiad,
  currentTaskName: state.singleOlympiad.currentOlympiad.name,
  currentTaskDescription: state.singleOlympiad.currentOlympiad.description,
  inputData: state.singleOlympiad.currentOlympiad.input_data,
  outputData: state.singleOlympiad.currentOlympiad.output_data,
  memoryLimit: state.singleOlympiad.currentOlympiad.memory_limit,
  timeLimit: state.singleOlympiad.currentOlympiad.time_limit,
  examples: state.singleOlympiad.currentOlympiad.examples,
  inputType: state.singleOlympiad.currentOlympiad.input_type,
});

export const OlympicTask = connect(mapStateToProps)(OlympicTaskComponent);
