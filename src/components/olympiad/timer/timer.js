import React from 'react';
import './style.scss';

export class Timer extends React.Component {
  state = {
    allSeconds: 7200,
    hours: 0,
    minuts: 0,
    seconds: 0,
  }

  componentDidMount() {
    setInterval(() => {
      this.timerFunction();
    }, 1000);
  }

  timerFunction = () => {
    this.setState({
      allSeconds: this.state.allSeconds - 1,
      hours: this.state.allSeconds / 3600 ^ 0,
      minuts: (this.state.allSeconds - this.state.hours * 3600) / 60 ^ 0,
      seconds: this.state.allSeconds - this.state.hours * 3600 - this.state.minuts * 60,
    });
  }

  render() {
    return (
      <div className="timer">
        <div className="timer__header">
          Осталось времени:
        </div>
        <div className="timer__clock">
          <div className="timer__clock-time">
            <div className="timer__clock-time-number">
              {this.state.hours}
            </div>
            <div className="timer__clock-time-text">
              часов
            </div>
          </div>
          <div className="timer__clock-time">
            <div className="timer__clock-time-number">
              {this.state.minuts}
            </div>
            <div className="timer__clock-time-text">
              минут
            </div>
          </div>
          <div className="timer__clock-time">
            <div className="timer__clock-time-number">
              {this.state.seconds}
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
