import React from 'react';
import './style.css';

import CustomInput from '../input-registration-form/inputRegistrationForm';

const styles = {
    marginTop: '43px',
}

class OlympiadRegistrationConfirm extends React.Component {
    render() {
        return (
            <div className="card-registration">
                <CustomInput styles={styles} placeHolder={'Имя'} />
                <CustomInput placeHolder={'Фамилия'} />
                <p className="card-registration-text">Вы хотите принять участие
                    в качестве руководителя команды?
                </p>
            </div>
        );
    };
}

export default OlympiadRegistrationConfirm;
