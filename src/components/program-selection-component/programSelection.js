import React, { Component } from "react";
import './style.scss';

import axios from 'axios';
import { connect } from 'react-redux';

import inputSeacrhIcon from "../../images/input-seacrh__icon.png";
import mechanic_main_1 from "../../images/mechanic_main_1.png";

import {
  CustomSelect,
  CircularIndeterminate,
  ButtonAll,
} from '../index';

import {
  getCourses,
  getCoursesWithSearch
} from '../../redux/actions/index';

const inputValuesCategory = [
  { text: "Базы данных", value: 1, color: "#e74c3c" },
  { text: "Веб разработка", value: 2, color: "#f1c40f" },
  { text: "Языки программирования", value: 3, color: "#2944ad" },
  { text: "Мобильная разработка", value: 4, color: "#8e44ad" },
  { text: "Другое", value: 5, color: "#008000" }
];

const inputValuesСomplexity = [
  { text: "Начинающий", value: 2, color: "lightgreen" },
  { text: "Средний", value: 3, color: "peachpuff" },
  { text: "Продвинутый", value: 4, color: "coral" }
];

class ProgramSelectionComponent extends Component {
  state = {
    currentValueComplexity: "Уровень сложности",
    currentValueCategory: "Все категории ",
    visibleLoader: false,
  };

  handleChangeCategory = text => {
    this.setState({ currentValueCategory: text });
  };

  handleChangeComplexity = text => {
    this.setState({ currentValueComplexity: text });
  };

  getAllCourses = (data) => {
    this.setState({
      loader: true,
    });
    setTimeout(() => {
      this.props.getAllCourses(data);
      this.setState({
        loader: false,
      })
    }, 2000)
  };

  getCourses = () => {
    axios.get('https://skill4u.herokuapp.com/courses')
      .then(res => { console.log(res.data); this.getAllCourses(res.data) })
      .catch(error => console.log(error));
  };

  handleSearch = (e) => {
    let searchString = e.target.value;
    console.log(searchString);
  }

  getCoursesSearch = () => {

  }

  programSelectionLayout = () => (
    <div className="choose-program">
      <p className="choose-program__header">Выбери свою программу обучения</p>
      <div className="control control__flex">
        <span className="control__item">
          <CustomSelect
            inputValues={inputValuesСomplexity}
            currentValue={this.state.currentValueComplexity}
            handleChange={this.handleChangeComplexity}
          />
        </span>
        <span className="control__item">
          <CustomSelect
            inputValues={inputValuesCategory}
            currentValue={this.state.currentValueCategory}
            handleChange={this.handleChangeCategory}
          />
        </span>

        <span className="control__item">
          <div className="input-search input-search__size">
            <img
              className="input-search__icon"
              src={inputSeacrhIcon}
              alt="лупа"
            />
            <input
              className="input-search__input"
              type="search"
              placeholder="Поиск...."
              onChange={this.handleSearch}
            />
          </div>
        </span>
      </div>
      <div>
        <ButtonAll action={this.getCourses}
          content={'Начать обучение'} />
      </div>
      {
        this.state.loader && <CircularIndeterminate />
      }
    </div>
  );
  render() {
    return <this.programSelectionLayout />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAllCourses: (data) => {
    dispatch(getCourses(data));
  },
  getCoursesSearch: (data) => {
    dispatch(getCoursesWithSearch(data));
  },
});

export const ProgramSelection = connect(null, mapDispatchToProps)(ProgramSelectionComponent);

