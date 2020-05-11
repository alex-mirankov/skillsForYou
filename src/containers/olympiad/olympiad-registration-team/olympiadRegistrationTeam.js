import React from 'react';

import './style.scss';

import { OlympiadRegistrationTeams } from '../../../components/olympiad/index';

export class OlympiadRegistrationTeam extends React.Component {
  render() {
    return (
      <div className="registration-team-page">
        <p className="registration-team-page-header">Регистрация для участия в олимпиаде</p>
        <div className="registration-team-page-cards">
          <OlympiadRegistrationTeams />
        </div>
      </div>
    );
  }
}
