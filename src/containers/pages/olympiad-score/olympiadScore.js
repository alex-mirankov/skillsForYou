import React from 'react';
import './style.scss';
import { history } from '../../../services/redux';
import axios from 'axios';
import { connect } from 'react-redux';

import { CircularIndeterminate } from '../../../components';

export class OlympiadScorePageWithRedux extends React.Component {
  state = {
    results: [],
  };

  componentDidMount() {
    this.getUserScoreFromBacked();
  }

  getUserScoreFromBacked = () => {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };
    axios.get('http://165.22.92.120:81/olympiad/1/score', params)
      .then((data) => {
        this.getSoreFromAllUsers(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getSoreFromAllUsers = (participants) => {
    let array = [];
    for (let item in participants) {
      array.push({
        participant: item,
        score: participants[item].total_score,
      })
      this.setState({
        results: array,
      });
    }
  }

  renderComponent = () => (
    <>
      <div className="olympiad-score__header">Результаты</div>
      {
        this.state.results.length === 0
          ? <div className="olympiad-score__loader"><CircularIndeterminate /></div>
          : this.state.results.map(item => {
            return (
              <div className="olympiad-score__table">
                <div>Участник: {item.participant}</div>
                <div>Результат: {item.score}</div>
              </div>
            );
          })
      }
    </>
  )

  render() {
    return (
      <>
        {localStorage.getItem('token') ? <this.renderComponent /> : history.push('/')}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.userToken,
});

export const OlympiadScorePage = connect(mapStateToProps)(OlympiadScorePageWithRedux);
