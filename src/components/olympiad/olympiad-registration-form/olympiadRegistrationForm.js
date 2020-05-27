import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './style.scss';

import { openWindow } from '../../../redux/actions/index';
import { ButtonAll, MyModal, OlympiadSelect } from '../../index';
import { baseUrl } from '../../../config/api-config';

const styles = {
  margin: '0 auto',
}

class OlympiadRegistrationFormComponent extends React.Component {
  state = {
    token: localStorage.getItem('token'),
    currentValue: 'Олимпиада',
    olympiadId: 0,
    olympiadList: [],
    modalText: 'Вы можете начать участие в олимпиаде перейдя в личный кабинет.',
    headerText: 'Спасибо за регистрацию!',
  }

  handleChangeOlymp = name => {
    for (let i = 0; i < this.state.olympiadList.length; i++) {
      if (this.state.olympiadList[i].name === name) {
        this.setState({olympiadId: this.state.olympiadList[i].id})
      }
    }
    this.setState({ currentValue: name });
  }

  handleRegisatration = () => {
    let params = {
      headers: { 'Authorization': 'Token ' + this.state.token }
    };
    axios.post(`${baseUrl}/olympiad/registration`, { olympiad_id: this.state.olympiadId }, params)
      .then(_data => {
        this.setState({
          headerText: 'Спасибо за регистрацию!',
          modalText: 'Вы можете начать участие в олимпиаде перейдя в личный кабинет.',
        });
        this.props.closeWindowComp();
      })
      .catch(e => {
        let errorLabel;
        if (Object.values(e)[2].status === 400) {
          errorLabel = 'Вы уже зарегестрированы на эту олимпиаду';
        } else {
          errorLabel = 'Возникла ошибка на сервере. Пожалуйста, попробуйте позже';
        };

        this.setState({
          headerText: '',
          modalText: errorLabel,
        });
        this.props.closeWindowComp();
      });
  }

  getOlympiads = () => {
    let params = {
      headers: { 'Authorization': 'Token ' + this.state.token }
    };
    axios.get(`${baseUrl}/olympiad`, params)
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
        <MyModal headerText={this.state.headerText}
                  descriptionText={this.state.modalText} />
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
