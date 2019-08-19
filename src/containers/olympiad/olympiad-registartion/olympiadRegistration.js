import React from 'react';
import './style.scss';

import { OlympiadRegistrationForm } from '../../../components/olympiad/index';

export class OlympiadRegistration extends React.Component {
  render() {
    return (
      <div className="registration-single">
        <p className="registration-single__header">Регистрация для участия в олимпиаде</p>
        <OlympiadRegistrationForm />
      </div>
    );
  }
}
