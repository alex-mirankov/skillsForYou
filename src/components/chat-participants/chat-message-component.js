import React from "react";
import "./style.css";
import img from "../../images/header_avatar2.png"

export function MessageChat({name, date, urlImg, message, rootClass}){

    return (
        <div className={"message-content "+rootClass}>
            <nav className="header-msg message-content__header-msg">
                <img src={img} alt="" className="img img_message header-msg__img_message"/>
                <div ><span className="text_bold header-msg__text">{name}</span> {date}</div>
            </nav>
            <main className="main-msg  message-content__main-msg">
                <div>{message}</div>
            </main>
        </div>
    )
}