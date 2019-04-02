import React, { Component } from "react";
import javaImgStart from "../../images/java-img-start.png";
import cardsTacherImg from "../../images/cards-tacher-img.png";
import "./style.css";
import { LessonsCards } from '../lessons-cards/lessonsCards';
import { history } from "../../services/redux";

import { connect } from 'react-redux';

class LessonsListComponent extends Component {
  render() {
    return (
      <div className="page page_margin page__flex">
        {
          this.props.courses.map(element => {
            return (
              <LessonsCards
                key={element.pk}
                id={element.pk}
                title={element.title}
                sub_title={element.sub_title}
                total_students={element.total_students}
                color={element.category.color}
                image={javaImgStart}
              />
            )
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  courses: state.courses.courses,
});

export const LessonsList = connect(mapStateToProps)(LessonsListComponent);
