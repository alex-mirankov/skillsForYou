import React from 'react';
import './style.css';

import OlympiadRegistrationConfirm from '../../components/olympiad-registration-confirm/olympiadRegistrationConfirm';
import OlympiadRegistrationTeams from '../../components/olympiad-registration-teams/olympiadRegistrationTeams';

class OlympiadRegistrationTeam extends React.Component {
    render() {
        return (
            <div className="App">
                <p className="registration-team-page-header">Регистрация для участия в олимпиаде</p>
                <div className="page page_margin page__flex">
                    <OlympiadRegistrationConfirm />
                    <OlympiadRegistrationTeams />
                </div>
            </div>
        );
    }
}

export default OlympiadRegistrationTeam;
