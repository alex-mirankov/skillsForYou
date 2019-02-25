import React, { Component } from "react";
import "./style.css";
import chatImg from "../../images/chat-image.png"

export class Chat extends Component {
  ChatLayout = () => (
    <div className="chat chat__size chat_beauty chat_position">
      <div className="chat__header">
        <img className="chat__image" src={chatImg} alt="chat"/>
        <p className="chat__main-p">Чат с преподавателем</p>
      </div>
      <textarea className="chat__message" />
      <button className="chat__button">Отправить</button>
    </div>
  );
  render() {
    return <this.ChatLayout />;
  }
}
