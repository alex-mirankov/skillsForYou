import React from 'react';
import './style.css';

import axios from 'axios';

export class OLympiadListContainer extends React.Component {
  state = {
    olympiads: [],
  };
  componentDidMount() {
    let token = localStorage.getItem('token');
    let params = {
      headers: { 'Authorization': 'Token ' + token }
    };
    axios.get('https://skill4u.herokuapp.com/olympiad', params)
      .then(data => {
        console.log(data.data);
        this.setState({
          olympiads: data.data
        });
      })
      .catch(e => console.log(e));
  }
  render() {
    return (
      <div className="olympiads-list">
        {
          this.state.olympiads.map(item => {
            return (
              <div className="olympiads-list__card">
                Олимпиада: {item.name}
                <p>Количество участников: {item.participation_count}</p>
                <p>Дата старта: {item.start_olympiad}</p>
                <p>Дата окончания: {item.end_olympiad}</p>
              </div>
            );
          })
        }
      </div>
    );
  }
}
