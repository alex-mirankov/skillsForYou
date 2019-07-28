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

class OlympiadRegistrationTeamsComponent extends React.Component {
  state = {
    firstParcipant: '',
    secondParcipant: '',
    thirdParcipant: '',
    olympiadList: [],
    selectedOlympiad: '',
  };
  handleChangeDate = text => {
    this.setState({ dateStartOlympic: text });
  };
  componentDidMount() {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };
    axios.get('https://skill4u.herokuapp.com/olympiad', params)
      .then(data => {
        this.setState({
          olympiadList: data.data,
        });
      })
      .catch(e => console.log(e));
  }
  handleRegistration = () => {
    axios.post('https://skill4u.herokuapp.com/team/invite', this.state)
      .then(res => {
        console.log(res);
        this.props.closeWindowComp();
      })
      .catch(e => console.log(e));
  }
  handleChangeOlympiad = text => {
    this.setState({ selectedOlympiad: text });
  };
  render() {
    console.log(this.state.firstParcipant);
    return (
      <div className="card-registration">
        <InputRegistrationForm styles={styles} placeHolder={'Почта 1 го участника'} />
        <InputRegistrationForm placeHolder={'Почта 2 го участника'} />
        <InputRegistrationForm placeHolder={'Почта 3 го участника'} />
        <ShareSelect
          menuItemObject={this.state.olympiadList}
          label={this.state.selectedOlympiad}
          handleChange={this.handleChangeOlympiad}
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
