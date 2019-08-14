import React from 'react';
import './style.scss';

export class Timer extends React.Component {
  render() {
    return (
      <div className="timer">
        <div className="timer__header">
          Осталось времени:
        </div>
        <div className="timer__clock">
          <div className="timer__clock-time">
            <div className="timer__clock-time-number">
              2
            </div>
            <div className="timer__clock-time-text">
              часов
            </div>
          </div>
          <div className="timer__clock-time">
            <div className="timer__clock-time-number">
              13
            </div>
            <div className="timer__clock-time-text">
              минут
            </div>
          </div>
          <div className="timer__clock-time">
            <div className="timer__clock-time-number">
              25
            </div>
            <div className="timer__clock-time-text">
              секунд
            </div>
          </div>
        </div>
      </div >
    );
  }
}
