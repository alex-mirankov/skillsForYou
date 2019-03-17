import React, { Component } from "react";
import { Benefits } from "../../components/benefits-page-component";
import { ProgramSelection } from "../../components/program-selection-component";
import { LessonsList } from "../../components/lessons-list/lessonsList";

import "./style.css";

export class MainPage extends Component {
  render() {
    return (
      <div className="App">
        <Benefits />
        <ProgramSelection />
        <LessonsList />
      </div>
    );
  }
}
