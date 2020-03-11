import React from 'react';
import './style.scss';

import { history } from '../../../../services/redux';
import axios from 'axios';
import { ButtonAll, CircularIndeterminate } from '../../../../components';
import { connect } from 'react-redux';


export class MyselfCabinetWithRedux extends React.Component {
  state = {
    userOlympiads: '',
    olympiadId: '',
    files: [],
    isArchiveLoaderShown: false,
  };

  getAllUserOlympiads = () => {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };
    axios.get('http://165.22.92.120:81/me', params)
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
    }
    axios.post('http://165.22.92.120:81/download/decision', options , params)
      .then((data) => {
        console.log(data);
        window.location.assign(`http://165.22.92.120:81/${data.data.url}`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getUserOlympiads = (olymdiads) => {
    console.log(olymdiads);
    this.setState({
      userOlympiads: olymdiads,
    });
  }

  uploadArchive = (e, olympiadId) => {
    e.preventDefault();
    this.setState({
      isArchiveLoaderShown: true,
    });
    const formData = new FormData(document.getElementById(`uploadArchive${olympiadId}`));
    const options = {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('token'),
      },
      body: formData,
    };
    let responceArchive = {
      upload: async() => {
        await fetch('http://165.22.92.120:81/fileupload/archive/', options)
      }
    }
    responceArchive.upload()
      .then(data => {
        this.setState({
          isArchiveLoaderShown: false,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isArchiveLoaderShown: false,
        });
      })
  }

  validationDate = (endDate) => {
    if (new Date(endDate) > new Date()) {
      return true;
    } else {
      return false;
    }
  }

  goToSelectOlympic = (id) => {
    history.push(`/olympic-single/${id}`);
  }

  goToResultsOlympic = id => {
    history.push(`/olympiad-score/${id}`);
  }

  olympiadStart = id => {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };
    axios.get(`http://165.22.92.120:81/olympiad/${id}/start`, params)
    .then((data) => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  olympiadEnd = id => {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };
    axios.get(`http://165.22.92.120:81/olympiad/${id}/end`, params)
    .then((data) => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  unsubscribeFromOlympiad = (id) => {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };
    let config = {
      olympiad_id: id,
    };
    axios.post('http://165.22.92.120:81/olympiad/unregistration', config, params)
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
                  <ButtonAll content={'Начать олимпиаду'}
                      action={() => this.olympiadStart(olympiad.id)}
                    />
                  <ButtonAll content={'Участвовать'}
                    action={() => this.goToSelectOlympic(olympiad.id)}
                    />
                  <ButtonAll content={'Результаты'}
                    action={() => this.goToResultsOlympic(olympiad.id)}/>
                    <form id={`uploadArchive${olympiad.id}`} encType="multipart/form-data">
                      <input value={olympiad.id} name="olympiad_id" style={{display: 'none'}}/>
                      <input type='file'
                              name="files" />
                      <button id="uploadArchive__btn"
                              type="submit"
                              onClick={(e) => {this.uploadArchive(e, olympiad.id)}}>
                        Загрузить архив
                      </button>
                      {
                        this.state.isArchiveLoaderShown
                        ? <CircularIndeterminate />
                        : null
                      }
                    </form>
                    <a href={`http://skills4u-olymp.ru:81/download/archive/${olympiad.id}`} download>
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
                    <ButtonAll content={'Закончить олимпиаду'}
                      action={() => this.olympiadEnd(olympiad.id)}
                    />
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
        {localStorage.getItem('token') ? <this.renderComponent /> : <div className="my-self-cabinet__unlogged">Вы должны войти в свой аккаунт или зарегестрироваться.</div>}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.userToken,
});

export const MyselfCabinet = connect(mapStateToProps)(MyselfCabinetWithRedux);
