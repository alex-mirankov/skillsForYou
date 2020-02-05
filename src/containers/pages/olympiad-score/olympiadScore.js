import React from 'react';
import './style.scss';
import { history } from '../../../services/redux';
import axios from 'axios';
import { connect } from 'react-redux';

import { CircularIndeterminate } from '../../../components';

export class OlympiadScorePageWithRedux extends React.Component {
  state = {
    results: [],
    tasks: [],
    tableRowHeader: ['RK', 'TEAM', 'SLV.', 'TIME'],
    renderArr: [''],
  };

  componentDidMount() {
    this.getUserScoreFromBacked();
  }

  getUserScoreFromBacked = () => {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };
    axios.get('http://165.22.92.120:82/olympiad/1/score', params)
      .then((data) => {
        axios.get('http://165.22.92.120:82/olympiad', params)
          .then(data => {
            this.setState({
              tasks: data.data[0].task,
            });
          })
          .catch(e => {
            console.log(e);
          });
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
          : this.state.renderArr.map(item => {
            return (
              <table className="olympiad-score__table">
                <tr className="olympiad-score__table-row-header">
                  {
                    this.state.tableRowHeader.map(item => {
                      return (
                        <td className="olympiad-score__table-ceil-header">{item}</td>
                      );
                    })
                  }
                  {
                    this.state.tasks.map((_item, index) => {
                      return (
                        <td className="olympiad-score__table-ceil-header">{index + 1}</td>
                      );
                    })
                  }
                </tr>
                {
                  this.state.results.map(item => {
                    return (
                      <tr className="olympiad-score__table-row-body">
                        <td className="olympiad-score__table-ceil-body">1</td>
                        <td className="olympiad-score__table-ceil-body">Team</td>
                        <td className="olympiad-score__table-ceil-body">Slv.</td>
                        <td className="olympiad-score__table-ceil-body">Time</td>
                        {
                          this.state.tasks.map((_item, index) => {
                            return (
                              <td className="olympiad-score__table-ceil-body">{index + 1}</td>
                            );
                          })
                        }
                    </tr>
                    );
                  })
                }
              </table>
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
