import React, { Component } from "react";
import "./style.css";
import { Lesson } from "../lesson-container";
import { HomeWork } from "../../components/home-work-component";
import { Chat } from "../../components/chat-component";
import { RightSideBar } from "../../components/right-side-bar";

export class Work extends Component {
  LessonLayout = () => (
    <React.Fragment>
      <main className="main main_content main__size main_margin">
        <div className="page   page_margin">
          <Lesson />
          <HomeWork />
          <Chat />
        </div>
        <RightSideBar />
      </main>
    </React.Fragment>
  );
  render() {
    return <this.LessonLayout />;
  }
}
