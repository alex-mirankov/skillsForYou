import React from 'react';
import './style.scss';

import { OlympiadRegistrationForm } from '../../../components/olympiad/index';

export class OlympiadRegistration extends React.Component {
  render() {
    return (
      <>
        <p className="registration-header">Регистрация для участия в олимпиаде</p>
        <OlympiadRegistrationForm />
      </>
    );
  }
}
