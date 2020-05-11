import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import './style.scss';

import { openWindow } from '../../../redux/actions/index';
import {
  InputRegistrationForm,
  ButtonAll,
  MyModal,
  OlympiadSelect,
} from '../../index';
import { baseUrl } from '../../../config/api-config';

const styles = {
  marginTop: '43px',
}

const stylesButton = {
  margin: '30px auto 29px auto',
}

class OlympiadRegistrationTeamsComponent extends React.Component {
  state = {
    firstParcipant: '',
    secondParcipant: '',
    thirdParcipant: '',
    olympiadList: [],
    selectedOlympiad: 'Олимпиада',
    olympiadId: 0,
  };

  componentDidMount() {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };
    axios.get(`${baseUrl}/olympiad`, params)
      .then(data => {
        this.setState({
          olympiadList: data.data,
        });
      })
      .catch(e => console.log(e));
  }

  handleRegistration = () => {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };
    axios.post('https://skill4u.herokuapp.com/team/invite', params)
      .then(res => {

        this.props.closeWindowComp();
      })
      .catch(e => console.log(e));
  }

  handleChangeOlympiad = text => {
    for (let i = 0; i < this.state.olympiadList.length; i++) {
      if (this.state.olympiadList[i].text === text) {
        this.setState({ olympiadId: this.state.olympiadList[i].id })
      }
    }
    this.setState({ selectedOlympiad: text });
  }

  render() {
    return (
      <div className="card-registration">
        <InputRegistrationForm styles={styles} placeHolder={'Почта 1 го участника'} />
        <InputRegistrationForm placeHolder={'Почта 2 го участника'} />
        <InputRegistrationForm placeHolder={'Почта 3 го участника'} />
        <div className="card-registration__select">
          <OlympiadSelect handleChange={this.handleChangeOlympiad}
            currentValue={this.state.selectedOlympiad}
            inputValues={this.state.olympiadList} />
        </div>
        <ButtonAll styles={stylesButton}
          content={'Регистрация'}
          action={this.handleRegistration} />
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
