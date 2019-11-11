import React from 'react';
import './style.scss';

import { history } from '../../../../services/redux';
import axios from 'axios';
import { ButtonAll, CircularIndeterminate } from '../../../../components';

export class MyselfCabinet extends React.Component {
  state = {
    userOlympiads: []
  };

  componentDidMount() {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };
    axios.get('https://sandbox-skill4u.herokuapp.com/me', params)
      .then((data) => {
        this.getUserOlympiads(data.data.olympiad_list);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getUserOlympiads = (olymdiads) => {
    this.setState({
      userOlympiads: olymdiads,
    });
  }

  goToSelectOlympic = (id) => {
    history.push(`/olympic-single/${id}`);
  }

  render() {
    return (
      <>
        <div className="my-self-cabinet__header">Участие в олимпиадах:</div>
        {
          this.state.userOlympiads.length === 0
          ? <div className="my-self-cabinet__loader"><CircularIndeterminate /></div>
          : this.state.userOlympiads.map(olympiad => {
            return (
              <div className="my-self-cabinet-olympiad-list">
                <div className="my-self-cabinet-olympiad-list__name">{olympiad.name}</div>
                <div className="my-self-cabinet-olympiad-list__start-date">
                  {new Date(olympiad.start_olympiad).toLocaleString()}
                </div>
                <ButtonAll content={'Участвовать'}
                          action={() => this.goToSelectOlympic(olympiad.id)}/>
              </div>
            );
          })
        }
      </>
    );
  }
}
