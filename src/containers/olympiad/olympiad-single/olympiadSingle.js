import React from 'react';
import './style.scss';

import axios from 'axios';

import {
  OlympicHeader,
  OlympicTask,
  Pager,
} from './common';

import {
  Compile,
} from '../../../components';

export class OlympiadSingle extends React.Component {
  state = {
    olympiad: null,
    allTasks: [],
    comleteTasks: 0,
  };
  componentDidMount() {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };
    axios.get('https://skill4u.herokuapp.com/olympiad/2', params)
      .then(data => {
        this.setState({
          olympiad: data.data,
          allTasks: data.data.task,
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="single-olympiad">
        <div className="single-olympiad__content">
          <OlympicHeader allTasks={this.state.allTasks}
                          comleteTasks={this.state.comleteTasks}/>
          <OlympicTask />
          <Compile />
          <Pager allTasks={this.state.allTasks}/>
        </div>
      </div>
    );
  }
}
