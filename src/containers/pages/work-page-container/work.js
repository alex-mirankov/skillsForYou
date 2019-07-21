import React, { Component } from "react";

import { Lesson } from "../../index";
import {
  HomeWork,
  Chat,
  RightSideBar
} from '../../../components/index';

export class Work extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <>
        <Lesson />
        <HomeWork />
        <Chat />
        <RightSideBar />
      </>
    );
  }
}
