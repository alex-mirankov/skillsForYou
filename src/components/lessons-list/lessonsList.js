import React, { Component } from "react";
import javaImgStart from "../../images/java-img-start.png";
import cardsTacherImg from "../../images/cards-tacher-img.png";
import "./style.css";
import { LessonsCards } from '../lessons-cards/lessonsCards';
import { history } from "../../services/redux";

export class LessonsList extends Component {
  handleClick = () => {
    history.push("/work");
    document.documentElement.scrollTop = 0;
  };

  render() {
    return (
      <div className="page page_margin page__flex">
        <LessonsCards
          image={javaImgStart}
          action={this.handleClick}
        />
      </div>
    );
  }
}
