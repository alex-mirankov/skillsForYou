import React, { Component } from "react";
import { Benefits } from "../../components/benefits-page-component";
import { ProgramSelection } from "../../components/program-selection-component";
import { LessonsCards } from "../../components/lessons-cards-component";

import "./style.css";

export class MainPage extends Component {
  render() {
    return (
      <div className="App">
        <Benefits />
        <ProgramSelection />
        <LessonsCards />
      </div>
    );
  }
}
