import React from "react";
import './style.css';

export default function({time, title}){

    return (
        <div className="time-content">
            <div className="time-block">{time}</div>
            <p className="time-title">{title}</p>
        </div>
    )
}