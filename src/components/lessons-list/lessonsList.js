import React, { Component } from "react";
import javaImgStart from "../../images/java-img-start.png";
import cardsTacherImg from "../../images/cards-tacher-img.png";
import "./style.css";
import { LessonsCards } from '../lessons-cards/lessonsCards';
import { history } from "../../services/redux";
import axios from 'axios';

export class LessonsList extends Component {
  state = {
    arr: [],
  }
  handleClick = () => {
    history.push("/work");
    document.documentElement.scrollTop = 0;
  };
  getCards = (data) => {
    this.setState({
      arr: data,
    });
    console.log(data);
  }
  componentDidMount() {
    axios.get('http://localhost:8000/courses')
      .then(res => this.getCards(res.data))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="page page_margin page__flex">
        {
          this.state.arr.map(element => {
            return (
              <LessonsCards
                title={element.title}
                sub_title={element.sub_title}
                total_students={element.total_students}
                color={element.category.color}
                image={javaImgStart}
                action={this.handleClick}
              />
            )
          })
        }

      </div>
    );
  }
}
