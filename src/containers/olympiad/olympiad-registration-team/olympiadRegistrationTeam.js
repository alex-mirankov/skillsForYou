import React from 'react';
import './style.scss';
import {
  OlympiadRegistrationConfirm,
  OlympiadRegistrationTeams
} from '../../../components/olympiad/index';

export class OlympiadRegistrationTeam extends React.Component {
  render() {
    return (
      <>
        <p className="registration-team-page-header">Регистрация для участия в олимпиаде</p>
        <div className="registration-team-page-cards">
          {/* <OlympiadRegistrationConfirm /> */}
          <OlympiadRegistrationTeams />
        </div>
      </>
    );
  }
}
