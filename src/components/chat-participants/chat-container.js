import React from "react";
import "./style.css";
import { MessageChat } from "./chat-message-component";
import {SendMessage} from './chat-send-message-component';

export function ChatContainer({ messages }) {
  function renderChat(messagge) {
    return (
      <MessageChat
        name={messagge.name}
        date={messagge.date}
        urlImg={messagge.urlImg}
        message={messagge.message}
      />
    );
  }

  return (
    <div className="chat-container c-content__chat-container">
      <nav className="chat-container__header-chat headet-chat">
        <div className="img img_small img_chat header-chat__img-chat" />
        <p className="text_bold header-chat__text">Чат участников</p>
      </nav>
      <div className="chat-content">{messages.map(renderChat)}</div>
      <div className="chat-send">
            <SendMessage />
      </div>
    </div>
  );
}
