import React from 'react';
import './style.scss';

import { history } from '../../../../services/redux';
import axios from 'axios';
import { ButtonAll, CircularIndeterminate } from '../../../../components';
import { connect } from 'react-redux';


export class MyselfCabinetWithRedux extends React.Component {
  state = {
    userOlympiads: ''
  };

  componentDidMount() {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };
    axios.get('http://165.22.92.120/me', params)
      .then((data) => {
        console.log(data.data)
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

  renderComponent = () => (
    <>
    {console.log(this.state)}
      <div className="my-self-cabinet__header">Участие в олимпиадах:</div>
      {
        !this.state.userOlympiads
          ? <div className="my-self-cabinet__loader"><CircularIndeterminate /></div>
          : this.state.userOlympiads.map(olympiad => {
            return (
              <div className="my-self-cabinet-olympiad-list">
                <div className="my-self-cabinet-olympiad-list__name">{olympiad.name}</div>
                <div className="my-self-cabinet-olympiad-list__start-date">
                  {new Date(olympiad.start_olympiad).toLocaleString()}
                </div>
                <ButtonAll content={'Участвовать'}
                  action={() => this.goToSelectOlympic(olympiad.id)} />
              </div>
            );
          })
      }
      {
        this.state.userOlympiads.length === 0
          ? <div className="my-self-cabinet__loader-text">Вы не участвуете в олимпиадах</div>
          : null
      }
    </>
  )

  render() {
    return (
      <>
        {localStorage.getItem('token') ? <this.renderComponent /> : <div className="my-self-cabinet__unlogged">Вы должны войти в свой аккаунт или зарегестрироваться.</div>}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.userToken,
});

export const MyselfCabinet = connect(mapStateToProps)(MyselfCabinetWithRedux);

