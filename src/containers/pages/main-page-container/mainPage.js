import React, { Component } from "react";

import {
  Benefits,
  ProgramSelection,
  LessonsList,
} from '../../../components/index';

export class MainPage extends Component {
  render() {
    return (
      <>
        <Benefits />
        <ProgramSelection />
        <LessonsList />
      </>
    );
  }
}
