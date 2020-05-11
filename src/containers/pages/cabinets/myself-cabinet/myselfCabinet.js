import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import './style.scss';

import { history } from '../../../../services/redux';
import { ButtonAll, CircularIndeterminate } from '../../../../components';
import { baseUrl } from '../../../../config/api-config';

export class MyselfCabinetWithRedux extends React.Component {
  state = {
    userOlympiads: '',
    olympiadId: '',
    files: [],
    isArchiveLoaderShown: false,
  }

  getAllUserOlympiads = () => {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };

    axios.get(`${baseUrl}/me`, params)
      .then((data) => {
        console.log(data.data)
        this.getUserOlympiads(data.data.olympiad_list);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getAllUserOlympiads();
  }

  getTaskUrl = (olympiadId, serialNumber) => {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };

    let options = {
      olympiad_id: olympiadId,
      serial_number: serialNumber,
    };

    axios.post(`${baseUrl}/download/decision`, options , params)
      .then((data) => {
        console.log(data);
        window.location.assign(`${baseUrl}/${data.data.url}`);
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

  validationDate = (endDate) => {
    return new Date(endDate) > new Date() ? true : false;
  }

  goToSelectOlympic = (id) => {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };

    axios.get(`${baseUrl}/olympiad/${id}/start`, params)
    .then((_data) => {
      history.push(`/olympic-single/${id}`);
    })
    .catch(err => {
      console.log(err);
    });
  }

  goToResultsOlympic = id => {
    history.push(`/olympiad-score/${id}`);
  }

  unsubscribeFromOlympiad = (id) => {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };

    let config = {
      olympiad_id: id,
    };

    axios.post(`${baseUrl}/olympiad/unregistration`, config, params)
      .then((data) => {
        this.getAllUserOlympiads();
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderComponent = () => (
    <>
      <div className="my-self-cabinet__header">Участие в олимпиадах:</div>
      {
        !this.state.userOlympiads
          ? <div className="my-self-cabinet__loader"><CircularIndeterminate /></div>
          : this.state.userOlympiads.map(olympiad => {
            return (
              <div className="my-self-cabinet-olympiad-list">
                <div className="my-self-cabinet-olympiad-list__name">{olympiad.name}</div>
                <div className="my-self-cabinet-olympiad-list__start-date">
                  {new Date(olympiad.start_olympiad).toLocaleDateString()}
                </div>
                <div className="my-self-cabinet-olympiad-list__controls">
                  <ButtonAll content={'Участвовать'}
                              action={() => this.goToSelectOlympic(olympiad.id)}
                    />
                  <ButtonAll content={'Результаты'}
                    action={() => this.goToResultsOlympic(olympiad.id)}/>
                    <a href={`${baseUrl}/download/archive/${olympiad.id}`} download>
                      <ButtonAll content={'Скачать архив'} />
                    </a>
                      {
                        olympiad.task.map(item => {
                          return(
                            <ButtonAll action={() => this.getTaskUrl(olympiad.id, item.serial_number)} content={`Скачать решение ${item.serial_number} задачи`} />
                          )
                        })
                      }
                    <ButtonAll content={'Прекратить участие'}
                              action={() => this.unsubscribeFromOlympiad(olympiad.id)}/>
                </div>
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
        {
          localStorage.getItem('token')
            ? <this.renderComponent />
            : <div className="my-self-cabinet__unlogged">
                Вы должны войти в свой аккаунт или зарегестрироваться.
              </div>
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.userToken,
});

export const MyselfCabinet = connect(mapStateToProps)(MyselfCabinetWithRedux);
