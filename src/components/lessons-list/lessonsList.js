import React, { Component } from "react";
import javaImgStart from "../../images/java-img-start.png";
import cardsTacherImg from "../../images/cards-tacher-img.png";
import "./style.css";
import { LessonsCards } from '../lessons-cards/lessonsCards';
import { history } from "../../services/redux";
import axios from 'axios';

import { getCourses } from '../../redux/actions/index';
import { connect } from 'react-redux';

class LessonsListComponent extends Component {
  getAllCourses = (data) => {
    this.props.getAllCourses(data);
  };

  componentDidMount() {
    axios.get('http://localhost:8000/courses')
      .then(res => this.getAllCourses(res.data))
      .catch(error => console.log(error));
  }

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

const mapDispatchToProps = (dispatch) => ({
  getAllCourses: (data) => {
    dispatch(getCourses(data));
  }
});

export const LessonsList = connect(mapStateToProps, mapDispatchToProps)(LessonsListComponent);
