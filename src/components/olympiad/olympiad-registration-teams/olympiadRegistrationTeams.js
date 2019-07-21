import React from 'react';
import './style.css';

import axios from 'axios';
import { connect } from 'react-redux';

import { openWindow } from '../../../redux/actions/index';

import {
  InputRegistrationForm,
  ButtonAll,
  MyModal,
  ShareSelect,
} from '../../index';

const styles = {
  marginTop: '43px',
}

const stylesButton = {
  margin: '30px auto 29px auto',
}

const inputValuesLanguage = [
  { text: "JS", value: 1 },
  { text: "C#", value: 2 },
  { text: "Python", value: 3 },
  { text: "Java", value: 4 },
  { text: "C++", value: 5 }
];

const inputValuesDate = [
  { text: "11.02.2019", value: 1 },
  { text: "24.05.2019", value: 2 },
  { text: "30.09.2019", value: 3 }
];

const valueLanguage = "Язык программирования";
const valueDate = "Дата проведения";

class OlympiadRegistrationTeamsComponent extends React.Component {
  state = {
    // programmingLanguage: '',
    // dateStartOlympic: '',
    firstParcipant: '',
    secondParcipant: '',
    thirdParcipant: '',
  };

  handleChangeDate = text => {
    this.setState({ dateStartOlympic: text });
  };
  handleRegistration = () => {
    axios.post('https://skill4u.herokuapp.com/team/invite', this.state)
      .then(res => {
        console.log(res);
        this.props.closeWindowComp();
      })
      .catch(e => console.log(e));
  }
  handleChangeLanguage = text => {
    this.setState({ programmingLanguage: text });
  };
  render() {
    return (
      <div className="card-registration">
        <InputRegistrationForm styles={styles} placeHolder={'Почта 1 го участника'} />
        <InputRegistrationForm placeHolder={'Почта 2 го участника'} />
        <InputRegistrationForm placeHolder={'Почта 3 го участника'} />
        <ShareSelect
          menuItemObject={inputValuesLanguage}
          label={valueLanguage}
          handleChange={this.handleChangeLanguage}
        />
        <ShareSelect
          menuItemObject={inputValuesDate}
          label={valueDate}
          handleChange={this.handleChangeDate}
        />
        <ButtonAll
          styles={stylesButton}
          content={'Регистрация'}
          action={this.handleRegistration}
        />
        <MyModal />
      </div>
    );
  };
}

const mapDispatchToProps = (dispatch) => ({
  closeWindowComp: () => {
    dispatch(openWindow());
  }
});

export const OlympiadRegistrationTeams = connect(null, mapDispatchToProps)(OlympiadRegistrationTeamsComponent);
