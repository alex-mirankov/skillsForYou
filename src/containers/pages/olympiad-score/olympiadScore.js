import React from 'react';
import './style.scss';
import { history } from '../../../services/redux';
import { connect } from 'react-redux';

import { CircularIndeterminate } from '../../../components';

export class OlympiadScorePageWithRedux extends React.Component {
  state = {
    results: [],
  };

  componentDidMount() {
    let key = 0;
    let array = [];
    for (let i = 0; i < localStorage.length; i++) {
      key = localStorage.key(i);

      if (key.indexOf('token') === -1) {
        array.push(
          {
            participant: key,
            score: localStorage.getItem(key),
          }
        );
        this.setState({
          results: array,
        });
      }
    }
    console.log(this.state.results.map(item => console.log(item)));
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
        {this.props.user ? <this.renderComponent /> : history.push('/')}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.userToken,
});

export const OlympiadScorePage = connect(mapStateToProps)(OlympiadScorePageWithRedux);
