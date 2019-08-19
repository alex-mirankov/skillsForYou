import React, { Component } from 'react';
import './style.scss';

import {
  Benefits,
  ProgramSelection,
  LessonsList,
} from '../../../components/index';

export class MainPage extends Component {
  render() {
    return (
      <div className="main-page">
        <Benefits />
        <ProgramSelection />
        <LessonsList />
      </div>
    );
  }
}
