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
    tableRowHeader: ['RK', 'TEAM'],
    renderArr: [''],
    olympiadID: Number(window.location.pathname.match(/\d+/)),
  };

  componentDidMount() {
    this.getUserScoreFromBacked();
  }

  getUserScoreFromBacked = () => {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };
    axios.get(`http://165.22.92.120:82/olympiad/${this.state.olympiadID}/score`, params)
      .then((data) => {
        data.data.map(item => {
          item.score = Object.values(item.score);
        });
        console.log(data);
        this.setState({
          results: data.data,
        });
        axios.get('http://165.22.92.120:82/olympiad', params)
          .then(data => {
            this.setState({
              tasks: data.data[0].task,
            });
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
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
                  <td className="olympiad-score__table-ceil-header">Total</td>
                </tr>
                {
                  this.state.results.map((item, index) => {
                    return (
                      <tr className="olympiad-score__table-row-body">
                        <td className="olympiad-score__table-ceil-body">{index + 1}</td>
                        <td className="olympiad-score__table-ceil-body">{item.participant}</td>
                        {
                          item.score.map(scoreValue => {
                            return (
                              <>
                                <td className="olympiad-score__table-ceil-body">{scoreValue}</td>
                              </>
                            );
                          })
                        }
                        <td className="olympiad-score__table-ceil-body">{item.total_score}</td>
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
