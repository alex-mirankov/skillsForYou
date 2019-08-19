import React from 'react';
import './style.scss';

import { connect } from 'react-redux';

class OlympicTaskComponent extends React.Component {
  render() {
    let { currentTaskNumeric, currentTaskName, currentTaskDescription } = this.props;
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentTaskNumeric: state.singleOlympiad.currentOlympiad.id,
  currentTaskName: state.singleOlympiad.currentOlympiad.name,
  currentTaskDescription: state.singleOlympiad.currentOlympiad.description,
});

export const OlympicTask = connect(mapStateToProps)(OlympicTaskComponent);
