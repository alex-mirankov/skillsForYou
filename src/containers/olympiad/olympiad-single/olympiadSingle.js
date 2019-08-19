import React from 'react';
import './style.scss';

import axios from 'axios';

import { connect } from 'react-redux';
import { setCurrentOlympiadTask } from '../../../redux/actions/single-olympiad';

import {
  OlympicHeader,
  OlympicTask,
  Pager,
} from './common';

import {
  Compile,
} from '../../../components';

class OlympiadSingleComponent extends React.Component {
  state = {
    olympiad: null,
    allTasks: [],
    comleteTasks: 0,
    currentTaskNumeric: 0,
    currentTaskName: '',
    currentTaskDescription: ''
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
  setCurrentOlympiad = () => {
    this.state.allTasks.map(item => {
      if (this.props.olympiadId == item.id) {
        this.props.SetCurrentOlympiadTask(
          { id: item.id, name: item.task, description: item.task }
        )
      };
    });
  }
  render() {
    this.setCurrentOlympiad();
    return (
      <div className="single-olympiad">
        <div className="single-olympiad__content">
          <OlympicHeader allTasks={this.state.allTasks}
            comleteTasks={this.state.comleteTasks} />
          <OlympicTask allTasks={this.state.allTasks}
            olympiadId={this.props.olympiadId} />
          <Compile />
          <Pager allTasks={this.state.allTasks} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  olympiadId: state.singleOlympiad.numericOlympiad,
});

const mapDispathToProps = (dispatch) => ({
  SetCurrentOlympiadTask: (olympiad) => {
    dispatch(setCurrentOlympiadTask(olympiad));
  },
})

export const OlympiadSingle = connect(mapStateToProps, mapDispathToProps)(OlympiadSingleComponent)
