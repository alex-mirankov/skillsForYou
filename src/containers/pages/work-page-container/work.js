import React, { Component } from 'react';
import './style.scss';

import { Lesson } from "../../index";
import {
  HomeWork,
  RightSideBar
} from '../../../components/index';

export class Work extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="work-page">
        <div className="work-page__main">
          <Lesson />
          <HomeWork />
        </div>
        <RightSideBar />
      </div>
    );
  }
}
