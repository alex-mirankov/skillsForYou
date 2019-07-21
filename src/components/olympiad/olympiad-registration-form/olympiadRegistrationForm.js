import React from 'react';
import './style.scss';

import { connect } from 'react-redux';
import { openWindow } from '../../../redux/actions/index';

import axios from 'axios';

import {
  InputRegistrationForm,
  ButtonAll,
  MyModal,
  SelectOlympiad,
} from '../../index';

const styles = {
  margin: '0 auto',
}

class OlympiadRegistrationFormComponent extends React.Component {
  state = {
    currentValue: 'Олимпиада',
    olympiadList: [],
  }
  handleChangeOlymp = text => {
    this.setState({ olympiad: text });
  };
  handleOpenWindow = () => {
    this.props.closeWindowComp();
  }
  componentDidMount() {
    let token = localStorage.getItem('token');
    let params = {
      headers: { 'Authorization': 'Token ' + token }
    };
    axios.get('https://skill4u.herokuapp.com/olympiad', params)
      .then(data => {
        console.log(data.data);
        this.setState({
          olympiadList: data.data,
        });
      })
      .catch(e => console.log(e));
  }
  render() {
    return (
      <div className="registration-olymp-form">
        <p className="registration-olymp-form-team-name">Команда Скилсики</p>
        <InputRegistrationForm placeHolder={'Имя'} />
        <InputRegistrationForm placeHolder={'Фамилия'} />
        <SelectOlympiad handleChange={this.handleChangeOlymp}
                        inputValues={this.state.olympiadList}/>
        <div className="container-button-form">
          <ButtonAll
            styles={styles}
            content={'Регистрация'}
            action={this.handleOpenWindow}
          />
        </div>
        <MyModal />
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
