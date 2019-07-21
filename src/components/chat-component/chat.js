import React, { Component } from "react";
import './style.scss';

import chatImg from "../../images/chat-image.png";

export class Chat extends Component {
  ChatLayout = () => (
    <div className="chat">
      <div className="chat__header">
        <img className="chat__image" src={chatImg} alt="chat" />
        <p className="chat__help-text">Чат с преподавателем</p>
      </div>
      <textarea className="chat__message-area" />
      <button className="chat__submit">Отправить</button>
    </div>
  );
  render() {
    return <this.ChatLayout />;
  }
}
