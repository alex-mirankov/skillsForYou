import React from 'react';
import './style.scss';

import { connect } from 'react-redux';
import { openWindow } from '../../../redux/actions/index';

import axios from 'axios';

import {
  ButtonAll,
  MyModal,
  OlympiadSelect,
} from '../../index';

const styles = {
  margin: '0 auto',
}

class OlympiadRegistrationFormComponent extends React.Component {
  state = {
    token: localStorage.getItem('token'),
    currentValue: 'Олимпиада',
    olympiadId: 0,
    olympiadList: [],
  }
  handleChangeOlymp = name => {
    for (let i = 0; i < this.state.olympiadList.length; i++) {
      if (this.state.olympiadList[i].name === name) {
        this.setState({olympiadId: this.state.olympiadList[i].id})
      }
    }
    this.setState({ currentValue: name });
  };

  handleRegisatration = () => {
    let params = {
      headers: { 'Authorization': 'Token ' + this.state.token }
    };
    axios.post('http://165.22.92.120:81/olympiad/registration', { olympiad_id: this.state.olympiadId }, params)
      .then(data => {
        this.props.closeWindowComp();
      })
      .catch(e => { console.log(e) });
  }

  getOlympiads = () => {
    let params = {
      headers: { 'Authorization': 'Token ' + this.state.token }
    };
    axios.get('http://165.22.92.120:81/olympiad', params)
      .then(data => {
        console.log(data);
        this.setState({
          olympiadList: data.data,
        });
      })
      .catch(e => console.log(e));
  }

  componentDidMount() {
    this.getOlympiads();
  }
  render() {
    return (
      <div className="registration-olymp-form">
        <p className="registration-olymp-form-team-name">
          Выберите олимпиаду
        </p>
        <div className="registration-olymp-form-select">
          <OlympiadSelect handleChange={this.handleChangeOlymp}
            currentValue={this.state.currentValue}
            inputValues={this.state.olympiadList}
            loadFinished={this.state.loadFinished} />
        </div>
        <div className="container-button-form">
          <ButtonAll styles={styles}
            content={'Регистрация'}
            action={this.handleRegisatration} />
        </div>
        <MyModal headerText={'Спасибо за регистрацию!'}
                  descriptionText={`
                    Каждому участнику придет уведомление на почту
                    для  подтверждения участия в олимпиаде.
                  `} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  closeWindowComp: () => {
    dispatch(openWindow());
  }
});

export const OlympiadRegistrationForm = connect(null, mapDispatchToProps)(OlympiadRegistrationFormComponent);
