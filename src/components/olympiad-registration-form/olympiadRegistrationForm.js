import React from 'react';
import './style.css';

import CustomInput from '../input-registration-form/inputRegistrationForm';
import ButtonAll from '../../components/share/button-all/buttonAll';

const styles = {
    margin: '0 auto',
}

class OlympiadRegistrationForm extends React.Component {
    render() {
        return (
            <div className="registration-olymp-form">
                <p className="registration-olymp-form-team-name">Команда Скилсики</p>
                <CustomInput placeHolder={'Имя'} />
                <CustomInput placeHolder={'Фамилия'} />
                <div className="container-button-form">
                    <ButtonAll styles={styles} content={'Регистрация'} />
                </div>
            </div>
        );
    }
}

export default OlympiadRegistrationForm;
