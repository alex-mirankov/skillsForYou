import React from 'react';
import './style.css';

import OlympiadRegistrationForm from '../../components/olympiad-registration-form/olympiadRegistrationForm';

class OlympiadRegistration extends React.Component {
    render() {
        return (
            <div className="page-registration">
                <p className="registration-header">Регистрация для участия в олимпиаде</p>
                <OlympiadRegistrationForm />
            </div>
        );
    }
}

export default OlympiadRegistration;