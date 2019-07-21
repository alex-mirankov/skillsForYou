import React from "react";
import './style.scss';

export function Timer({ time, title }) {

  return (
    <div className="timer">
      <div className="timer__time">{time}</div>
      <p className="timer__title">{title}</p>
    </div>
  )
}