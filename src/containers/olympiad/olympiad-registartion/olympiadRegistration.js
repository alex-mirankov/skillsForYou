import React from 'react';
import './style.scss';
import { history } from '../../../services/redux';
import { connect } from 'react-redux';

import { OlympiadRegistrationForm } from '../../../components/olympiad/index';

export class OlympiadRegistrationWithRedux extends React.Component {
  renderComponent = () => (
    <div className="registration-single">
      <div className="registration-single__header">Регистрация для участия в олимпиаде</div>
      <OlympiadRegistrationForm />
    </div>
  );

  render() {
    return (
      <>
        {localStorage.getItem('token') ? <this.renderComponent /> : history.push('/')}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.userToken,
});

export const OlympiadRegistration = connect(mapStateToProps)(OlympiadRegistrationWithRedux);
