import React, { Component } from "react";
import { connect } from 'react-redux';
import './style.scss';

import javaImgStart from "../../images/java-img-start.png";
import { LessonsCards } from '../index';

class LessonsListComponent extends Component {
  render() {
    return (
      <div className="page page page__flex">
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
